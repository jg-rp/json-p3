import { JSONPatch, JSONPatchError, OpObject, apply } from "../../src/patch";

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
  test("remove nonexistent array item", () => {
    const data = { foo: [1, 2, 3] };
    const patch = new JSONPatch().remove("/foo/99");
    expect(() => patch.apply(data)).toThrow(JSONPatchError);
    expect(() => patch.apply(data)).toThrow(
      "can't remove nonexistent item (remove:0)",
    );
  });
  test("remove nonexistent property", () => {
    const data = { foo: { bar: [1, 2, 3] } };
    const patch = new JSONPatch().remove("/foo/baz");
    expect(() => patch.apply(data)).toThrow(JSONPatchError);
    expect(() => patch.apply(data)).toThrow(
      "can't remove nonexistent property (remove:0)",
    );
  });
  test("replace nonexistent array item", () => {
    const data = { foo: [1, 2, 3] };
    const patch = new JSONPatch().replace("/foo/99", 42);
    expect(() => patch.apply(data)).toThrow(JSONPatchError);
    expect(() => patch.apply(data)).toThrow(
      "can't replace nonexistent item (replace:0)",
    );
  });
  test("replace nonexistent property", () => {
    const data = { foo: { bar: [1, 2, 3] } };
    const patch = new JSONPatch().replace("/foo/baz", 42);
    expect(() => patch.apply(data)).toThrow(JSONPatchError);
    expect(() => patch.apply(data)).toThrow(
      "can't replace nonexistent property (replace:0)",
    );
  });
  test("move, source does no exist", () => {
    const data = { foo: { bar: [1, 2, 3] } };
    const patch = new JSONPatch().move("/foo/baz", "/foo/qux");
    expect(() => patch.apply(data)).toThrow(JSONPatchError);
    expect(() => patch.apply(data)).toThrow(
      "source object does not exist (move:0)",
    );
  });
  test("move to root", () => {
    const data = { foo: { bar: [1, 2, 3] } };
    const patch = new JSONPatch().move("/foo", "");
    expect(patch.apply(data)).toStrictEqual({ bar: [1, 2, 3] });
  });
  test("copy to root", () => {
    const data = { foo: { bar: [1, 2, 3] } };
    const patch = new JSONPatch().copy("/foo", "");
    expect(patch.apply(data)).toStrictEqual({ bar: [1, 2, 3] });
    expect(data).toStrictEqual({ foo: { bar: [1, 2, 3] } });
  });
  test("constructor, missing op", () => {
    const opObj: OpObject = { path: "", value: "foo" } as never;
    expect(() => new JSONPatch([opObj])).toThrow(
      "expected 'op' to be one of 'add', 'remove', 'replace', 'move', 'copy' or 'test' (undefined:0)",
    );
  });
  test("constructor, missing path", () => {
    const opObj: OpObject = { op: "add", value: "foo" } as never;
    expect(() => new JSONPatch([opObj])).toThrow(
      "missing property 'path' (add:0)",
    );
  });
  test("constructor, missing value", () => {
    const opObj: OpObject = { op: "add", path: "/foo" } as never;
    expect(() => new JSONPatch([opObj])).toThrow(
      "missing property 'value' (add:0)",
    );
  });
  test("constructor, path is not a string", () => {
    const opObj: OpObject = { op: "add", path: 42, value: "foo" } as never;
    expect(() => new JSONPatch([opObj])).toThrow(
      "expected a JSON Pointer string for 'path', found number (add:0)",
    );
  });
  test("constructor, invalid pointer", () => {
    const opObj: OpObject = { op: "add", path: "bar/", value: "foo" };
    expect(() => new JSONPatch([opObj])).toThrow(
      '"bar/" pointers must start with a slash or be the empty string (add:0)',
    );
  });
  test("pointer is not a string", () => {
    const path: string = 42 as never;
    expect(() => new JSONPatch().add(path, "foo")).toThrow(
      "expected a JSON Pointer string, found number (add:0)",
    );
  });
  test("build, invalid pointer", () => {
    expect(() => new JSONPatch().add("bar/", "foo")).toThrow(
      '"bar/" pointers must start with a slash or be the empty string (add:0)',
    );
  });
});
