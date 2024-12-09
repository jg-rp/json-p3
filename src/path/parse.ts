import { JSONPathEnvironment } from "./environment";
import { JSONPathSyntaxError, JSONPathTypeError } from "./errors";
import {
  BooleanLiteral,
  FilterExpression,
  FilterExpressionLiteral,
  FunctionExtension,
  InfixExpression,
  LogicalExpression,
  NullLiteral,
  NumberLiteral,
  PrefixExpression,
  RelativeQuery,
  RootQuery,
  StringLiteral,
} from "./expression";
import { FunctionExpressionType } from "./functions/function";
import { JSONPath } from "./path";
import {
  FilterSelector,
  IndexSelector,
  JSONPathSelector,
  NameSelector,
  SliceSelector,
  WildcardSelector,
} from "./selectors";
import {
  RecursiveDescentSegment,
  ChildSegment,
  JSONPathSegment,
} from "./segments";
import { Token, TokenKind, TokenStream } from "./token";
import { CurrentKey } from "./extra/expression";
import {
  KeySelector,
  KeysSelector,
  KeysFilterSelector,
} from "./extra/selectors";

const PRECEDENCE_LOWEST = 1;
const PRECEDENCE_LOGICAL_OR = 4;
const PRECEDENCE_LOGICAL_AND = 5;
const PRECEDENCE_COMPARISON = 6;
const PRECEDENCE_PREFIX = 7;

const PRECEDENCES: Map<TokenKind, number> = new Map([
  [TokenKind.AND, PRECEDENCE_LOGICAL_AND],
  [TokenKind.EQ, PRECEDENCE_COMPARISON],
  [TokenKind.GE, PRECEDENCE_COMPARISON],
  [TokenKind.GT, PRECEDENCE_COMPARISON],
  [TokenKind.LE, PRECEDENCE_COMPARISON],
  [TokenKind.LT, PRECEDENCE_COMPARISON],
  [TokenKind.NE, PRECEDENCE_COMPARISON],
  [TokenKind.NOT, PRECEDENCE_PREFIX],
  [TokenKind.OR, PRECEDENCE_LOGICAL_OR],
  [TokenKind.RPAREN, PRECEDENCE_LOWEST],
]);

const BINARY_OPERATORS: Map<TokenKind, string> = new Map([
  [TokenKind.AND, "&&"],
  [TokenKind.EQ, "=="],
  [TokenKind.GE, ">="],
  [TokenKind.GT, ">"],
  [TokenKind.LE, "<="],
  [TokenKind.LT, "<"],
  [TokenKind.NE, "!="],
  [TokenKind.OR, "||"],
]);

const COMPARISON_OPERATORS = new Set(["==", ">=", ">", "<=", "<", "!="]);

/**
 * JSONPath token stream parser.
 */
export class Parser {
  protected tokenMap: Map<string, (stream: TokenStream) => FilterExpression>;

  constructor(readonly environment: JSONPathEnvironment) {
    this.tokenMap = new Map([
      [TokenKind.FALSE, this.parseBoolean],
      [TokenKind.NUMBER, this.parseNumber],
      [TokenKind.LPAREN, this.parseGroupedExpression],
      [TokenKind.NOT, this.parsePrefixExpression],
      [TokenKind.NULL, this.parseNull],
      [TokenKind.ROOT, this.parseRootQuery],
      [TokenKind.CURRENT, this.parseRelativeQuery],
      [TokenKind.SINGLE_QUOTE_STRING, this.parseString],
      [TokenKind.DOUBLE_QUOTE_STRING, this.parseString],
      [TokenKind.TRUE, this.parseBoolean],
      [TokenKind.FUNCTION, this.parseFunction],
      [TokenKind.CURRENT_KEY, this.parseCurrentKey],
    ]);
  }

  public parse(stream: TokenStream): JSONPathSegment[] {
    if (stream.current.kind === TokenKind.ROOT) stream.next();
    const segments = this.parseQuery(stream);
    if (stream.current.kind !== TokenKind.EOF) {
      throw new JSONPathSyntaxError(
        `unexpected token '${stream.current.kind}'`,
        stream.current,
      );
    }
    return segments;
  }

