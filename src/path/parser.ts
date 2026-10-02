import type { JSONPathEnvironment } from "./environment";

import {
  ABSOLUTE_QUERY_EXPRESSION,
  AND_EXPRESSION,
  BOOL_EXPRESSION,
  CURRENT_KEY_EXPRESSION,
  DESCENDANT_SEGMENT,
  EQ_EXPRESSION,
  FUNCTION_EXPRESSION,
  GE_EXPRESSION,
  GT_EXPRESSION,
  INDEX_SELECTOR,
  LE_EXPRESSION,
  LT_EXPRESSION,
  NAME_SELECTOR,
  NE_EXPRESSION,
  NULL_EXPRESSION,
  NUMBER_EXPRESSION,
  OR_EXPRESSION,
  RELATIVE_QUERY_EXPRESSION,
  STRING_EXPRESSION,
  type AbsoluteQueryExpression,
  type AndExpression,
  type BoolExpression,
  type EqExpression,
  type Expression,
  type GeExpression,
  type GtExpression,
  type LeExpression,
  type LtExpression,
  type NeExpression,
  type NullExpression,
  type NumberExpression,
  type OrExpression,
  type RelativeQueryExpression,
  type Segment,
  type StringExpression,
} from "./ast";
import {
  JSONPathIndexError,
  JSONPathNameError,
  JSONPathRecursionError,
  JSONPathSyntaxError,
  JSONPathTypeError,
} from "./errors";
import { LOGICAL_TYPE, NODES_TYPE, VALUE_TYPE, type ExpressionType } from "./functions";
import { getTokenValue, REVERSE_T, Tokens, type Token, type TokenKind } from "./token";

export abstract class Parser {
  protected length: number;
  protected pos: number;
  protected depth: number;
  protected maxDepth: number;
  protected strict: boolean;
  private eoi: Token;

  constructor(
    protected env: JSONPathEnvironment,
    protected source: string,
    protected tokens: Token[],
  ) {
    this.length = source.length;
    this.pos = 0;
    this.depth = 0;
    this.maxDepth = env.maxExpressionDepth;
    this.strict = env.strict;
    this.eoi = { kind: Tokens.EOI, start: this.length, end: this.length };
  }

  abstract parse(): Segment[];

  /**
   * Return the current token, or EOI if there are no tokens left.
   * Does not increment the token pointer
   */
  current(): Token {
    return this.tokens[this.pos] || this.eoi;
  }

  /**
   * Return the kind of the current token.
   */
  kind(): TokenKind {
    return (this.tokens[this.pos] || this.eoi).kind;
  }

  /**
   * Return the current token's value. The substring represented by the token.
   */
  value(): string {
    return getTokenValue(this.current(), this.source);
  }

  /**
   * Return the current token and increment the token pointer.
   * Returns EOI if there are no tokens left.
   */
  next(): Token {
    const token = this.tokens[this.pos] || this.eoi;
    if (token) {
      this.pos += 1;
    }
    return token;
  }

  /**
   * Return the token a pos+n without advancing the pointer.
   */
  peek(n: number = 1): Token {
    return this.tokens[this.pos + n] || this.eoi;
  }

  /**
   * Assert and consume a token of kind `kind`.
   * Raises a syntax error if the current token's kind is not `kind`.
   */
  eat(kind: TokenKind, message?: string): Token {
    const token = this.tokens[this.pos] || this.eoi;

    if (token.kind !== kind) {
      const expected = REVERSE_T[kind];
      const got = REVERSE_T[token.kind];
      const literal = got.startsWith("'")
        ? ""
        : ` (${JSON.stringify(getTokenValue(token, this.source))})`;

      throw new JSONPathSyntaxError(
        message || `expected ${expected}, found ${got}${literal}`,
        token,
        this.source,
      );
    }

    this.pos += 1;
    return token;
  }

  skip(kind: TokenKind): boolean {
    if (this.kind() === kind) {
      this.pos += 1;
      return true;
    }
    return false;
  }

  tokenValue(token: Token): string {
    return getTokenValue(token, this.source);
  }

