import { jsonpatch } from "../../src/json-p3.js";

describe("JSON Patch issues", () => {
  test("issue 58-1", () => {
    const ops = [
      { op: "copy", from: "/a", path: "/b" },
      { op: "replace", path: "/b/x", value: 2 },
    ];

    const data = { a: { x: 1 } };
    jsonpatch.apply(ops, data);
    expect(data).toStrictEqual({ a: { x: 1 }, b: { x: 2 } });
  });

  test("issue 58-2", () => {
    const ops = [
      { op: "copy", from: "/a", path: "/b" },
      { op: "add", path: "/a/y", value: 3 },
    ];

    const data = { a: { x: 1 } };
    jsonpatch.apply(ops, data);
    expect(data).toStrictEqual({ a: { x: 1, y: 3 }, b: { x: 1 } });
  });

  test("issue 58-3", () => {
    const ops = [{ op: "copy", from: "", path: "/a/b" }];
    const data = { a: {} };

    expect(jsonpatch.apply(ops, data)).toStrictEqual({ a: { b: { a: {} } } });
  });
});
