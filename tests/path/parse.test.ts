import {
  JSONPathEnvironment,
  JSONPathSyntaxError,
  compile,
  query,
} from "../../src/path";

type TestCase = {
  description: string;
  path: string;
  want: string;
};

const TEST_CASES: TestCase[] = [
  {
    description: "not binds more tightly than and",
    path: "$[?!@.a && !@.b]",
    want: "$[?!@.a && !@.b]",
  },
  {
    description: "not binds more tightly than or",
    path: "$[?!@.a || !@.b]",
    want: "$[?!@.a || !@.b]",
  },
  {
    description: "control precedence with parens, not",
    path: "$[?!(@.a && !@.b)]",
    want: "$[?!(@.a && !@.b)]",
  },
  {
    description: "control precedence with parens",
    path: "$[?(@.a || @.b) && @.c]",
    want: "$[?(@.a || @.b) && @.c]",
  },
  {
    description: "non-singular query in logical expression",
    path: "$[?@.* && @.b]",
    want: "$[?@[*] && @.b]",
  },
  {
    description: "filter query, multiple shorthand segments",
    path: "$[?@.a.b.c]",
    want: "$[?@.a.b.c]",
  },
  {
    description: "filter query, multiple bracketed segments",
    path: "$[?@[0][1] && $[2][3]]",
    want: "$[?@[0][1] && $[2][3]]",
  },
  {
    description: "filter query, dotted and bracketed segments",
    path: "$[?@.a[1][2] && $.b[2].c[3]]",
    want: "$[?@.a[1][2] && $.b[2].c[3]]",
  },
];

describe("parse", () => {
  const env = new JSONPathEnvironment();

  test.each<TestCase>(TEST_CASES)(
    "$description",
    ({ path, want }: TestCase) => {
      expect(env.compile(path).toString()).toBe(want);
    },
  );

  test("well-typed nested functions", () => {
    const data = {
      regex: "a.*",
      values: [
        {
          a: "ab",
        },
        {
          a: "ba",
        },
      ],
    };
    const rv = query("$.values[?match(@.a, value($..['regex']))]", data);
    expect(rv.values()).toStrictEqual([{ a: "ab" }]);
  });

  test("well-typed nested functions, unbalanced parens", () => {
    expect(() => compile("$.values[?match(@.a, value($..['regex'])]")).toThrow(
      JSONPathSyntaxError,
    );
  });
});
