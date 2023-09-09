import { JSONPatch, JSONPatchError } from "../../src/patch";

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
});
