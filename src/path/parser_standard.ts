import {
  ABSOLUTE_QUERY_EXPRESSION,
  AND_EXPRESSION,
  BOOL_EXPRESSION,
  CHILD_SEGMENT,
  CURRENT_KEY_EXPRESSION,
  DESCENDANT_SEGMENT,
  EQ_EXPRESSION,
  FILTER_SELECTOR,
  FUNCTION_EXPRESSION,
  GE_EXPRESSION,
  GT_EXPRESSION,
  INDEX_SELECTOR,
  KEY_SELECTOR,
  KEYS_FILTER_SELECTOR,
  KEYS_SELECTOR,
  LE_EXPRESSION,
  LT_EXPRESSION,
  NAME_SELECTOR,
  NE_EXPRESSION,
  NOT_EXPRESSION,
  NULL_EXPRESSION,
  NUMBER_EXPRESSION,
  OR_EXPRESSION,
  RELATIVE_QUERY_EXPRESSION,
  SLICE_SELECTOR,
  STRING_EXPRESSION,
  WILDCARD_SELECTOR,
  type AbsoluteQueryExpression,
  type Expression,
  type FilterSelector,
  type FunctionExpression,
  type KeysFilterSelector,
  type NumberExpression,
  type RelativeQueryExpression,
  type Segment,
  type Selector,
  type SliceSelector,
} from "./ast.js";
import { JSONPathSyntaxError } from "./errors.js";
import { Parser } from "./parser.js";
import { REVERSE_T, span, Tokens, type Token, type TokenKind } from "./token.js";

const PRECEDENCE_LOWEST = 1;
const PRECEDENCE_LOGICAL_OR = 4;
const PRECEDENCE_LOGICAL_AND = 5;
const PRECEDENCE_COMPARISON = 6;
const PRECEDENCE_PREFIX = 7;

const PRECEDENCES: Map<TokenKind, number> = new Map([
  [Tokens.AND, PRECEDENCE_LOGICAL_AND],
  [Tokens.EQ, PRECEDENCE_COMPARISON],
  [Tokens.GE, PRECEDENCE_COMPARISON],
  [Tokens.GT, PRECEDENCE_COMPARISON],
  [Tokens.LE, PRECEDENCE_COMPARISON],
  [Tokens.LT, PRECEDENCE_COMPARISON],
  [Tokens.NE, PRECEDENCE_COMPARISON],
  [Tokens.EXCLAMATION, PRECEDENCE_PREFIX],
  [Tokens.OR, PRECEDENCE_LOGICAL_OR],
  [Tokens.RIGHT_PAREN, PRECEDENCE_LOWEST],
]);

// A mapping of infix operator token kind to a flag indicating if the operator is a comparison
// operator.
const INFIX_OPERATORS: Map<TokenKind, boolean> = new Map([
  [Tokens.AND, false],
  [Tokens.EQ, true],
  [Tokens.GE, true],
  [Tokens.GT, true],
  [Tokens.LE, true],
  [Tokens.LT, true],
  [Tokens.NE, true],
  [Tokens.OR, false],
]);

export class StandardParser extends Parser {
  override parse(): Segment[] {
    this.eat(Tokens.DOLLAR);
    const segments = this.parseSegments();
    this.eat(Tokens.EOI);
    return segments;
  }

  parseSegments(): Segment[] {
    const segments: Segment[] = [];
    let token: Token;
    let endToken: Token;
    let selectors: Selector[];

    this.raiseForDepth();

    for (;;) {
      switch (this.kind()) {
        case Tokens.TRIVIA:
          this.pos += 1;
          if (this.kind() == Tokens.EOI) {
            throw new JSONPathSyntaxError(
              "unexpected trailing whitespace",
              this.current(),
              this.source,
            );
          }
          break;

        case Tokens.DOUBLE_DOT:
          token = this.next();
          [selectors, endToken] = this.parseDescendantSelectors();
          segments.push({ kind: DESCENDANT_SEGMENT, token: span(token, endToken), selectors });
          break;

        case Tokens.DOT:
          token = this.next();
          [selectors, endToken] = this.parseShorthandSelector();
          segments.push({ kind: CHILD_SEGMENT, token: span(token, endToken), selectors });
          break;

        case Tokens.LEFT_BRACKET:
          token = this.current();
          [selectors, endToken] = this.parseBracketedSelectors();
          segments.push({ kind: CHILD_SEGMENT, token: span(token, endToken), selectors });
          break;

        default:
          return segments;
      }
    }
  }

  parseDescendantSelectors(): [Selector[], Token] {
    switch (this.kind()) {
      case Tokens.WORD:
      case Tokens.ASTERISK:
      case Tokens.TILDE:
        return this.parseShorthandSelector();

      case Tokens.LEFT_BRACKET:
        return this.parseBracketedSelectors();

      default:
        throw new JSONPathSyntaxError("expected a selector", this.current(), this.source);
    }
  }

