import { JSONPathSyntaxError } from "./errors";
import { Tokens, type Token, type TokenKind } from "./token";

const reFloat = /(:?-?\d+\.\d+(?:[eE][+-]?\d+)?)|(-?\d+[eE]-\d+)/y;
const reInt = /-?\d+/y;
const reInteger = /-?\d+[eE]\+?\d+/y;
const reName = /[\u0080-\u{10FFFF}a-zA-Z_][\u0080-\u{10FFFF}a-zA-Z0-9_]*/uy;
const reTrivia = /[ \n\r\t]+/;

export function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  const length = source.length;
  let pos = 0;
  let byte: number;
  let match: string | undefined;
  let token: Token;
  let newPos: number;

  while (pos < length) {
    byte = source.charCodeAt(pos);

    switch (byte) {
      case 42: // *
        tokens.push({ kind: Tokens.ASTERISK, start: pos, end: pos + 1 });
        pos += 1;
        break;
      case 64: // @
        tokens.push({ kind: Tokens.AT, start: pos, end: pos + 1 });
        pos += 1;
        break;
      case 58: // :
        tokens.push({ kind: Tokens.COLON, start: pos, end: pos + 1 });
        pos += 1;
        break;
      case 44: // ,
        tokens.push({ kind: Tokens.COMMA, start: pos, end: pos + 1 });
        pos += 1;
        break;
      case 36: // $
        tokens.push({ kind: Tokens.DOLLAR, start: pos, end: pos + 1 });
        pos += 1;
        break;
      case 40: // (
        tokens.push({ kind: Tokens.LEFT_PAREN, start: pos, end: pos + 1 });
        pos += 1;
        break;
      case 91: // [
        tokens.push({ kind: Tokens.LEFT_BRACKET, start: pos, end: pos + 1 });
        pos += 1;
        break;
      case 41: // )
        tokens.push({ kind: Tokens.RIGHT_PAREN, start: pos, end: pos + 1 });
        pos += 1;
        break;
      case 93: // ]
        tokens.push({ kind: Tokens.RIGHT_BRACKET, start: pos, end: pos + 1 });
        pos += 1;
        break;
      case 63: // ?
        tokens.push({ kind: Tokens.QUESTION, start: pos, end: pos + 1 });
        pos += 1;
        break;
      case 35: // #
        tokens.push({ kind: Tokens.HASH, start: pos, end: pos + 1 });
        pos += 1;
        break;
      case 38: // &
        if (source.charCodeAt(pos + 1) == 38) {
          tokens.push({ kind: Tokens.AND, start: pos, end: pos + 2 });
          pos += 2;
        } else {
          throw new JSONPathSyntaxError(
            "unexpected '&', did you mean '&&'?",
            { kind: Tokens.ERROR, start: pos, end: pos + 1 },
            source,
          );
        }
        break;
      case 124: // |
        if (source.charCodeAt(pos + 1) == 124) {
          tokens.push({ kind: Tokens.OR, start: pos, end: pos + 2 });
          pos += 2;
        } else {
          throw new JSONPathSyntaxError(
            "unexpected '|', did you mean '||'?",
            { kind: Tokens.ERROR, start: pos, end: pos + 1 },
            source,
          );
        }
        break;
      case 46: // .
        if (source.charCodeAt(pos + 1) == 46) {
          tokens.push({ kind: Tokens.DOUBLE_DOT, start: pos, end: pos + 2 });
          pos += 2;
        } else {
          tokens.push({ kind: Tokens.DOT, start: pos, end: pos + 1 });
          pos += 1;
        }
        break;
      case 61: // =
        if (source.charCodeAt(pos + 1) == 61) {
          tokens.push({ kind: Tokens.EQ, start: pos, end: pos + 2 });
          pos += 2;
        } else {
          throw new JSONPathSyntaxError(
            "unexpected '=', did you mean '=='?",
            { kind: Tokens.ERROR, start: pos, end: pos + 1 },
            source,
          );
        }
        break;
      case 33: // !
        if (source.charCodeAt(pos + 1) == 61) {
          tokens.push({ kind: Tokens.NE, start: pos, end: pos + 2 });
          pos += 2;
        } else {
          tokens.push({ kind: Tokens.EXCLAMATION, start: pos, end: pos + 1 });
          pos += 1;
        }
        break;
      case 62: // >
        if (source.charCodeAt(pos + 1) == 61) {
          tokens.push({ kind: Tokens.GE, start: pos, end: pos + 2 });
          pos += 2;
        } else {
          tokens.push({ kind: Tokens.GT, start: pos, end: pos + 1 });
          pos += 1;
        }
        break;
      case 60: // <
        if (source.charCodeAt(pos + 1) == 61) {
          tokens.push({ kind: Tokens.LE, start: pos, end: pos + 2 });
          pos += 2;
        } else {
          tokens.push({ kind: Tokens.LT, start: pos, end: pos + 1 });
          pos += 1;
        }
        break;
      case 126: // ~
        if (source.charCodeAt(pos + 1) == 63) {
          tokens.push({
            kind: Tokens.TILDE_QUESTION,
            start: pos,
            end: pos + 2,
          });
          pos += 2;
        } else {
          tokens.push({ kind: Tokens.TILDE, start: pos, end: pos + 1 });
          pos += 1;
        }
        break;
      case 39: // '
        [token, newPos] = scanStringLiteral(
          source,
          pos + 1,
          39,
          34,
          Tokens.SINGLE_QUOTED_STRING,
          Tokens.SINGLE_QUOTED_ESC_STRING,
        );
        tokens.push(token);
        pos = newPos;
        break;
      case 34: // "
        [token, newPos] = scanStringLiteral(
          source,
          pos + 1,
          34,
          39,
          Tokens.DOUBLE_QUOTED_STRING,
          Tokens.DOUBLE_QUOTED_ESC_STRING,
        );
        tokens.push(token);
        pos = newPos;
        break;
      default:
        if (isNameFirst(byte)) {
          match = scan(reName, source, pos);
          if (match) {
            tokens.push({
              kind: Tokens.WORD,
              start: pos,
              end: pos + match.length,
            });
            pos += match.length;
            continue;
          }
        }

        if (isTrivia(byte)) {
          match = scan(reTrivia, source, pos);
          if (match) {
            tokens.push({
              kind: Tokens.TRIVIA,
              start: pos,
              end: pos + match.length,
            });
            pos += match.length;
            continue;
          }
        }

        if (isNumber(byte)) {
          match = scan(reFloat, source, pos);
          if (match) {
            tokens.push({
              kind: Tokens.FLOAT,
              start: pos,
              end: pos + match.length,
            });
            pos += match.length;
            continue;
          }

          match = scan(reInteger, source, pos);
          if (match) {
            tokens.push({
              kind: Tokens.INTEGER,
              start: pos,
              end: pos + match.length,
            });
            pos += match.length;
            continue;
          }

          match = scan(reInt, source, pos);
          if (match) {
            tokens.push({
              kind: Tokens.INT,
              start: pos,
              end: pos + match.length,
            });
            pos += match.length;
            continue;
          }
        }

        throw new JSONPathSyntaxError(
          "unexpected '" + String.fromCharCode(byte) + "'",
          { kind: Tokens.ERROR, start: pos, end: pos + 1 },
          source,
        );
    }
  }

  return tokens;
}

