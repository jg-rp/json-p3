import { lex } from "../../src/path";
import { Token, TokenKind } from "../../src/path/token";

describe("tokenize path", () => {
  test("basic shorthand name", () => {
    const path = "$.foo.bar";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.NAME, "foo", 2, path),
      new Token(TokenKind.NAME, "bar", 6, path),
      new Token(TokenKind.EOF, "", 9, path),
    ]);
  });
  test("bracketed name", () => {
    const path = "$['foo']['bar']";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.LBRACKET, "[", 1, path),
      new Token(TokenKind.STRING, "foo", 3, path),
      new Token(TokenKind.RBRACKET, "]", 7, path),
      new Token(TokenKind.LBRACKET, "[", 8, path),
      new Token(TokenKind.STRING, "bar", 10, path),
      new Token(TokenKind.RBRACKET, "]", 14, path),
      new Token(TokenKind.EOF, "", 15, path),
    ]);
  });
  test("basic index", () => {
    const path = "$.foo[1]";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.NAME, "foo", 2, path),
      new Token(TokenKind.LBRACKET, "[", 5, path),
      new Token(TokenKind.INDEX, "1", 6, path),
      new Token(TokenKind.RBRACKET, "]", 7, path),
      new Token(TokenKind.EOF, "", 8, path),
    ]);
  });
  test("missing root selector", () => {
    const path = "foo.bar";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ERROR, "expected '$', found 'f'", 0, path),
    ]);
  });
  test("root property selector without dot", () => {
    const path = "$foo";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(
        TokenKind.ERROR,
        "expected '.', '..' or a bracketed selection, found 'f'",
        1,
        path,
      ),
    ]);
  });
  test("whitespace after root", () => {
    const path = "$ .foo.bar";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.NAME, "foo", 3, path),
      new Token(TokenKind.NAME, "bar", 7, path),
      new Token(TokenKind.EOF, "", 10, path),
    ]);
  });
  test("whitespace before dot property", () => {
    const path = "$. foo.bar";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.NAME, "foo", 3, path),
      new Token(TokenKind.NAME, "bar", 7, path),
      new Token(TokenKind.EOF, "", 10, path),
    ]);
  });
  test("whitespace after dot property", () => {
    const path = "$.foo .bar";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.NAME, "foo", 2, path),
      new Token(TokenKind.NAME, "bar", 7, path),
      new Token(TokenKind.EOF, "", 10, path),
    ]);
  });
  test("basic dot wild", () => {
    const path = "$.foo.*";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.NAME, "foo", 2, path),
      new Token(TokenKind.WILD, "*", 6, path),
      new Token(TokenKind.EOF, "", 7, path),
    ]);
  });
  test("basic recurse", () => {
    const path = "$..foo";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.DDOT, "..", 1, path),
      new Token(TokenKind.NAME, "foo", 3, path),
      new Token(TokenKind.EOF, "", 6, path),
    ]);
  });
  test("basic recurse with trailing dot", () => {
    const path = "$...foo";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.DDOT, "..", 1, path),
      new Token(
        TokenKind.ERROR,
        "unexpected descendent selection token '.'",
        3,
        path,
      ),
    ]);
  });
  test("erroneous double recurse", () => {
    const path = "$....foo";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.DDOT, "..", 1, path),
      new Token(
        TokenKind.ERROR,
        "unexpected descendent selection token '.'",
        3,
        path,
      ),
    ]);
  });
  test("bracketed name selector, double quotes", () => {
    const path = '$.foo["bar"]';
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.NAME, "foo", 2, path),
      new Token(TokenKind.LBRACKET, "[", 5, path),
      new Token(TokenKind.STRING, "bar", 7, path),
      new Token(TokenKind.RBRACKET, "]", 11, path),
      new Token(TokenKind.EOF, "", 12, path),
    ]);
  });
  test("bracketed name selector, single quotes", () => {
    const path = "$.foo['bar']";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.NAME, "foo", 2, path),
      new Token(TokenKind.LBRACKET, "[", 5, path),
      new Token(TokenKind.STRING, "bar", 7, path),
      new Token(TokenKind.RBRACKET, "]", 11, path),
      new Token(TokenKind.EOF, "", 12, path),
    ]);
  });
  test("multiple selectors", () => {
    const path = "$.foo['bar', 123, *]";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.NAME, "foo", 2, path),
      new Token(TokenKind.LBRACKET, "[", 5, path),
      new Token(TokenKind.STRING, "bar", 7, path),
      new Token(TokenKind.COMMA, ",", 11, path),
      new Token(TokenKind.INDEX, "123", 13, path),
      new Token(TokenKind.COMMA, ",", 16, path),
      new Token(TokenKind.WILD, "*", 18, path),
      new Token(TokenKind.RBRACKET, "]", 19, path),
      new Token(TokenKind.EOF, "", 20, path),
    ]);
  });
  test("slice", () => {
    const path = "$.foo[1:3]";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.NAME, "foo", 2, path),
      new Token(TokenKind.LBRACKET, "[", 5, path),
      new Token(TokenKind.INDEX, "1", 6, path),
      new Token(TokenKind.COLON, ":", 7, path),
      new Token(TokenKind.INDEX, "3", 8, path),
      new Token(TokenKind.RBRACKET, "]", 9, path),
      new Token(TokenKind.EOF, "", 10, path),
    ]);
  });
  test("filter", () => {
    const path = "$.foo[?@.bar]";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.NAME, "foo", 2, path),
      new Token(TokenKind.LBRACKET, "[", 5, path),
      new Token(TokenKind.FILTER, "?", 6, path),
      new Token(TokenKind.CURRENT, "@", 7, path),
      new Token(TokenKind.NAME, "bar", 9, path),
      new Token(TokenKind.RBRACKET, "]", 12, path),
      new Token(TokenKind.EOF, "", 13, path),
    ]);
  });
  test("filter, parenthesized expression", () => {
    const path = "$.foo[?(@.bar)]";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.NAME, "foo", 2, path),
      new Token(TokenKind.LBRACKET, "[", 5, path),
      new Token(TokenKind.FILTER, "?", 6, path),
      new Token(TokenKind.LPAREN, "(", 7, path),
      new Token(TokenKind.CURRENT, "@", 8, path),
      new Token(TokenKind.NAME, "bar", 10, path),
      new Token(TokenKind.RPAREN, ")", 13, path),
      new Token(TokenKind.RBRACKET, "]", 14, path),
      new Token(TokenKind.EOF, "", 15, path),
    ]);
  });
  test("two filters", () => {
    const path = "$.foo[?@.bar, ?@.baz]";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.NAME, "foo", 2, path),
      new Token(TokenKind.LBRACKET, "[", 5, path),
      new Token(TokenKind.FILTER, "?", 6, path),
      new Token(TokenKind.CURRENT, "@", 7, path),
      new Token(TokenKind.NAME, "bar", 9, path),
      new Token(TokenKind.COMMA, ",", 12, path),
      new Token(TokenKind.FILTER, "?", 14, path),
      new Token(TokenKind.CURRENT, "@", 15, path),
      new Token(TokenKind.NAME, "baz", 17, path),
      new Token(TokenKind.RBRACKET, "]", 20, path),
      new Token(TokenKind.EOF, "", 21, path),
    ]);
  });
  test("filter, function", () => {
    const path = "$[?count(@.foo)>2]";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.LBRACKET, "[", 1, path),
      new Token(TokenKind.FILTER, "?", 2, path),
      new Token(TokenKind.FUNCTION, "count", 3, path),
      new Token(TokenKind.CURRENT, "@", 9, path),
      new Token(TokenKind.NAME, "foo", 11, path),
      new Token(TokenKind.RPAREN, ")", 14, path),
      new Token(TokenKind.GT, ">", 15, path),
      new Token(TokenKind.NUMBER, "2", 16, path),
      new Token(TokenKind.RBRACKET, "]", 17, path),
      new Token(TokenKind.EOF, "", 18, path),
    ]);
  });
  test("filter, function with two args", () => {
    const path = "$[?count(@.foo, 1)>2]";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.LBRACKET, "[", 1, path),
      new Token(TokenKind.FILTER, "?", 2, path),
      new Token(TokenKind.FUNCTION, "count", 3, path),
      new Token(TokenKind.CURRENT, "@", 9, path),
      new Token(TokenKind.NAME, "foo", 11, path),
      new Token(TokenKind.COMMA, ",", 14, path),
      new Token(TokenKind.NUMBER, "1", 16, path),
      new Token(TokenKind.RPAREN, ")", 17, path),
      new Token(TokenKind.GT, ">", 18, path),
      new Token(TokenKind.NUMBER, "2", 19, path),
      new Token(TokenKind.RBRACKET, "]", 20, path),
      new Token(TokenKind.EOF, "", 21, path),
    ]);
  });
  test("filter, parenthesized function", () => {
    const path = "$[?(count(@.foo)>2)]";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.LBRACKET, "[", 1, path),
      new Token(TokenKind.FILTER, "?", 2, path),
      new Token(TokenKind.LPAREN, "(", 3, path),
      new Token(TokenKind.FUNCTION, "count", 4, path),
      new Token(TokenKind.CURRENT, "@", 10, path),
      new Token(TokenKind.NAME, "foo", 12, path),
      new Token(TokenKind.RPAREN, ")", 15, path),
      new Token(TokenKind.GT, ">", 16, path),
      new Token(TokenKind.NUMBER, "2", 17, path),
      new Token(TokenKind.RPAREN, ")", 18, path),
      new Token(TokenKind.RBRACKET, "]", 19, path),
      new Token(TokenKind.EOF, "", 20, path),
    ]);
  });
  test("filter, parenthesized function argument", () => {
    const path = "$[?(count((@.foo),1)>2)]";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.LBRACKET, "[", 1, path),
      new Token(TokenKind.FILTER, "?", 2, path),
      new Token(TokenKind.LPAREN, "(", 3, path),
      new Token(TokenKind.FUNCTION, "count", 4, path),
      new Token(TokenKind.LPAREN, "(", 10, path),
      new Token(TokenKind.CURRENT, "@", 11, path),
      new Token(TokenKind.NAME, "foo", 13, path),
      new Token(TokenKind.RPAREN, ")", 16, path),
      new Token(TokenKind.COMMA, ",", 17, path),
      new Token(TokenKind.NUMBER, "1", 18, path),
      new Token(TokenKind.RPAREN, ")", 19, path),
      new Token(TokenKind.GT, ">", 20, path),
      new Token(TokenKind.NUMBER, "2", 21, path),
      new Token(TokenKind.RPAREN, ")", 22, path),
      new Token(TokenKind.RBRACKET, "]", 23, path),
      new Token(TokenKind.EOF, "", 24, path),
    ]);
  });
  test("filter, nested", () => {
    const path = "$[?@[?@>1]]";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.LBRACKET, "[", 1, path),
      new Token(TokenKind.FILTER, "?", 2, path),
      new Token(TokenKind.CURRENT, "@", 3, path),
      new Token(TokenKind.LBRACKET, "[", 4, path),
      new Token(TokenKind.FILTER, "?", 5, path),
      new Token(TokenKind.CURRENT, "@", 6, path),
      new Token(TokenKind.GT, ">", 7, path),
      new Token(TokenKind.NUMBER, "1", 8, path),
      new Token(TokenKind.RBRACKET, "]", 9, path),
      new Token(TokenKind.RBRACKET, "]", 10, path),
      new Token(TokenKind.EOF, "", 11, path),
    ]);
  });
  test("filter, nested brackets", () => {
    const path = "$[?@[?@[1]>1]]";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.LBRACKET, "[", 1, path),
      new Token(TokenKind.FILTER, "?", 2, path),
      new Token(TokenKind.CURRENT, "@", 3, path),
      new Token(TokenKind.LBRACKET, "[", 4, path),
      new Token(TokenKind.FILTER, "?", 5, path),
      new Token(TokenKind.CURRENT, "@", 6, path),
      new Token(TokenKind.LBRACKET, "[", 7, path),
      new Token(TokenKind.INDEX, "1", 8, path),
      new Token(TokenKind.RBRACKET, "]", 9, path),
      new Token(TokenKind.GT, ">", 10, path),
      new Token(TokenKind.NUMBER, "1", 11, path),
      new Token(TokenKind.RBRACKET, "]", 12, path),
      new Token(TokenKind.RBRACKET, "]", 13, path),
      new Token(TokenKind.EOF, "", 14, path),
    ]);
  });
  test("function", () => {
    const path = "$[?foo()]";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.LBRACKET, "[", 1, path),
      new Token(TokenKind.FILTER, "?", 2, path),
      new Token(TokenKind.FUNCTION, "foo", 3, path),
      new Token(TokenKind.RPAREN, ")", 7, path),
      new Token(TokenKind.RBRACKET, "]", 8, path),
      new Token(TokenKind.EOF, "", 9, path),
    ]);
  });
  test("function", () => {
    const path = "$[?foo()]";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.LBRACKET, "[", 1, path),
      new Token(TokenKind.FILTER, "?", 2, path),
      new Token(TokenKind.FUNCTION, "foo", 3, path),
      new Token(TokenKind.RPAREN, ")", 7, path),
      new Token(TokenKind.RBRACKET, "]", 8, path),
      new Token(TokenKind.EOF, "", 9, path),
    ]);
  });
  test("function, int literal", () => {
    const path = "$[?foo(42)]";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.LBRACKET, "[", 1, path),
      new Token(TokenKind.FILTER, "?", 2, path),
      new Token(TokenKind.FUNCTION, "foo", 3, path),
      new Token(TokenKind.NUMBER, "42", 7, path),
      new Token(TokenKind.RPAREN, ")", 9, path),
      new Token(TokenKind.RBRACKET, "]", 10, path),
      new Token(TokenKind.EOF, "", 11, path),
    ]);
  });
  test("function, two int args", () => {
    const path = "$[?foo(42, -7)]";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.LBRACKET, "[", 1, path),
      new Token(TokenKind.FILTER, "?", 2, path),
      new Token(TokenKind.FUNCTION, "foo", 3, path),
      new Token(TokenKind.NUMBER, "42", 7, path),
      new Token(TokenKind.COMMA, ",", 9, path),
      new Token(TokenKind.NUMBER, "-7", 11, path),
      new Token(TokenKind.RPAREN, ")", 13, path),
      new Token(TokenKind.RBRACKET, "]", 14, path),
      new Token(TokenKind.EOF, "", 15, path),
    ]);
  });
  test("boolean literals", () => {
    const path = "$[?true==false]";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.LBRACKET, "[", 1, path),
      new Token(TokenKind.FILTER, "?", 2, path),
      new Token(TokenKind.TRUE, "true", 3, path),
      new Token(TokenKind.EQ, "==", 7, path),
      new Token(TokenKind.FALSE, "false", 9, path),
      new Token(TokenKind.RBRACKET, "]", 14, path),
      new Token(TokenKind.EOF, "", 15, path),
    ]);
  });
  test("logical and", () => {
    const path = "$[?true && false]";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.LBRACKET, "[", 1, path),
      new Token(TokenKind.FILTER, "?", 2, path),
      new Token(TokenKind.TRUE, "true", 3, path),
      new Token(TokenKind.AND, "&&", 8, path),
      new Token(TokenKind.FALSE, "false", 11, path),
      new Token(TokenKind.RBRACKET, "]", 16, path),
      new Token(TokenKind.EOF, "", 17, path),
    ]);
  });
  test("float", () => {
    const path = "$[?@.foo > 42.7]";
    const [lexer, tokens] = lex(path);
    lexer.run();
    expect(tokens).toStrictEqual([
      new Token(TokenKind.ROOT, "$", 0, path),
      new Token(TokenKind.LBRACKET, "[", 1, path),
      new Token(TokenKind.FILTER, "?", 2, path),
      new Token(TokenKind.CURRENT, "@", 3, path),
      new Token(TokenKind.NAME, "foo", 5, path),
      new Token(TokenKind.GT, ">", 9, path),
      new Token(TokenKind.NUMBER, "42.7", 11, path),
      new Token(TokenKind.RBRACKET, "]", 15, path),
      new Token(TokenKind.EOF, "", 16, path),
    ]);
  });
});
