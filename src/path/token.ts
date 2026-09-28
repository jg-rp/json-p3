export type Token = {
  kind: (typeof Tokens)[keyof typeof Tokens];
  start: number;
  end: number;
};

export type TokenKind = (typeof Tokens)[keyof typeof Tokens];

/**
 * Token kind enumeration.
 */
export const Tokens = {
  AND: 1,
  ASTERISK: 2,
  AT: 3,
  COLON: 4,
  COMMA: 5,
  DOLLAR: 6,
  DOT: 7,
  DOUBLE_DOT: 8,
  DOUBLE_QUOTED_ESC_STRING: 9,
  DOUBLE_QUOTED_STRING: 10,
  EOI: 11,
  EQ: 12,
  ERROR: 13,
  EXCLAMATION: 14,
  FLOAT: 15,
  GE: 16,
  GT: 17,
  INT: 18, // Without exponent (could be an index)
  INTEGER: 19, // With exponent
  LE: 20,
  LEFT_BRACKET: 21,
  LEFT_PAREN: 22,
  LT: 23,
  NE: 24,
  OR: 25,
  QUESTION: 26,
  RIGHT_BRACKET: 27,
  RIGHT_PAREN: 28,
  SINGLE_QUOTED_ESC_STRING: 29,
  SINGLE_QUOTED_STRING: 30,
  SPAN: 31,
  TRIVIA: 32,
  WORD: 33,

  // Non-standard tokens
  HASH: 50,
  TILDE: 51,
  TILDE_QUESTION: 52,
} as const;

export const REVERSE_T: Record<(typeof Tokens)[keyof typeof Tokens], string> = {
  1: "'&&'",
  2: "'*'",
  3: "'@'",
  4: "':'",
  5: "','",
  6: "'$'",
  7: "'.'",
  8: "'..'",
  9: "STRING LITERAL",
  10: "STRING LITERAL",
  11: "END OF INPUT",
  12: "'='",
  13: "ERROR",
  14: "'!'",
  15: "FLOAT LITERAL",
  16: "'>='",
  17: "'>'",
  18: "INTEGER LITERAL",
  19: "INTEGER LITERAL",
  20: "'<='",
  21: "'['",
  22: "'('",
  23: "'<'",
  24: "'!='",
  25: "'||'",
  26: "'?'",
  27: "']'",
  28: "')'",
  29: "STRING LITERAL",
  30: "LITERAL",
  31: "SPAN",
  32: "WHITESPACE",
  33: "NAME",
  50: "'#'",
  51: "'~'",
  52: "'~?'",
};

//as Record<(typeof Tokens)[keyof typeof Tokens], string>;

export function getTokenValue(token: Token, source: string): string {
  return source.slice(token.start, token.end);
}

export function span(start: Token, end: Token): Token {
  return { kind: Tokens.SPAN, start: start.start, end: end.end };
}
