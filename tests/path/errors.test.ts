import { compile, type JSONLike } from "../../src";
import { JSONPathEnvironment } from "../../src/path/environment";
import {
  JSONPathRecursionError,
  JSONPathSyntaxError,
  JSONPathTypeError,
  JSONPathNameError,
} from "../../src/path/errors";

describe("syntax error", () => {
  const env = new JSONPathEnvironment();

  test("no leading whitespace", () => {
    const query = " $";
    expect(() => env.query(query, {})).toThrow(JSONPathSyntaxError);
    expect(() => env.query(query, {})).toThrow("expected '$', found WHITESPACE (\" \")");
  });

  test("shorthand index", () => {
    const query = "$.1";
    expect(() => env.query(query, {})).toThrow(JSONPathSyntaxError);
    expect(() => env.query(query, {})).toThrow(
      'expected a shorthand selector, found INTEGER LITERAL ("1")',
    );
  });

  test("shorthand symbol", () => {
    const query = "$.&";
    expect(() => env.query(query, {})).toThrow(JSONPathSyntaxError);
    expect(() => env.query(query, {})).toThrow("unexpected '&', did you mean '&&'?");
  });

  test("empty bracketed segment", () => {
    const query = "$.foo[]";
    expect(() => env.query(query, {})).toThrow(JSONPathSyntaxError);
    expect(() => env.query(query, {})).toThrow("empty bracketed segment");
  });

  test("empty paren expression", () => {
    const query = "$[?()]";
    expect(() => env.query(query, {})).toThrow(JSONPathSyntaxError);
    expect(() => env.query(query, {})).toThrow("empty paren expression");
  });

  test("unbalanced parens", () => {
    const query = "$[?((@.foo)]";
    expect(() => env.query(query, {})).toThrow(JSONPathSyntaxError);
    expect(() => env.query(query, {})).toThrow("unbalanced brackets");
  });

  test("well-typed nested functions, unbalanced parens", () => {
    expect(() => compile("$.values[?match(@.a, value($..['regex'])]")).toThrow(JSONPathSyntaxError);
  });
});

describe("type error", () => {
  const env = new JSONPathEnvironment();
  test("too many params", () => {
    const query = "$[?count(@.a,@.b)==1]";
    expect(() => env.query(query, {})).toThrow(JSONPathTypeError);
    expect(() => env.query(query, {})).toThrow("count() takes 1 argument (2 given)");
  });
});

describe("index error", () => {
  const env = new JSONPathEnvironment();
  test("index out of range", () => {
    const query = "$.foo[9007199254740992]";
    expect(() => env.query(query, {})).toThrow(JSONPathTypeError);
    expect(() => env.query(query, {})).toThrow("index out of range");
  });
});

describe("undefined filter function", () => {
  const env = new JSONPathEnvironment();
  test("slice", () => {
    const query = "$[?slice(1,2)]";
    expect(() => env.query(query, {})).toThrow(JSONPathNameError);
    expect(() => env.query(query, {})).toThrow("unknown function 'slice'");
  });
});

describe("recursion limit reached", () => {
  test("recursive data", () => {
    const env = new JSONPathEnvironment();
    const query = "$..a";
    const arr: JSONLike[] = [];
    const data = { foo: arr };
    arr.push(data);
    expect(() => env.query(query, data)).toThrow(JSONPathRecursionError);
    expect(() => env.query(query, data)).toThrow("recursion limit reached");
    expect(() => Array.from(env.lazyQuery(query, data))).toThrow("recursion limit reached");
  });

  test("nested data with low limit", () => {
    const env = new JSONPathEnvironment({ maxRecursionDepth: 2 });
    const query = "$..a";
    const data = { foo: [{ bar: [1, 2, 3] }] };
    expect(() => env.query(query, data)).toThrow(JSONPathRecursionError);
    expect(() => env.query(query, data)).toThrow("recursion limit reached");
    expect(() => Array.from(env.lazyQuery(query, data))).toThrow("recursion limit reached");
  });
});

describe("filter expression EOF", () => {
  const env = new JSONPathEnvironment();
  test("unclosed bracketed selection", () => {
    const query = "$.users[?@.score > 85";
    expect(() => env.query(query, {})).toThrow(JSONPathSyntaxError);
    expect(() => env.query(query, {})).toThrow("unexpected end of query");
  });
});

describe("escape sequence decode errors", () => {
  const env = new JSONPathEnvironment();

  test("unknown escape sequence", () => {
    const query = String.raw`$['ab\xc']`;
    // From the lexer
    expect(() => env.query(query, {})).toThrow(JSONPathSyntaxError);
    expect(() => env.query(query, {})).toThrow("invalid escape sequence");
  });

  test("incomplete \\u escape sequence at end of string", () => {
    const query = String.raw`$['abc\u263']`;
    expect(() => env.query(query, {})).toThrow(JSONPathSyntaxError);
    expect(() => env.query(query, {})).toThrow("invalid escape sequence");
  });

  test("incomplete surrogate pair at end of string", () => {
    const query = String.raw`$['abc\uD83D\uDE0']`;
    expect(() => env.query(query, {})).toThrow(JSONPathSyntaxError);
    expect(() => env.query(query, {})).toThrow("invalid escape sequence");
  });

  test("high high surrogate pair", () => {
    const query = String.raw`$['ab\uD800\uD800c']`;
    expect(() => env.query(query, {})).toThrow(JSONPathSyntaxError);
    expect(() => env.query(query, {})).toThrow("invalid escape sequence");
  });

  test("high surrogate followed by non-surrogate", () => {
    const query = String.raw`$['ab\uD800\u263Ac']`;
    expect(() => env.query(query, {})).toThrow(JSONPathSyntaxError);
    expect(() => env.query(query, {})).toThrow("invalid escape sequence");
  });

  test("just a low surrogate", () => {
    const query = String.raw`$['ab\uDC00c']`;
    expect(() => env.query(query, {})).toThrow(JSONPathSyntaxError);
    expect(() => env.query(query, {})).toThrow("invalid escape sequence");
  });

  test("non-hex digits", () => {
    const query = String.raw`$['ab\u263Xc']`;
    expect(() => env.query(query, {})).toThrow(JSONPathSyntaxError);
    expect(() => env.query(query, {})).toThrow("invalid escape sequence");
  });
});