  validateFunctionSignature(token: Token, name: string, args: Expression[]): void {
    const func = this.env.functions[name];

    if (!func) {
      throw new JSONPathNameError(`unknown function '${name}'`, token, this.source);
    }

    const arity = func.argTypes.length;

    if (args.length !== arity) {
      throw new JSONPathTypeError(
        `${name}() takes ${arity} argument${arity === 1 ? "" : "s"} (${args.length} given)`,
        token,
        this.source,
      );
    }

    for (let i = 0; i < arity; i++) {
      const arg: Expression = args[i]!;

      switch (func.argTypes[i]) {
        case VALUE_TYPE:
          if (!this.isValueTypeExpression(arg)) {
            throw new JSONPathTypeError(
              `${name}() argument ${i} must be a value type`,
              token,
              this.source,
            );
          }
          break;

        case LOGICAL_TYPE:
          if (!(this.isQueryExpression(arg) || this.isInfixExpression(arg))) {
            throw new JSONPathTypeError(
              `${name}() argument ${i} must be a logical type`,
              token,
              this.source,
            );
          }
          break;

        case NODES_TYPE:
          if (!(this.isQueryExpression(arg) || this.functionReturnType(arg) === NODES_TYPE)) {
            throw new JSONPathTypeError(
              `${name}() argument ${i} must be a nodes type`,
              token,
              this.source,
            );
          }
          break;
      }
    }
  }

  raiseForDepth(): void {
    this.depth++;
    if (this.depth > this.maxDepth) {
      throw new JSONPathRecursionError("maximum recursion depth reached");
    }
  }

  raiseForNotCompared(token: Token, expr: Expression): void {
    if (this.isLiteralExpression(expr)) {
      throw new JSONPathTypeError(
        "filter expression literals must be compared",
        token,
        this.source,
      );
    }

    if (expr.kind !== FUNCTION_EXPRESSION) {
      return;
    }

    const name = expr.name;
    const func = this.env.functions[name];

    if (!func) {
      throw new JSONPathNameError(`unknown function '${name}'`, token, this.source);
    }

    if (func.returnType === VALUE_TYPE) {
      throw new JSONPathTypeError(`result of ${name}() must be compared`, token, this.source);
    }
  }

  raiseForNotComparable(token: Token, expr: Expression): void {
    if (this.isQueryExpression(expr) && !this.isSingularQuery(expr)) {
      throw new JSONPathTypeError("non-singular query is not comparable", token, this.source);
    }

    if (expr.kind !== FUNCTION_EXPRESSION) {
      return;
    }

    const name = expr.name;
    const func = this.env.functions[name];

    if (!func) {
      throw new JSONPathNameError(`unknown function '${name}'`, token, this.source);
    }

    if (func.returnType !== VALUE_TYPE) {
      throw new JSONPathTypeError(`result of ${name}() is not comparable`, token, this.source);
    }
  }

  parseInt(token: Token): number {
    const value = this.tokenValue(token);

    if (value.length > 1 && (value.startsWith("0") || value.startsWith("-0"))) {
      throw new JSONPathIndexError(`invalid index '${value}'`, token, this.source);
    }

    const n = Number(value);

    if (n < this.env.minIntIndex || n > this.env.maxIntIndex) {
      throw new JSONPathIndexError(`index out of range ${value}`, token, this.source);
    }

    return n;
  }

  isSingularQuery(query: AbsoluteQueryExpression | RelativeQueryExpression): boolean {
    for (const { kind, selectors } of query.segments) {
      if (kind === DESCENDANT_SEGMENT) {
        return false;
      }

      if (selectors.length > 1) {
        return false;
      }

      const selector = selectors[0];
      if (selector && (selector.kind === NAME_SELECTOR || selector.kind === INDEX_SELECTOR)) {
        continue;
      }

      return false;
    }

    return true;
  }

  isQueryExpression(expr: Expression): expr is AbsoluteQueryExpression | RelativeQueryExpression {
    switch (expr.kind) {
      case ABSOLUTE_QUERY_EXPRESSION:
      case RELATIVE_QUERY_EXPRESSION:
        return true;
      default:
        return false;
    }
  }

  isLiteralExpression(
    expr: Expression,
  ): expr is NullExpression | BoolExpression | StringExpression | NumberExpression {
    switch (expr.kind) {
      case NULL_EXPRESSION:
      case BOOL_EXPRESSION:
      case STRING_EXPRESSION:
      case NUMBER_EXPRESSION:
        return true;
      default:
        return false;
    }
  }

  isInfixExpression(
    expr: Expression,
  ): expr is
    | AndExpression
    | OrExpression
    | EqExpression
    | NeExpression
    | GtExpression
    | GeExpression
    | LtExpression
    | LeExpression {
    switch (expr.kind) {
      case AND_EXPRESSION:
      case OR_EXPRESSION:
      case EQ_EXPRESSION:
      case NE_EXPRESSION:
      case GT_EXPRESSION:
      case GE_EXPRESSION:
      case LT_EXPRESSION:
      case LE_EXPRESSION:
        return true;
      default:
        return false;
    }
  }

