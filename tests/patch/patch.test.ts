import { JSONPatch, JSONPatchError, apply } from "../../src/patch";

describe("JSON Patch", () => {
  test("remove root", () => {
    const patch = new JSONPatch().remove("");
    expect(() => patch.apply({ foo: "bar" })).toThrow(
      "can't remove root (remove:0)",
    );
  });
  test("test op failure", () => {
    const patch = new JSONPatch().test("/baz", "bar");
    expect(() => patch.apply({ baz: "qux" })).toThrow("test failed (test:0)");
  });
  test("add to nonexistent target", () => {
    const patch = new JSONPatch().add("/baz/bat", "qux");
    expect(() => patch.apply({ foo: "bar" })).toThrow(JSONPatchError);
    expect(() => patch.apply({ foo: "bar" })).toThrow(
      "no such property '/baz' (add:0)",
    );
  });
  test("move to child", () => {
    expect(() => {
      apply([{ op: "move", from: "/foo/bar", path: "/foo/bar/baz" }], {
        foo: { bar: { baz: [1, 2, 3] } },
      });
    }).toThrow(JSONPatchError);
    expect(() => {
      apply([{ op: "move", from: "/foo/bar", path: "/foo/bar/baz" }], {
        foo: { bar: { baz: [1, 2, 3] } },
      });
    }).toThrow("can't move object to one of its own children (move:0)");
  });
  test("array index out of range", () => {
    const patch = new JSONPatch().add("/foo/7", 99);
    expect(() => patch.apply({ foo: [1, 2, 3] })).toThrow(JSONPatchError);
    expect(() => patch.apply({ foo: [1, 2, 3] })).toThrow(
      "index out of range (add:0)",
    );
  });
  test("to array", () => {
    const patchObj = [
      { op: "add", path: "/foo/bar", value: "foo" },
      { op: "remove", path: "/foo/bar" },
      { op: "replace", path: "/foo/bar", value: "foo" },
      { op: "move", from: "/baz/foo", path: "/foo/bar" },
      { op: "copy", from: "/baz/foo", path: "/foo/bar" },
      { op: "test", path: "/foo/bar", value: "foo" },
    ];

    const patch = new JSONPatch(patchObj);
    expect(patch.toArray()).toStrictEqual(patchObj);
  });
});