  protected parseQuery(
    stream: TokenStream,
    inFilter: boolean = false,
  ): JSONPathSegment[] {
    const segments: JSONPathSegment[] = [];
    loop: for (;;) {
      switch (stream.current.kind) {
        case TokenKind.DDOT: {
          const token = stream.next();
          const selectors = this.parseSelectors(stream);
          segments.push(
            new RecursiveDescentSegment(this.environment, token, selectors),
          );
          break;
        }
        case TokenKind.LBRACKET:
        case TokenKind.KEY:
        case TokenKind.KEYS:
        case TokenKind.NAME:
        case TokenKind.WILD: {
          const token = stream.current;
          const selectors = this.parseSelectors(stream);
          segments.push(new ChildSegment(this.environment, token, selectors));
          break;
        }
        default: {
          if (inFilter) stream.backup();
          break loop;
        }
      }

      stream.next();
    }
    return segments;
  }

  protected parseSelectors(stream: TokenStream): JSONPathSelector[] {
    switch (stream.current.kind) {
      case TokenKind.NAME:
        return [
          new NameSelector(
            this.environment,
            stream.current,
            stream.current.value,
          ),
        ];
      case TokenKind.WILD:
        return [new WildcardSelector(this.environment, stream.current)];
      case TokenKind.KEY:
        return [
          new KeySelector(
            this.environment,
            stream.current,
            stream.current.value,
          ),
        ];
      case TokenKind.KEYS:
        return [new KeysSelector(this.environment, stream.current)];
      case TokenKind.LBRACKET:
        return this.parseBracketedSelection(stream);
      default:
        return [];
    }
  }

  protected parseIndex(stream: TokenStream): IndexSelector {
    if (
      (stream.current.value.length > 1 &&
        stream.current.value.startsWith("0")) ||
      stream.current.value.startsWith("-0")
    ) {
      throw new JSONPathSyntaxError(
        "leading zero in index selector",
        stream.current,
      );
    }

    return new IndexSelector(
      this.environment,
      stream.current,
      Number(stream.current.value),
    );
  }

  protected parseSlice(stream: TokenStream): SliceSelector {
    const tok = stream.current;
    const indices: Array<number | undefined> = [];

    function maybeIndex(token: Token): boolean {
      if (token.kind === TokenKind.INDEX) {
        if (
          (token.value.length > 1 && token.value.startsWith("0")) ||
          token.value.startsWith("-0")
        ) {
          throw new JSONPathSyntaxError(
            "leading zero in index selector",
            token,
          );
        }
        return true;
      }
      return false;
    }

    // 1: or :
    if (maybeIndex(stream.current)) {
      indices.push(Number(stream.current.value));
      stream.next();
      stream.expect(TokenKind.COLON);
      stream.next();
    } else {
      indices.push(undefined);
      stream.expect(TokenKind.COLON);
      stream.next();
    }

    // 1 or 1: or : or ?
    if (maybeIndex(stream.current)) {
      indices.push(Number(stream.current.value));
      stream.next();
      if (stream.current.kind === TokenKind.COLON) {
        stream.next();
      }
    } else if (stream.current.kind === TokenKind.COLON) {
      indices.push(undefined);
      stream.expect(TokenKind.COLON);
      stream.next();
    }

    // 1 or ?
    if (maybeIndex(stream.current)) {
      indices.push(Number(stream.current.value));
      stream.next();
    }

    stream.backup();
    return new SliceSelector(this.environment, tok, ...indices);
  }

  protected parseBracketedSelection(stream: TokenStream): JSONPathSelector[] {
    const token = stream.next();
    const selectors: JSONPathSelector[] = [];

    while (stream.current.kind !== TokenKind.RBRACKET) {
      switch (stream.current.kind) {
        case TokenKind.SINGLE_QUOTE_STRING:
        case TokenKind.DOUBLE_QUOTE_STRING:
          selectors.push(
            new NameSelector(
              this.environment,
              stream.current,
              this.decodeString(stream.current),
            ),
          );
          break;
        case TokenKind.FILTER:
          selectors.push(this.parseFilter(stream));
          break;
        case TokenKind.INDEX:
          if (stream.peek.kind === TokenKind.COLON) {
            selectors.push(this.parseSlice(stream));
          } else {
            selectors.push(this.parseIndex(stream));
          }
          break;
        case TokenKind.COLON:
          selectors.push(this.parseSlice(stream));
          break;
        case TokenKind.WILD:
          selectors.push(
            new WildcardSelector(this.environment, stream.current),
          );
          break;
        case TokenKind.KEY_SINGLE_QUOTE_STRING:
        case TokenKind.KEY_DOUBLE_QUOTE_STRING:
          selectors.push(
            new KeySelector(
              this.environment,
              stream.current,
              this.decodeString(stream.current),
            ),
          );
          break;
        case TokenKind.KEYS_FILTER:
          selectors.push(this.parseFilter(stream, true));
          break;
        case TokenKind.KEYS:
          selectors.push(new KeysSelector(this.environment, stream.current));
          break;
        case TokenKind.EOF:
          throw new JSONPathSyntaxError(
            "unexpected end of query",
            stream.current,
          );
        default:
          throw new JSONPathSyntaxError(
            `unexpected token in bracketed selection '${stream.current.kind}'`,
            stream.current,
          );
      }

      if (stream.peek.kind !== TokenKind.RBRACKET) {
        stream.expectPeek(TokenKind.COMMA);
        stream.next();
        stream.expectPeekNot(TokenKind.RBRACKET, "unexpected trailing comma");
      }

      stream.next();
    }

    if (!selectors.length) {
      throw new JSONPathSyntaxError("empty bracketed segment", token);
    }

    return selectors;
  }

