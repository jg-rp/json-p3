import { JSONPointer, resolve, UNDEFINED } from "../../src/pointer";
import {
  JSONPointerIndexError,
  JSONPointerKeyError,
  JSONPointerSyntaxError,
  JSONPointerTypeError,
  JSONPointerResolutionError,
} from "../../src/pointer/errors";

describe("resolve JSON pointer", () => {
  test("string representation", () => {
    const pointer = new JSONPointer("/some/thing/1");
    expect(pointer.toString()).toBe("/some/thing/1");
  });
  test("missing key", () => {
    const pointer = new JSONPointer("/some/other");
    const data = { some: { thing: "else" } };
    expect(() => pointer.resolve(data)).toThrow(JSONPointerKeyError);
    expect(() => pointer.resolve(data)).toThrow(
      "no such property '/some/other'",
    );
  });
  test("index out of range", () => {
    const pointer = new JSONPointer("/some/thing/7");
    const data = { some: { thing: [1, 2, 3] } };
    expect(() => pointer.resolve(data)).toThrow(JSONPointerIndexError);
    expect(() => pointer.resolve(data)).toThrow(
      "index out of range '/some/thing/7'",
    );
  });
  test("property of a primitive", () => {
    const pointer = new JSONPointer("/some/thing/else");
    const data = { some: { thing: "foo" } };
    expect(() => pointer.resolve(data)).toThrow(JSONPointerTypeError);
    expect(() => pointer.resolve(data)).toThrow(
      "found primitive value, expected an object '/some/thing/else'",
    );
  });
  test("resolve with default", () => {
    const pointer = new JSONPointer("/some/other");
    const data = { some: { thing: "else" } };
    expect(pointer.resolve(data, null)).toBe(null);
  });
  test("no leading slash", () => {
    expect(() => new JSONPointer("some/other")).toThrow(JSONPointerSyntaxError);
  });
  test("resolve with parent", () => {
    const pointer = new JSONPointer("/some/thing");
    const data = { some: { thing: [1, 2, 3] } };
    const [parent, target] = pointer.resolveWithParent(data);
    expect(parent).toStrictEqual(data["some"]);
    expect(target).toStrictEqual(data["some"]["thing"]);
  });
  test("resolve root with parent", () => {
    const pointer = new JSONPointer("");
    const data = { some: { thing: [1, 2, 3] } };
    const [parent, target] = pointer.resolveWithParent(data);
    expect(parent).toStrictEqual(UNDEFINED);
    expect(target).toStrictEqual(data);
  });
  test("resolve with parent and missing target", () => {
    const pointer = new JSONPointer("/some/other");
    const data = { some: { thing: [1, 2, 3] } };
    const [parent, target] = pointer.resolveWithParent(data);
    expect(parent).toStrictEqual(data["some"]);
    expect(target).toStrictEqual(UNDEFINED);
  });
  test("resolve with parent and type error", () => {
    const pointer = new JSONPointer("/some/thing/1");
    const data = { some: { thing: "else" } };
    expect(() => pointer.resolveWithParent(data)).toThrow(JSONPointerTypeError);
  });
  test("convenience resolve", () => {
    const data = { some: { thing: "else" } };
    expect(resolve("/some/thing", data)).toBe("else");
  });
  test("convenience resolve with default", () => {
    const data = { some: { thing: "else" } };
    expect(resolve("/some/other", data, null)).toBe(null);
  });
  test("convenience resolve with explicit undefined default", () => {
    const data = { some: { thing: "else" } };
    expect(() => resolve("/some/other", data, UNDEFINED)).toThrow(
      JSONPointerResolutionError,
    );
  });
  test("trailing slash", () => {
    const data = { foo: { "": [1, 2, 3], " ": [4, 5, 6] } };
    expect(resolve("/foo/", data)).toStrictEqual([1, 2, 3]);
  });
  test("trailing whitespace", () => {
    const data = { foo: { "": [1, 2, 3], " ": [4, 5, 6] } };
    expect(resolve("/foo/ ", data)).toStrictEqual([4, 5, 6]);
  });
  test("index with leading zero", () => {
    const data = { some: { thing: [1, 2, 3] } };
    expect(() => resolve("/some/thing/01", data)).toThrow(
      JSONPointerIndexError,
    );
  });
});

describe("join pointers", () => {
  const pointer = new JSONPointer("/foo");
  test("repr of pointer", () => {
    expect(pointer.toString()).toBe("/foo");
  });
  test("join with nothing", () => {
    expect(pointer.join().toString()).toBe("/foo");
  });
  test("join with singular token", () => {
    expect(pointer.join("bar").toString()).toBe("/foo/bar");
  });
  test("join with singular token, multiple parts", () => {
    expect(pointer.join("bar/baz").toString()).toBe("/foo/bar/baz");
  });
  test("join with multiple tokens", () => {
    expect(pointer.join("bar", "baz").toString()).toBe("/foo/bar/baz");
  });
  test("join with a numeric token", () => {
    expect(pointer.join("bar", "baz", "0").toString()).toBe("/foo/bar/baz/0");
  });
  test("join with a rooted token", () => {
    expect(pointer.join("/bar").toString()).toBe("/bar");
  });
  test("continue after a rooted token", () => {
    expect(pointer.join("/bar", "0").toString()).toBe("/bar/0");
  });
  test("throw on non-string token", () => {
    expect(() => pointer.join(0 as never)).toThrow(JSONPointerTypeError);
  });
});

describe("parent of a pointer", () => {
  const data = { some: { thing: [1, 2, 3] } };
  const pointer = new JSONPointer("/some/thing/0");
  let parent = pointer.parent();

  test("pointer", () => {
    expect(pointer.resolve(data)).toStrictEqual(1);
  });
  test("pointer's parent", () => {
    expect(parent.toString()).toBe("/some/thing");
    expect(parent.resolve(data)).toStrictEqual([1, 2, 3]);
  });
  test("parent's parent", () => {
    parent = parent.parent();
    expect(parent.toString()).toBe("/some");
    expect(parent.resolve(data)).toStrictEqual({ thing: [1, 2, 3] });
  });
  test("parent is root", () => {
    parent = parent.parent();
    expect(parent.toString()).toBe("");
    expect(parent.resolve(data)).toStrictEqual({ some: { thing: [1, 2, 3] } });
  });
  test("parent of root", () => {
    parent = parent.parent();
    expect(parent.toString()).toBe("");
    expect(parent.resolve(data)).toStrictEqual({ some: { thing: [1, 2, 3] } });
  });
});

describe("pointer exists", () => {
  const data = { some: { thing: [1, 2, 3] }, other: undefined };
  test("truthy value", () => {
    expect(new JSONPointer("/some/thing").exists(data)).toBe(true);
  });
  test("falsy value", () => {
    expect(new JSONPointer("/other").exists(data)).toBe(true);
  });
  test("does not exist", () => {
    expect(new JSONPointer("/nosuchthing").exists(data)).toBe(false);
  });
});
