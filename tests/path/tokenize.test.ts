import { JSONPathSyntaxError } from "../../src/path/errors.js";
import { tokenize } from "../../src/path/lexer.js";
import { getTokenValue, Tokens, type TokenKind } from "../../src/path/token.js";

function tokens(source: string): Array<[TokenKind, string]> {
  return tokenize(source).map((token) => {
    return [token.kind, getTokenValue(token, source)];
  });
}

describe("tokenize", () => {
  test("empty", () => {
    expect(tokens("")).toStrictEqual([]);
  });

  test("just root", () => {
    expect(tokens("$")).toStrictEqual([[Tokens.DOLLAR, "$"]]);
  });

  test("root dot prop", () => {
    expect(tokens("$.some.thing")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.DOT, "."],
      [Tokens.WORD, "some"],
      [Tokens.DOT, "."],
      [Tokens.WORD, "thing"],
    ]);
  });

  test("root bracket prop, single", () => {
    expect(tokens("$['some']['thing']")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.SINGLE_QUOTED_STRING, "some"],
      [Tokens.RIGHT_BRACKET, "]"],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.SINGLE_QUOTED_STRING, "thing"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("root bracket prop, double", () => {
    expect(tokens('$["some"]["thing"]')).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.DOUBLE_QUOTED_STRING, "some"],
      [Tokens.RIGHT_BRACKET, "]"],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.DOUBLE_QUOTED_STRING, "thing"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("root dot bracket prop", () => {
    expect(tokens("$.['some']['thing']")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.DOT, "."],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.SINGLE_QUOTED_STRING, "some"],
      [Tokens.RIGHT_BRACKET, "]"],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.SINGLE_QUOTED_STRING, "thing"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("root bracket index", () => {
    expect(tokens("$[1]")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.INT, "1"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("root bracket negative index", () => {
    expect(tokens("$[-1]")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.INT, "-1"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("root dot bracket index", () => {
    expect(tokens("$.[1]")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.DOT, "."],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.INT, "1"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("slice default start, stop and step", () => {
    expect(tokens("[:]")).toStrictEqual([
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.COLON, ":"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("slice default start, stop and step with two colons", () => {
    expect(tokens("[::]")).toStrictEqual([
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.COLON, ":"],
      [Tokens.COLON, ":"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("slice default stop and step", () => {
    expect(tokens("[1:]")).toStrictEqual([
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.INT, "1"],
      [Tokens.COLON, ":"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("slice default start and step", () => {
    expect(tokens("[:-1]")).toStrictEqual([
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.COLON, ":"],
      [Tokens.INT, "-1"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("slice default step", () => {
    expect(tokens("[1:7]")).toStrictEqual([
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.INT, "1"],
      [Tokens.COLON, ":"],
      [Tokens.INT, "7"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("slice default step", () => {
    expect(tokens("[1:7]")).toStrictEqual([
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.INT, "1"],
      [Tokens.COLON, ":"],
      [Tokens.INT, "7"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("slice explicit step", () => {
    expect(tokens("[1:7:2]")).toStrictEqual([
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.INT, "1"],
      [Tokens.COLON, ":"],
      [Tokens.INT, "7"],
      [Tokens.COLON, ":"],
      [Tokens.INT, "2"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("root dot wild", () => {
    expect(tokens("$.*")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.DOT, "."],
      [Tokens.ASTERISK, "*"],
    ]);
  });

  test("root bracket wild", () => {
    expect(tokens("$[*]")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.ASTERISK, "*"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("root descend", () => {
    expect(tokens("$..")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.DOUBLE_DOT, ".."],
    ]);
  });

  test("root descend prop", () => {
    expect(tokens("$..thing")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.DOUBLE_DOT, ".."],
      [Tokens.WORD, "thing"],
    ]);
  });

  test("root descend dot prop", () => {
    expect(tokens("$...thing")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.DOUBLE_DOT, ".."],
      [Tokens.DOT, "."],
      [Tokens.WORD, "thing"],
    ]);
  });

  test("root selector list", () => {
    expect(tokens("$[1,4,5]")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.INT, "1"],
      [Tokens.COMMA, ","],
      [Tokens.INT, "4"],
      [Tokens.COMMA, ","],
      [Tokens.INT, "5"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("filter, current node identifier", () => {
    expect(tokens("$[?(@.some)]")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.QUESTION, "?"],
      [Tokens.LEFT_PAREN, "("],
      [Tokens.AT, "@"],
      [Tokens.DOT, "."],
      [Tokens.WORD, "some"],
      [Tokens.RIGHT_PAREN, ")"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("filter, root node identifier", () => {
    expect(tokens("$[?($.some)]")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.QUESTION, "?"],
      [Tokens.LEFT_PAREN, "("],
      [Tokens.DOLLAR, "$"],
      [Tokens.DOT, "."],
      [Tokens.WORD, "some"],
      [Tokens.RIGHT_PAREN, ")"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("filter eq", () => {
    expect(tokens("$[?(@.some == 1.1)]")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.QUESTION, "?"],
      [Tokens.LEFT_PAREN, "("],
      [Tokens.AT, "@"],
      [Tokens.DOT, "."],
      [Tokens.WORD, "some"],
      [Tokens.TRIVIA, " "],
      [Tokens.EQ, "=="],
      [Tokens.TRIVIA, " "],
      [Tokens.FLOAT, "1.1"],
      [Tokens.RIGHT_PAREN, ")"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("filter le", () => {
    expect(tokens("$[?(@.some <= 1.1e2)]")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.QUESTION, "?"],
      [Tokens.LEFT_PAREN, "("],
      [Tokens.AT, "@"],
      [Tokens.DOT, "."],
      [Tokens.WORD, "some"],
      [Tokens.TRIVIA, " "],
      [Tokens.LE, "<="],
      [Tokens.TRIVIA, " "],
      [Tokens.FLOAT, "1.1e2"],
      [Tokens.RIGHT_PAREN, ")"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("filter lt", () => {
    expect(tokens("$[?(@.some < 1e2)]")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.QUESTION, "?"],
      [Tokens.LEFT_PAREN, "("],
      [Tokens.AT, "@"],
      [Tokens.DOT, "."],
      [Tokens.WORD, "some"],
      [Tokens.TRIVIA, " "],
      [Tokens.LT, "<"],
      [Tokens.TRIVIA, " "],
      [Tokens.INTEGER, "1e2"],
      [Tokens.RIGHT_PAREN, ")"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("filter ge", () => {
    expect(tokens("$[?(@.some >= 1)]")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.QUESTION, "?"],
      [Tokens.LEFT_PAREN, "("],
      [Tokens.AT, "@"],
      [Tokens.DOT, "."],
      [Tokens.WORD, "some"],
      [Tokens.TRIVIA, " "],
      [Tokens.GE, ">="],
      [Tokens.TRIVIA, " "],
      [Tokens.INT, "1"],
      [Tokens.RIGHT_PAREN, ")"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("filter gt", () => {
    expect(tokens("$[?(@.some > 1)]")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.QUESTION, "?"],
      [Tokens.LEFT_PAREN, "("],
      [Tokens.AT, "@"],
      [Tokens.DOT, "."],
      [Tokens.WORD, "some"],
      [Tokens.TRIVIA, " "],
      [Tokens.GT, ">"],
      [Tokens.TRIVIA, " "],
      [Tokens.INT, "1"],
      [Tokens.RIGHT_PAREN, ")"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("filter ne", () => {
    expect(tokens("$[?(@.some != 1)]")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.QUESTION, "?"],
      [Tokens.LEFT_PAREN, "("],
      [Tokens.AT, "@"],
      [Tokens.DOT, "."],
      [Tokens.WORD, "some"],
      [Tokens.TRIVIA, " "],
      [Tokens.NE, "!="],
      [Tokens.TRIVIA, " "],
      [Tokens.INT, "1"],
      [Tokens.RIGHT_PAREN, ")"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("logical and", () => {
    expect(tokens("$[?(@.some && @.thing)]")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.QUESTION, "?"],
      [Tokens.LEFT_PAREN, "("],
      [Tokens.AT, "@"],
      [Tokens.DOT, "."],
      [Tokens.WORD, "some"],
      [Tokens.TRIVIA, " "],
      [Tokens.AND, "&&"],
      [Tokens.TRIVIA, " "],
      [Tokens.AT, "@"],
      [Tokens.DOT, "."],
      [Tokens.WORD, "thing"],
      [Tokens.RIGHT_PAREN, ")"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("logical or", () => {
    expect(tokens("$[?(@.some || @.thing)]")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.QUESTION, "?"],
      [Tokens.LEFT_PAREN, "("],
      [Tokens.AT, "@"],
      [Tokens.DOT, "."],
      [Tokens.WORD, "some"],
      [Tokens.TRIVIA, " "],
      [Tokens.OR, "||"],
      [Tokens.TRIVIA, " "],
      [Tokens.AT, "@"],
      [Tokens.DOT, "."],
      [Tokens.WORD, "thing"],
      [Tokens.RIGHT_PAREN, ")"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("logical not", () => {
    expect(tokens("$[?(!@.some)]")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.QUESTION, "?"],
      [Tokens.LEFT_PAREN, "("],
      [Tokens.EXCLAMATION, "!"],
      [Tokens.AT, "@"],
      [Tokens.DOT, "."],
      [Tokens.WORD, "some"],
      [Tokens.RIGHT_PAREN, ")"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("single quoted with escape sequence", () => {
    expect(tokens("$[?(@.some == 'a\\nb')]")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.QUESTION, "?"],
      [Tokens.LEFT_PAREN, "("],
      [Tokens.AT, "@"],
      [Tokens.DOT, "."],
      [Tokens.WORD, "some"],
      [Tokens.TRIVIA, " "],
      [Tokens.EQ, "=="],
      [Tokens.TRIVIA, " "],
      [Tokens.SINGLE_QUOTED_ESC_STRING, "a\\nb"],
      [Tokens.RIGHT_PAREN, ")"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("true", () => {
    expect(tokens("$[?(@.some == true)]")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.QUESTION, "?"],
      [Tokens.LEFT_PAREN, "("],
      [Tokens.AT, "@"],
      [Tokens.DOT, "."],
      [Tokens.WORD, "some"],
      [Tokens.TRIVIA, " "],
      [Tokens.EQ, "=="],
      [Tokens.TRIVIA, " "],
      [Tokens.WORD, "true"],
      [Tokens.RIGHT_PAREN, ")"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("false", () => {
    expect(tokens("$[?(@.some == false)]")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.QUESTION, "?"],
      [Tokens.LEFT_PAREN, "("],
      [Tokens.AT, "@"],
      [Tokens.DOT, "."],
      [Tokens.WORD, "some"],
      [Tokens.TRIVIA, " "],
      [Tokens.EQ, "=="],
      [Tokens.TRIVIA, " "],
      [Tokens.WORD, "false"],
      [Tokens.RIGHT_PAREN, ")"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("null", () => {
    expect(tokens("$[?(@.some == null)]")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.LEFT_BRACKET, "["],
      [Tokens.QUESTION, "?"],
      [Tokens.LEFT_PAREN, "("],
      [Tokens.AT, "@"],
      [Tokens.DOT, "."],
      [Tokens.WORD, "some"],
      [Tokens.TRIVIA, " "],
      [Tokens.EQ, "=="],
      [Tokens.TRIVIA, " "],
      [Tokens.WORD, "null"],
      [Tokens.RIGHT_PAREN, ")"],
      [Tokens.RIGHT_BRACKET, "]"],
    ]);
  });

  test("dot false", () => {
    expect(tokens("$.false")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.DOT, "."],
      [Tokens.WORD, "false"],
    ]);
  });

  test("dot true", () => {
    expect(tokens("$.true")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.DOT, "."],
      [Tokens.WORD, "true"],
    ]);
  });

  test("dot null", () => {
    expect(tokens("$.null")).toStrictEqual([
      [Tokens.DOLLAR, "$"],
      [Tokens.DOT, "."],
      [Tokens.WORD, "null"],
    ]);
  });

  test("truncated eq", () => {
    expect(() => tokenize("$[?(@.a = @.b)]")).toThrow(JSONPathSyntaxError);
  });

  test("unknown symbol", () => {
    expect(() => tokenize("$[`")).toThrow(JSONPathSyntaxError);
  });

  test("unclosed string literal", () => {
    expect(() => tokenize("$[@.a == 'foo]")).toThrow(JSONPathSyntaxError);
  });

  test("unclosed string literal after escape", () => {
    expect(() => tokenize("$[@.a == 'foo\\]")).toThrow(JSONPathSyntaxError);
  });

  test("unclosed string literal eoi", () => {
    expect(() => tokenize("$[@.a == 'foo")).toThrow(JSONPathSyntaxError);
  });
});