  protected parseFilter(
    stream: TokenStream,
    keys: boolean = false,
  ): FilterSelector {
    const tok = stream.next();
    const expr = this.parseFilterExpression(stream);
    if (expr instanceof FunctionExtension) {
      const func = this.environment.functionRegister.get(expr.name);
      if (func && func.returnType === FunctionExpressionType.ValueType) {
        throw new JSONPathTypeError(
          `result of ${expr.name}()  must be compared`,
          expr.token,
        );
      }
    }

    this.throwForLiteral(expr);

    return keys
      ? new KeysFilterSelector(
          this.environment,
          tok,
          new LogicalExpression(tok, expr),
        )
      : new FilterSelector(
          this.environment,
          tok,
          new LogicalExpression(tok, expr),
        );
  }

  protected parseBoolean(stream: TokenStream): BooleanLiteral {
    if (stream.current.kind === TokenKind.FALSE)
      return new BooleanLiteral(stream.current, false);
    return new BooleanLiteral(stream.current, true);
  }

  protected parseNull(stream: TokenStream): NullLiteral {
    return new NullLiteral(stream.current);
  }

  protected parseString(stream: TokenStream): StringLiteral {
    return new StringLiteral(stream.current, this.decodeString(stream.current));
  }

  protected parseNumber(stream: TokenStream): NumberLiteral {
    const value = stream.current.value;
    if (value.startsWith("0") && value.length > 1) {
      throw new JSONPathSyntaxError(
        `invalid number literal '${value}'`,
        stream.current,
      );
    }

    const num = Number(stream.current.value);

    if (isNaN(num)) {
      throw new JSONPathSyntaxError(
        `invalid number literal '${value}'`,
        stream.current,
      );
    }
    return new NumberLiteral(stream.current, num);
  }

  protected parsePrefixExpression(stream: TokenStream): PrefixExpression {
    stream.expect(TokenKind.NOT);
    stream.next();
    return new PrefixExpression(
      stream.current,
      "!",
      this.parseFilterExpression(stream, PRECEDENCE_PREFIX),
    );
  }

  protected parseInfixExpression(
    stream: TokenStream,
    left: FilterExpression,
  ): InfixExpression {
    const tok = stream.next();
    const precedence = PRECEDENCES.get(tok.kind) || PRECEDENCE_LOWEST;
    const right = this.parseFilterExpression(stream, precedence);
    const operator = BINARY_OPERATORS.get(tok.kind);

    if (!operator) {
      throw new JSONPathSyntaxError(`unknown operator '${tok.kind}'`, tok);
    }

    if (COMPARISON_OPERATORS.has(operator)) {
      this.throwForNonComparable(left);
      this.throwForNonComparable(right);
    } else {
      this.throwForLiteral(left);
      this.throwForLiteral(right);
    }

    return new InfixExpression(tok, left, operator, right);
  }

  protected parseGroupedExpression(stream: TokenStream): FilterExpression {
    if (stream.peek.kind === TokenKind.RPAREN) {
      throw new JSONPathSyntaxError(`empty paren expression`, stream.current);
    }

    stream.next(); // eat open paren

    let expr = this.parseFilterExpression(stream);
    stream.next();

    while (stream.current.kind !== TokenKind.RPAREN) {
      if (stream.current.kind === TokenKind.EOF) {
        throw new JSONPathSyntaxError("unbalanced parentheses", stream.current);
      }

      if (!BINARY_OPERATORS.has(stream.current.kind)) {
        throw new JSONPathSyntaxError(
          `expected an expression, found '${stream.current.value}'`,
          stream.current,
        );
      }

      expr = this.parseInfixExpression(stream, expr);
    }

    stream.expect(TokenKind.RPAREN);
    return expr;
  }

