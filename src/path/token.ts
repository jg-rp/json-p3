import { JSONPathSyntaxError } from "./errors";

/**
 *
 */
export enum TokenKind {
  AND = "TOKEN_AND",
  COLON = "TOKEN_COLON",
  COMMA = "TOKEN_COMMA",
  DDOT = "TOKEN_DDOT",
  DOT = "TOKEN_DOT",
  EOF = "TOKEN_EOF",
  EQ = "TOKEN_EQ",
  ERROR = "TOKEN_ERROR",
  FALSE = "TOKEN_FALSE",
  FILTER = "TOKEN_FILTER_START",
  FUNCTION = "TOKEN_FUNCTION",
  GE = "TOKEN_GE",
  GT = "TOKEN_GT",
  INDEX = "TOKEN_INDEX",
  LBRACKET = "TOKEN_LBRACKET",
  LE = "TOKEN_LE",
  LG = "TOKEN_LG",
  LPAREN = "TOKEN_LPAREN",
  LT = "TOKEN_LT",
  NE = "TOKEN_NE",
  NULL = "TOKEN_NULL",
  NOT = "TOKEN_NOT",
  OR = "TOKEN_OR",
  NAME = "TOKEN_NAME",
  NUMBER = "NUMBER",
  RBRACKET = "TOKEN_RBRACKET",
  ROOT = "TOKEN_ROOT",
  RPAREN = "TOKEN_RPAREN",
  CURRENT = "TOKEN_CURRENT_NODE",
  STRING = "TOKEN_STRING",
  TRUE = "TOKEN_TRUE",
  WILD = "TOKEN_WILD",
}

/**
 *
 */
export class Token {
  constructor(
    readonly kind: TokenKind,
    readonly value: string,
    readonly index: number,
    readonly input: string,
  ) {}
}

export const EOF = new Token(TokenKind.EOF, "", -1, "");

/**
 *
 */
export class TokenStream {
  #pos: number = 0;

  constructor(private tokens: Token[]) {}

  public get current(): Token {
    return this.tokens[this.#pos];
  }

  public get peek(): Token {
    if (this.#pos >= this.tokens.length - 1)
      return this.tokens[this.tokens.length - 1];
    return this.tokens[this.#pos + 1];
  }

  public next(): Token {
    const current = this.current;
    this.#pos += 1;
    return current;
  }

  public backup(): void {
    if (this.#pos > 0) this.#pos -= 1;
  }

  public expect(kind: TokenKind): void {
    if (this.current.kind !== kind) {
      throw new JSONPathSyntaxError(
        `expected token '${kind}', found '${this.current.kind}'`,
        this.current,
      );
    }
  }

  public expectPeek(kind: TokenKind): void {
    const peeked = this.peek;
    if (peeked.kind !== kind) {
      throw new JSONPathSyntaxError(
        `expected token '${kind}', found '${peeked.kind}'`,
        peeked,
      );
    }
  }
}
