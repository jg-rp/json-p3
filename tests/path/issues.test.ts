import { query, compile, JSONPathQuery } from "../../src";

describe("issues", () => {
  test("issue 40", () => {
    const data = { a: "d449f7a5-9153-4f39-a05d-dca1c35538ec" };
    const path =
      '$[?search(@, "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{10}")]';
    const nodes = query(path, data);
    expect(nodes.values()).toStrictEqual([
      "d449f7a5-9153-4f39-a05d-dca1c35538ec",
    ]);
  });

  test("issue 42", () => {
    expect(compile("$[? count(@.likes[? @.location]) > 3]")).toBeInstanceOf(
      JSONPathQuery,
    );
  });
});