  protected parseRootQuery(stream: TokenStream): RootQuery {
    const tok = stream.next();
    return new RootQuery(
      tok,
      new JSONPath(this.environment, this.parseQuery(stream, true)),
    );
  }

  protected parseRelativeQuery(stream: TokenStream): RelativeQuery {
    const tok = stream.next();
    return new RelativeQuery(
      tok,
      new JSONPath(this.environment, this.parseQuery(stream, true)),
    );
  }

  protected parseCurrentKey(stream: TokenStream): CurrentKey {
    return new CurrentKey(stream.current);
  }

  protected parseFunction(stream: TokenStream): FunctionExtension {
    const args: FilterExpression[] = [];
    const tok = stream.next();

    while (stream.current.kind !== TokenKind.RPAREN) {
      const func = this.tokenMap.get(stream.current.kind);
      if (!func) {
        throw new JSONPathSyntaxError(
          `unexpected '${stream.current.value}'`,
          stream.current,
        );
      }

      let expr = func.bind(this)(stream);

      // Could be a comparison/logical expression
      let peekKind = stream.peek.kind;
      while (BINARY_OPERATORS.has(peekKind)) {
        stream.next();
        expr = this.parseInfixExpression(stream, expr);
        peekKind = stream.peek.kind;
      }

      args.push(expr);

      if (stream.peek.kind !== TokenKind.RPAREN) {
        if (stream.peek.kind === TokenKind.RBRACKET) break;
        stream.expectPeek(TokenKind.COMMA);
        stream.next();
      }

      stream.next();
    }

    stream.expect(TokenKind.RPAREN);

    return new FunctionExtension(
      tok,
      tok.value,
      this.environment.checkWellTypedness(tok, args),
    );
  }

  protected parseFilterExpression(
    stream: TokenStream,
    precedence: number = PRECEDENCE_LOWEST,
  ): FilterExpression {
    const func = this.tokenMap.get(stream.current.kind);
    if (!func) {
      let msg: string;
      switch (stream.current.kind) {
        case TokenKind.EOF:
        case TokenKind.RBRACKET:
          msg = "end of expression";
          break;
        default:
          msg = `'${stream.current.value}'`;
      }
      throw new JSONPathSyntaxError(`unexpected ${msg}`, stream.current);
    }

    let left = func.bind(this)(stream);

    for (;;) {
      const peekKind = stream.peek.kind;
      if (
        peekKind === TokenKind.EOF ||
        peekKind === TokenKind.RBRACKET ||
        (PRECEDENCES.get(peekKind) || PRECEDENCE_LOWEST) < precedence
      ) {
        break;
      }

      if (!BINARY_OPERATORS.has(peekKind)) return left;
      stream.next();
      left = this.parseInfixExpression(stream, left);
    }

    return left;
  }

  protected decodeString(token: Token): string {
    return this.unescapeString(
      token.kind === TokenKind.SINGLE_QUOTE_STRING
        ? token.value.replaceAll('"', '\\"').replaceAll("\\'", "'")
        : token.value,
      token,
    );
  }

  protected unescapeString(value: string, token: Token): string {
    const rv: string[] = [];
    const length = value.length;
    let index = 0;
    let codepoint: number;

    while (index < length) {
      const ch = value[index];
      if (ch === "\\") {
        // Handle escape sequences
        index += 1; // Move past '\'

        switch (value[index]) {
          case '"':
            rv.push('"');
            break;
          case "\\":
            rv.push("\\");
            break;
          case "/":
            rv.push("/");
            break;
          case "b":
            rv.push("\x08");
            break;
          case "f":
            rv.push("\x0C");
            break;
          case "n":
            rv.push("\n");
            break;
          case "r":
            rv.push("\r");
            break;
          case "t":
            rv.push("\t");
            break;
          case "u":
            [codepoint, index] = this.decodeHexChar(value, index, token);
            rv.push(this.stringFromCodePoint(codepoint, token));
            break;
          default:
            // TODO: This is unreachable. The lexer will catch unknown escape sequences.
            throw new JSONPathSyntaxError(
              `unknown escape sequence at index ${token.index + index - 1}`,
              token,
            );
        }
      } else {
        this.stringFromCodePoint(ch.codePointAt(0), token);
        rv.push(ch);
      }

      index += 1;
    }

    return rv.join("");
  }

