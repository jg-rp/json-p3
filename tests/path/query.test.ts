import { JSONPathEnvironment } from "../../src/path/environment";

// TODO: submodule cts

describe("JSONPath queries", () => {
  const env = new JSONPathEnvironment();
  test("basic, shorthand name", () => {
    const rv = env.query("$.foo", { foo: "FOO", bar: "BAR" }).values();
    expect(rv).toStrictEqual(["FOO"]);
  });
});