  parseShorthandSelector(): [Selector[], Token] {
    const token = this.next();

    switch (token.kind) {
      case Tokens.WORD:
        return [[{ kind: NAME_SELECTOR, token, value: this.tokenValue(token) }], token];

      case Tokens.ASTERISK:
        return [[{ kind: WILDCARD_SELECTOR, token }], token];

      case Tokens.TILDE:
        if (this.strict) {
          throw new JSONPathSyntaxError(`unexpected '~'`, token, this.source);
        }

        if (this.kind() === Tokens.WORD) {
          return [
            [{ kind: KEY_SELECTOR, token: this.current(), value: this.tokenValue(this.current()) }],
            this.next(),
          ];
        }

        return [[{ kind: KEYS_SELECTOR, token }], token];

      default:
        throw new JSONPathSyntaxError(
          `expected a shorthand selector, found ${this.errorString(token)}`,
          token,
          this.source,
        );
    }
  }

  parseBracketedSelectors(): [Selector[], Token] {
    const startToken = this.eat(Tokens.LEFT_BRACKET);
    const selectors: Selector[] = [];

    loop: for (;;) {
      this.skip(Tokens.TRIVIA);

      switch (this.kind()) {
        case Tokens.RIGHT_BRACKET:
          break loop;

        case Tokens.INT:
          selectors.push(this.parseIndexOrSlice());
          break;

        case Tokens.DOUBLE_QUOTED_STRING:
        case Tokens.DOUBLE_QUOTED_ESC_STRING:
        case Tokens.SINGLE_QUOTED_STRING:
        case Tokens.SINGLE_QUOTED_ESC_STRING:
          selectors.push({
            kind: NAME_SELECTOR,
            token: this.current(),
            value: this.decodeStringLiteral(this.next()),
          });
          break;

        case Tokens.COLON:
          selectors.push(this.parseSliceSelector());
          break;

        case Tokens.ASTERISK:
          selectors.push({ kind: WILDCARD_SELECTOR, token: this.next() });
          break;

        case Tokens.QUESTION:
          selectors.push(this.parseFilterSelector());
          break;

        case Tokens.TILDE:
          const token = this.next();

          if (this.strict) {
            throw new JSONPathSyntaxError(`unexpected '~'`, token, this.source);
          }

          switch (this.kind()) {
            case Tokens.DOUBLE_QUOTED_STRING:
            case Tokens.DOUBLE_QUOTED_ESC_STRING:
            case Tokens.SINGLE_QUOTED_STRING:
            case Tokens.SINGLE_QUOTED_ESC_STRING:
              const quotedToken = this.next();
              selectors.push({
                kind: KEY_SELECTOR,
                token: span(token, quotedToken),
                value: this.decodeStringLiteral(quotedToken),
              });
              break;

            default:
              selectors.push({ kind: KEYS_SELECTOR, token });
          }

          break;

        case Tokens.TILDE_QUESTION:
          if (this.strict) {
            throw new JSONPathSyntaxError(`unexpected '~'`, this.current(), this.source);
          }

          selectors.push(this.parseKeysFilterSelector());
          break;

        case Tokens.EOI:
          throw new JSONPathSyntaxError("unexpected end of query", this.current(), this.source);

        default:
          throw new JSONPathSyntaxError("unexpected token", this.current(), this.source);
      }

      this.skip(Tokens.TRIVIA);

      switch (this.kind()) {
        case Tokens.RIGHT_BRACKET:
          break loop;

        case Tokens.EOI:
          throw new JSONPathSyntaxError("unexpected end of query", this.current(), this.source);

        case Tokens.COMMA:
          this.pos++;
          this.skip(Tokens.TRIVIA);

          if (this.kind() == Tokens.RIGHT_BRACKET) {
            throw new JSONPathSyntaxError("unexpected trailing comma", this.current(), this.source);
          }

          break;

        default:
          throw new JSONPathSyntaxError(
            "expected a comma or closing bracket",
            this.current(),
            this.source,
          );
      }
    }

    this.skip(Tokens.TRIVIA);

    if (selectors.length === 0) {
      throw new JSONPathSyntaxError(
        "empty bracketed segment",
        span(startToken, this.next()),
        this.source,
      );
    }

    return [selectors, this.next()];
  }

