import { JSONPathEnvironment } from "./environment";
import { JSONPathSyntaxError, JSONPathTypeError } from "./errors";
import {
  BooleanLiteral,
  FilterExpression,
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
  BracketedSelection,
  BracketedSegment,
  FilterSelector,
  IndexSelector,
  JSONPathSelector,
  NameSelector,
  RecursiveDescentSegment,
  SliceSelector,
  WildcardSelector,
} from "./selectors";
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

  public parse(stream: TokenStream): JSONPathSelector[] {
    if (stream.current.kind === TokenKind.ROOT) stream.next();
    const selectors = this.parsePath(stream);
    if (stream.current.kind !== TokenKind.EOF) {
      throw new JSONPathSyntaxError(
        `unexpected token '${stream.current.kind}'`,
        stream.current,
      );
    }
    return selectors;
  }

  protected parsePath(
    stream: TokenStream,
    inFilter: boolean = false,
  ): JSONPathSelector[] {
    const selectors: JSONPathSelector[] = [];
    for (;;) {
      const selector = this.parseSegment(stream);
      if (!selector) {
        if (inFilter) {
          stream.backup();
        }
        break;
      }

      selectors.push(selector);
      stream.next();
    }
    return selectors;
  }

  protected parseSegment(stream: TokenStream): JSONPathSelector | null {
    switch (stream.current.kind) {
      case TokenKind.NAME:
        return new NameSelector(
          this.environment,
          stream.current,
          stream.current.value,
          true,
        );
      case TokenKind.WILD:
        return new WildcardSelector(this.environment, stream.current, true);
      case TokenKind.KEY:
        return new KeySelector(
          this.environment,
          stream.current,
          stream.current.value,
          true,
        );
      case TokenKind.KEYS:
        return new KeysSelector(this.environment, stream.current, true);
      case TokenKind.DDOT: {
        const segmentToken = stream.current;
        stream.next();
        const selector = this.parseSegment(stream);
        if (!selector) {
          throw new JSONPathSyntaxError(
            "bald descendant segment",
            stream.current,
          );
        }
        return new RecursiveDescentSegment(
          this.environment,
          segmentToken,
          selector,
        );
      }
      case TokenKind.LBRACKET:
        return this.parseBracketedSelection(stream);
      default:
        return null;
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

  protected parseBracketedSelection(stream: TokenStream): BracketedSelection {
    const token = stream.next();
    const items: BracketedSegment[] = [];

    while (stream.current.kind !== TokenKind.RBRACKET) {
      switch (stream.current.kind) {
        case TokenKind.SINGLE_QUOTE_STRING:
        case TokenKind.DOUBLE_QUOTE_STRING:
          items.push(
            new NameSelector(
              this.environment,
              stream.current,
              this.decodeString(stream.current, true),
              false,
            ),
          );
          break;
        case TokenKind.FILTER:
          items.push(this.parseFilter(stream));
          break;
        case TokenKind.INDEX:
          if (stream.peek.kind === TokenKind.COLON) {
            items.push(this.parseSlice(stream));
          } else {
            items.push(this.parseIndex(stream));
          }
          break;
        case TokenKind.COLON:
          items.push(this.parseSlice(stream));
          break;
        case TokenKind.WILD:
          items.push(new WildcardSelector(this.environment, stream.current));
          break;
        case TokenKind.KEY_SINGLE_QUOTE_STRING:
        case TokenKind.KEY_DOUBLE_QUOTE_STRING:
          items.push(
            new KeySelector(
              this.environment,
              stream.current,
              this.decodeString(stream.current, true),
              false,
            ),
          );
          break;
        case TokenKind.KEYS_FILTER:
          items.push(this.parseFilter(stream, true));
          break;
        case TokenKind.KEYS:
          items.push(new KeysSelector(this.environment, stream.current));
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
      }

      stream.next();
    }

    if (!items.length) {
      throw new JSONPathSyntaxError("empty bracketed segment", token);
    }

    return new BracketedSelection(this.environment, token, items);
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
    return new NumberLiteral(stream.current, Number(stream.current.value));
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
      new JSONPath(this.environment, this.parsePath(stream, true)),
    );
  }

  protected parseRelativeQuery(stream: TokenStream): RelativeQuery {
    const tok = stream.next();
    return new RelativeQuery(
      tok,
      new JSONPath(this.environment, this.parsePath(stream, true)),
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

  protected decodeString(token: Token, isName: boolean = false): string {
    try {
      return JSON.parse(
        token.kind === TokenKind.SINGLE_QUOTE_STRING
          ? `"${token.value.replaceAll('"', '\\"').replaceAll("\\'", "'")}"`
          : `"${token.value}"`,
      );
    } catch {
      throw new JSONPathSyntaxError(
        `invalid ${isName ? "name selector" : "string literal"} '${
          token.value
        }'`,
        token,
      );
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
}
