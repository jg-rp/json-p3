import { compile } from "../../src/json-p3";

const cases = [
  { expr: "$.a", data: { a: 1 }, want: "$.a" },
  { expr: "$['a']", data: { a: 1 }, want: "$.a" },
  { expr: '$["a"]', data: { a: 1 }, want: "$.a" },
  { expr: "$[0]", data: [1], want: "$[0]" },
  { expr: '$["a$b"]', data: { a$b: 1 }, want: "$['a$b']" },
  { expr: '$["_"]', data: { _: 1 }, want: "$._" },
  { expr: '$[" "]', data: { " ": 1 }, want: "$[' ']" },
  { expr: '$["\\\\"]', data: { "\\": 1 }, want: "$['\\\\']" },
  { expr: "$['\"']", data: { '"': 1 }, want: "$['\"']" },
  { expr: '$["\'"]', data: { "'": 1 }, want: '$["\'"]' },
  { expr: '$["\'\\""]', data: { "'\"": 1 }, want: "$['\\'\"']" },
  { expr: '$["*"]', data: { "*": 1 }, want: "$['*']" },
  { expr: '$["[]"]', data: { "[]": 1 }, want: "$['[]']" },
  { expr: '$["文字"]', data: { 文字: 1 }, want: "$.文字" },
  { expr: '$["\u200c"]', data: { "\u200c": 1 }, want: "$['\u200c']" },
];

// Getting normalized paths from nodes is covered by the compliance test suite.
//
// Serializing compiled queries to "canonical" and shorthand paths is covered
// in serialize_query.test.ts.

describe("node to shorthand path", () => {
  test.each(cases)("$expr -> $want", ({ expr, data, want }) => {
    const query = compile(expr);
    const nodes = query.find(data);
    expect(nodes.length).toBe(1);
    expect(nodes[0]!.shorthandPath()).toBe(want);
  });
});