  parseIndexOrSlice(): Selector {
    const token = this.eat(Tokens.INT);
    const startIndex = this.parseInt(token);

    this.skip(Tokens.TRIVIA);

    if (this.kind() !== Tokens.COLON) {
      return { kind: INDEX_SELECTOR, token, value: startIndex };
    }

    let end: number | undefined = undefined;
    let step: number | undefined = undefined;
    let endToken = this.eat(Tokens.COLON);

    this.skip(Tokens.TRIVIA);

    if (this.kind() == Tokens.INT) {
      endToken = this.next();
      end = this.parseInt(endToken);
      this.skip(Tokens.TRIVIA);
    }

    if (this.kind() == Tokens.COLON) {
      endToken = this.next();
      this.skip(Tokens.TRIVIA);

      if (this.kind() == Tokens.INT) {
        endToken = this.next();
        step = this.parseInt(endToken);
      }
    }

    return { kind: SLICE_SELECTOR, token: span(token, endToken), start: startIndex, end, step };
  }

  parseSliceSelector(): SliceSelector {
    const token = this.eat(Tokens.COLON);
    let endToken = token;

    this.skip(Tokens.TRIVIA);

    let end: number | undefined = undefined;
    let step: number | undefined = undefined;

    if (this.kind() == Tokens.INT) {
      endToken = this.next();
      end = this.parseInt(endToken);
      this.skip(Tokens.TRIVIA);
    }

    if (this.kind() == Tokens.COLON) {
      endToken = this.next();
      this.skip(Tokens.TRIVIA);

      if (this.kind() == Tokens.INT) {
        endToken = this.next();
        step = this.parseInt(endToken);
      }
    }

    return { kind: SLICE_SELECTOR, token: span(token, endToken), start: undefined, end, step };
  }

  parseFilterSelector(): FilterSelector {
    const token = this.eat(Tokens.QUESTION);
    const expr = this.parseFilterExpression();
    this.raiseForNotCompared(expr.token, expr);
    return { kind: FILTER_SELECTOR, token: span(token, expr.token), expression: expr };
  }

  parseKeysFilterSelector(): KeysFilterSelector {
    const token = this.eat(Tokens.TILDE_QUESTION);
    const expr = this.parseFilterExpression();
    this.raiseForNotCompared(expr.token, expr);
    return { kind: KEYS_FILTER_SELECTOR, token: span(token, expr.token), expression: expr };
  }

  parseFilterExpression(precedence: number = PRECEDENCE_LOWEST): Expression {
    this.raiseForDepth();

    let left = this.parsePrimary();
    let kind: TokenKind;

    for (;;) {
      this.skip(Tokens.TRIVIA);
      kind = this.kind();

      if (!INFIX_OPERATORS.has(kind) || (PRECEDENCES.get(kind) || PRECEDENCE_LOWEST) < precedence) {
        return left;
      }

      left = this.parseInfixExpression(left, kind);
    }
  }

  parsePrimary(): Expression {
    this.skip(Tokens.TRIVIA);

    switch (this.kind()) {
      case Tokens.DOUBLE_QUOTED_STRING:
      case Tokens.DOUBLE_QUOTED_ESC_STRING:
      case Tokens.SINGLE_QUOTED_STRING:
      case Tokens.SINGLE_QUOTED_ESC_STRING:
        return {
          kind: STRING_EXPRESSION,
          token: this.current(),
          value: this.decodeStringLiteral(this.next()),
        };

      case Tokens.WORD:
        switch (this.value()) {
          case "null":
            return { kind: NULL_EXPRESSION, token: this.next() };
          case "true":
            return { kind: BOOL_EXPRESSION, token: this.next(), value: true };
          case "false":
            return { kind: BOOL_EXPRESSION, token: this.next(), value: false };
          default:
            return this.parseFunctionExpression();
        }

      case Tokens.LEFT_PAREN:
        return this.parseGroupedExpression();

      case Tokens.FLOAT:
        return this.parseFloatLiteral();

      case Tokens.INT:
      case Tokens.INTEGER:
        return this.parseIntegerLiteral();

      case Tokens.DOLLAR:
        return this.parseAbsoluteQuery();

      case Tokens.AT:
        return this.parseRelativeQuery();

      case Tokens.EXCLAMATION:
        return this.parsePrefixExpression();

      case Tokens.HASH:
        if (this.strict) {
          throw new JSONPathSyntaxError("unexpected '#'", this.current(), this.source);
        }

        return { kind: CURRENT_KEY_EXPRESSION, token: this.next() };

      default:
        throw new JSONPathSyntaxError(
          `unexpected '${REVERSE_T[this.kind()]}' (${this.value()})`,
          this.current(),
          this.source,
        );
    }
  }