  isValueTypeExpression(expr: Expression): boolean {
    switch (expr.kind) {
      case NULL_EXPRESSION:
      case BOOL_EXPRESSION:
      case STRING_EXPRESSION:
      case NUMBER_EXPRESSION:
      case CURRENT_KEY_EXPRESSION:
        return true;
      case ABSOLUTE_QUERY_EXPRESSION:
      case RELATIVE_QUERY_EXPRESSION:
        return this.isSingularQuery(expr);
      default:
        return this.functionReturnType(expr) === VALUE_TYPE;
    }
  }

  functionReturnType(expr: Expression): ExpressionType | undefined {
    if (expr.kind === FUNCTION_EXPRESSION) {
      const func = this.env.functions[expr.name];
      if (func) {
        return func.returnType;
      }
    }
    return undefined;
  }

  decodeStringLiteral(token: Token): string {
    const kind = token.kind;
    const value = this.tokenValue(token);

    if (kind === Tokens.SINGLE_QUOTED_STRING || kind === Tokens.DOUBLE_QUOTED_STRING) {
      return value;
    }

    if (kind === Tokens.SINGLE_QUOTED_ESC_STRING) {
      return this.unescape(token, value.replaceAll('"', '\\"').replaceAll("\\'", "'"));
    }

    return this.unescape(token, value);
  }

  unescape(token: Token, escaped: string): string {
    const parts = escaped.split(/(\\u[0-9a-fA-F]{4}|\\.)/s).filter((p) => p.length > 0);
    const length = parts.length;
    let unescaped = "";
    let part: string;
    let nextPart: string;
    let pos = 0;
    let codePoint: number;
    let lowSurrogate: number;

    while (pos < length) {
      part = parts[pos]!;
      pos++;

      if (!part.startsWith("\\")) {
        unescaped += part;
        continue;
      }

      switch (part) {
        case '\\"':
          unescaped += '"';
          break;
        case "\\\\":
          unescaped += "\\";
          break;
        case "\\/":
          unescaped += "/";
          break;
        case "\\b":
          unescaped += "\b";
          break;
        case "\\f":
          unescaped += "\f";
          break;
        case "\\n":
          unescaped += "\n";
          break;
        case "\\r":
          unescaped += "\r";
          break;
        case "\\t":
          unescaped += "\t";
          break;
        case "\\u":
          throw new JSONPathSyntaxError("invalid escape sequence", token, this.source);
        default:
          if (!part.startsWith("\\u")) {
            throw new JSONPathSyntaxError("invalid escape sequence", token, this.source);
          }

          codePoint = parseInt(part.slice(2), 16);

          if (this.isLowSurrogate(codePoint)) {
            throw new JSONPathSyntaxError("invalid escape sequence", token, this.source);
          }

          if (this.isHighSurrogate(codePoint)) {
            if (pos >= length) {
              throw new JSONPathSyntaxError("invalid escape sequence", token, this.source);
            }

            nextPart = parts[pos]!;
            pos++;

            if (!(nextPart.length == 6 && nextPart.startsWith("\\u"))) {
              throw new JSONPathSyntaxError("invalid escape sequence", token, this.source);
            }

            lowSurrogate = parseInt(nextPart.slice(2), 16);

            if (!this.isLowSurrogate(lowSurrogate)) {
              throw new JSONPathSyntaxError("invalid escape sequence", token, this.source);
            }

            unescaped += String.fromCharCode(codePoint, lowSurrogate);
          } else {
            if (codePoint < 0x1f) {
              throw new JSONPathSyntaxError("invalid escape sequence", token, this.source);
            }

            unescaped += String.fromCharCode(codePoint);
          }
      }
    }

    return unescaped;
  }

  isHighSurrogate(codePoint: number): boolean {
    return codePoint >= 0xd800 && codePoint <= 0xdbff;
  }

  isLowSurrogate(codePoint: number): boolean {
    return codePoint >= 0xdc00 && codePoint <= 0xdfff;
  }

  protected errorString(token: Token): string {
    const got = REVERSE_T[token.kind];
    const literal = got.startsWith("'")
      ? ""
      : ` (${JSON.stringify(getTokenValue(token, this.source))})`;

    return `${got}${literal}`;
  }
}
