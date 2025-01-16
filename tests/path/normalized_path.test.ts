import { JSONPathError } from "../../src/path";
import { JSONPathEnvironment } from "../../src/path/environment";

type Case = {
  description: string;
  path: string;
  want: string;
  error?: boolean;
};

const testCases: Case[] = [
  { description: "empty", path: "", want: "", error: true },
  { description: "just root", path: "$", want: "$" },
  { description: "root dot", path: "$.", want: "", error: true },
  { description: "shorthand name", path: "$.foo.bar", want: "$['foo']['bar']" },
  {
    description: "bracketed name, single quotes",
    path: "$['foo']['bar']",
    want: "$['foo']['bar']",
  },
  {
    description: "bracketed name, double quotes",
    path: "$['foo']['bar']",
    want: "$['foo']['bar']",
  },
  {
    description: "dot bracketed",
    path: "$.['foo']",
    want: "",
    error: true,
  },
  {
    description: "index",
    path: "$[1][9]",
    want: "$[1][9]",
  },
  {
    description: "slice",
    path: "$[1:-1]",
    want: "$[1:-1:1]",
  },
  {
    description: "slice with step",
    path: "$[1:-1:2]",
    want: "$[1:-1:2]",
  },
  {
    description: "slice with empty start",
    path: "$[:-1:2]",
    want: "$[:-1:2]",
  },
  {
    description: "slice with empty stop",
    path: "$[1:]",
    want: "$[1::1]",
  },
  {
    description: "slice with empty start and stop",
    path: "$[:]",
    want: "$[::1]",
  },
  {
    description: "wild shorthand",
    path: "$.foo.*",
    want: "$['foo'][*]",
  },
  {
    description: "wild",
    path: "$.foo[*]",
    want: "$['foo'][*]",
  },
  {
    description: "descend",
    path: "$.foo..[0]",
    want: "$['foo']..[0]",
  },
  {
    description: "bald descend",
    path: "$.foo..",
    want: "",
    error: true,
  },
  {
    description: "multiple selectors",
    path: "$.foo[1, 2:5, *, 'bar']",
    want: "$['foo'][1, 2:5:1, *, 'bar']",
  },
  {
    description: "filter, relative query",
    path: "$[?@.foo]",
    want: "$[?@['foo']]",
  },
  {
    description: "filter, parenthesized",
    path: "$[?(@.foo)]",
    want: "$[?@['foo']]",
  },
  {
    description: "filter, logical and",
    path: "$[?@.foo && @.bar]",
    want: "$[?(@['foo'] && @['bar'])]",
  },
  {
    description: "filter, logical or",
    path: "$[?@.foo || @.bar]",
    want: "$[?(@['foo'] || @['bar'])]",
  },
  {
    description: "filter, logical not",
    path: "$[?!@.foo]",
    want: "$[?!@['foo']]",
  },
  {
    description: "filter, comparison",
    path: "$[?@.foo == @.bar]",
    want: "$[?@['foo'] == @['bar']]",
  },
  {
    description: "issue #30",
    path: `$["'"]`,
    want: "$['\\'']",
  },
  {
    description: "quoted name with a slash",
    path: `$["\\\\"]`,
    want: "$['\\\\']",
  },
];

describe("parse path", () => {
  test.each<Case>(testCases)("$description", ({ path, want, error }: Case) => {
    const env = new JSONPathEnvironment();
    if (error) {
      expect(() => env.compile(path)).toThrow(JSONPathError);
    } else {
      const _path = env.compile(path);
      expect(_path.toString()).toBe(want);
    }
  });
});