function scan(pattern: RegExp, source: string, pos: number): string | undefined {
  pattern.lastIndex = pos;
  const match = pattern.exec(source);
  return match ? match[0] : undefined;
}

function scanStringLiteral(
  source: string,
  pos: number,
  quote: number,
  otherQuote: number,
  kind: TokenKind,
  escKind: TokenKind,
): [Token, number] {
  const start = pos;
  const length = source.length;
  let byte: number;

  while (pos < length) {
    byte = source.charCodeAt(pos);

    switch (byte) {
      case quote:
        return [{ kind, start, end: pos }, pos + 1];

      case 92: // \
        if (source.charCodeAt(pos + 1) === otherQuote || Number.isNaN(source.charCodeAt(pos + 1))) {
          throw new JSONPathSyntaxError(
            "invalid escape sequence",
            {
              kind: Tokens.ERROR,
              start: pos,
              end: pos + 1,
            },
            source,
          );
        }

        pos += 2;
        kind = escKind;
        break;

      default:
        if (byte <= 0x1f) {
          throw new JSONPathSyntaxError(
            "invalid character 0x" + byte.toString(16),
            {
              kind: Tokens.ERROR,
              start: pos,
              end: pos + 1,
            },
            source,
          );
        }

        pos += 1;
    }
  }

  throw new JSONPathSyntaxError(
    "unclosed string literal",
    {
      kind: Tokens.ERROR,
      start,
      end: pos,
    },
    source,
  );
}

function isNumber(byte: number): boolean {
  return byte == 45 || (byte >= 48 && byte <= 57);
}

function isNameFirst(byte: number): boolean {
  return (
    (byte >= 65 && byte <= 90) ||
    (byte >= 97 && byte <= 122) ||
    byte == 95 ||
    (byte >= 0x80 && byte <= 0x10ffff)
  );
}

function isTrivia(byte: number): boolean {
  return byte === 32 || byte === 9 || byte === 10 || byte === 13;
}
