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
    want: "$[?(!@['a'] && !@['b'])]",
  },
  {
    description: "not binds more tightly than or",
    path: "$[?!@.a || !@.b]",
    want: "$[?(!@['a'] || !@['b'])]",
  },
  {
    description: "control precedence with parens",
    path: "$[?!(@.a && !@.b)]",
    want: "$[?!(@['a'] && !@['b'])]",
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
