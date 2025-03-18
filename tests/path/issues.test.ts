import { compile, JSONPathQuery } from "../../src";

describe("issues", () => {
  test("issue 42", () => {
    expect(compile("$[? count(@.likes[? @.location]) > 3]")).toBeInstanceOf(
      JSONPathQuery,
    );
  });
});