  /**
   * Decode a `\uXXXX` or `\uXXXX\uXXXX` escape sequence from _value_ at _index_.
   *
   * @param value - A string value containing the sequence to decode.
   * @param index - The start index of an escape sequence in _value_.
   * @param token - The token for the string value.
   * @returns - A codepoint, new index tuple.
   */
  protected decodeHexChar(
    value: string,
    index: number,
    token: Token,
  ): [number, number] {
    const length = value.length;

    if (index + 4 >= length) {
      throw new JSONPathSyntaxError(
        `incomplete escape sequence at index ${token.index + index - 1}`,
        token,
      );
    }

    index += 1; // Move past 'u'
    let codepoint = this.parseHexDigits(value.slice(index, index + 4), token);

    if (isLowSurrogate(codepoint)) {
      throw new JSONPathSyntaxError(
        `unexpected low surrogate codepoint at index ${token.index + index - 2}`,
        token,
      );
    }

    if (isHighSurrogate(codepoint)) {
      // Expect a surrogate pair.
      if (
        !(
          index + 9 < length &&
          value[index + 4] === "\\" &&
          value[index + 5] === "u"
        )
      ) {
        throw new JSONPathSyntaxError(
          `incomplete escape sequence at index ${token.index + index - 2}`,
          token,
        );
      }

      const lowSurrogate = this.parseHexDigits(
        value.slice(index + 6, index + 10),
        token,
      );

      if (!isLowSurrogate(lowSurrogate)) {
        throw new JSONPathSyntaxError(
          `unexpected codepoint at index ${token.index + index + 4}`,
          token,
        );
      }

      codepoint =
        0x10000 + (((codepoint & 0x03ff) << 10) | (lowSurrogate & 0x03ff));

      return [codepoint, index + 9];
    }

    return [codepoint, index + 3];
  }

  /**
   * Parse a hexadecimal string as an integer.
   *
   * @param digits - Hexadecimal digit string.
   * @param token - The token for the string value.
   * @returns - The number representation of _digits_.
   *
   * Note that we're not using `parseInt(digits, 16)` because it accepts `+`
   * and `-` and things we don't allow.
   */
  protected parseHexDigits(digits: string, token: Token): number {
    const encoder = new TextEncoder();
    let codepoint = 0;
    for (const digit of encoder.encode(digits)) {
      codepoint <<= 4;
      switch (digit) {
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          codepoint |= digit - 48; // '0'
          break;
        case 97:
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
          codepoint |= digit - 97 + 10; // 'a'
          break;
        case 65:
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
          codepoint |= digit - 65 + 10; // 'A'
          break;
        default:
          throw new JSONPathSyntaxError(
            "invalid \\uXXXX escape sequence",
            token,
          );
      }
    }
    return codepoint;
  }

  /** Check the codepoint is valid and return its string representation. */
  protected stringFromCodePoint(
    codepoint: number | undefined,
    token: Token,
  ): string {
    if (codepoint === undefined || codepoint <= 0x1f) {
      throw new JSONPathSyntaxError(`invalid character`, token);
    }

    try {
      return String.fromCodePoint(codepoint);
    } catch {
      // This should not be reachable.
      throw new JSONPathSyntaxError("invalid escape sequence", token);
    }
  }

  protected throwForNonComparable(expr: FilterExpression): void {
    if (
      (expr instanceof RootQuery || expr instanceof RelativeQuery) &&
      !expr.path.singularQuery()
    ) {
      throw new JSONPathTypeError(
        "non-singular query is not comparable",
        expr.token,
      );
    }

    if (expr instanceof FunctionExtension) {
      const func = this.environment.functionRegister.get(expr.name);
      if (func && func.returnType !== FunctionExpressionType.ValueType) {
        throw new JSONPathTypeError(
          `result of ${expr.name}() is not comparable`,
          expr.token,
        );
      }
    }
  }

  protected throwForLiteral(expr: FilterExpression): void {
    if (expr instanceof FilterExpressionLiteral) {
      throw new JSONPathSyntaxError(
        `filter expression literals (${expr.toString()}) must be compared`,
        expr.token,
      );
    }
  }
}

export function isHighSurrogate(codepoint: number): boolean {
  return codepoint >= 0xd800 && codepoint <= 0xdbff;
}

export function isLowSurrogate(codepoint: number): boolean {
  return codepoint >= 0xdc00 && codepoint <= 0xdfff;
}