  parseInfixExpression(left: Expression, kind: TokenKind): Expression {
    const opToken = this.next();
    const right = this.parseFilterExpression(PRECEDENCES.get(kind) || PRECEDENCE_LOWEST);
    const spanToken = span(left.token, right.token);

    if (INFIX_OPERATORS.get(kind)) {
      this.raiseForNotComparable(spanToken, left);
      this.raiseForNotComparable(spanToken, right);

      switch (kind) {
        case Tokens.EQ:
          return { kind: EQ_EXPRESSION, token: spanToken, left, right };

        case Tokens.NE:
          return { kind: NE_EXPRESSION, token: spanToken, left, right };

        case Tokens.LT:
          return { kind: LT_EXPRESSION, token: spanToken, left, right };

        case Tokens.LE:
          return { kind: LE_EXPRESSION, token: spanToken, left, right };

        case Tokens.GT:
          return { kind: GT_EXPRESSION, token: spanToken, left, right };

        case Tokens.GE:
          return { kind: GE_EXPRESSION, token: spanToken, left, right };

        default:
          throw new JSONPathSyntaxError(
            `unknown infix operator ${this.tokenValue(opToken)}`,
            opToken,
            this.source,
          );
      }
    }

    this.raiseForNotCompared(spanToken, left);
    this.raiseForNotCompared(spanToken, right);

    switch (kind) {
      case Tokens.AND:
        return { kind: AND_EXPRESSION, token: spanToken, left, right };

      case Tokens.OR:
        return { kind: OR_EXPRESSION, token: spanToken, left, right };

      default:
        throw new JSONPathSyntaxError(
          `unknown infix operator ${this.tokenValue(opToken)}`,
          opToken,
          this.source,
        );
    }
  }

  parsePrefixExpression(): Expression {
    const token = this.eat(Tokens.EXCLAMATION);
    const expr = this.parseFilterExpression(PRECEDENCE_PREFIX);
    return { kind: NOT_EXPRESSION, token: span(token, expr.token), right: expr };
  }

  parseGroupedExpression(): Expression {
    this.eat(Tokens.LEFT_PAREN);

    if (this.kind() === Tokens.RIGHT_PAREN) {
      throw new JSONPathSyntaxError("empty paren expression", this.current(), this.source);
    }

    const expr = this.parseFilterExpression(PRECEDENCE_LOWEST);
    this.skip(Tokens.TRIVIA);

    if (this.kind() == Tokens.EOI) {
      throw new JSONPathSyntaxError("unbalanced brackets", this.current(), this.source);
    }

    this.eat(Tokens.RIGHT_PAREN, "unbalanced brackets");
    return expr;
  }

  parseFunctionExpression(): FunctionExpression {
    const nameToken = this.next();
    const name = this.tokenValue(nameToken);
    const args: Expression[] = [];

    this.eat(Tokens.LEFT_PAREN);

    while (this.kind() !== Tokens.RIGHT_PAREN) {
      args.push(this.parseFilterExpression(PRECEDENCE_LOWEST));
      this.skip(Tokens.TRIVIA);

      if (this.kind() !== Tokens.RIGHT_PAREN) {
        this.skip(Tokens.TRIVIA);
        this.eat(Tokens.COMMA, "unbalanced brackets or missing comma");
      }
    }

    this.skip(Tokens.TRIVIA);
    this.eat(Tokens.RIGHT_PAREN);
    this.validateFunctionSignature(nameToken, name, args);

    const endToken = args[args.length - 1]!;

    return {
      kind: FUNCTION_EXPRESSION,
      token: span(nameToken, endToken.token),
      name,
      arguments: args,
    };
  }

  parseIntegerLiteral(): NumberExpression {
    const token = this.next();
    const value = this.tokenValue(token);

    if (value.startsWith("0") && value.length > 1) {
      throw new JSONPathSyntaxError(`invalid integer '${value}'`, token, this.source);
    }

    const n = Number(value);

    if (isNaN(n)) {
      throw new JSONPathSyntaxError(`invalid integer '${value}'`, token, this.source);
    }

    return { kind: NUMBER_EXPRESSION, token, value: n };
  }

  parseFloatLiteral(): NumberExpression {
    const token = this.next();
    const value = this.tokenValue(token);

    if (value.startsWith("0") && value[1] !== ".") {
      throw new JSONPathSyntaxError(`invalid float '${value}'`, token, this.source);
    }

    const n = Number(value);

    if (isNaN(n)) {
      throw new JSONPathSyntaxError(`invalid float '${value}'`, token, this.source);
    }

    return { kind: NUMBER_EXPRESSION, token, value: n };
  }

  parseAbsoluteQuery(): AbsoluteQueryExpression {
    const identToken = this.next();
    const segments = this.parseSegments();
    const token =
      segments.length > 0 ? span(identToken, segments[segments.length - 1]!.token) : identToken;
    return { kind: ABSOLUTE_QUERY_EXPRESSION, token, segments };
  }

  parseRelativeQuery(): RelativeQueryExpression {
    const identToken = this.next();
    const segments = this.parseSegments();
    const token =
      segments.length > 0 ? span(identToken, segments[segments.length - 1]!.token) : identToken;
    return { kind: RELATIVE_QUERY_EXPRESSION, token, segments };
  }
}
