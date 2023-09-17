import { JSONPathSyntaxError, compile, query } from "../../src/path";

describe("parse", () => {
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
