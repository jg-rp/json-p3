import { deepEquals } from "../src/deep_equals";

describe("deep equality of JSON-like data", () => {
  test("different length arrays", () => {
    expect(deepEquals(["a"], ["a", "b"]));
  });
});
