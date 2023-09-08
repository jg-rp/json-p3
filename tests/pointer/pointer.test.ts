import { JSONPointer } from "../../src/pointer";
import {
  JSONPointerIndexError,
  JSONPointerKeyError,
  JSONPointerSyntaxError,
  JSONPointerTypeError,
} from "../../src/pointer/errors";
import { UNDEFINED } from "../../src/pointer/pointer";

describe("JSON pointer", () => {
  test("string representation", () => {
    const pointer = new JSONPointer("/some/thing/1");
    expect(pointer.toString()).toBe("/some/thing/1");
  });
  test("missing key", () => {
    const pointer = new JSONPointer("/some/other");
    const data = { some: { thing: "else" } };
    expect(() => pointer.resolve(data)).toThrow(JSONPointerKeyError);
    expect(() => pointer.resolve(data)).toThrow(
      'no such property ("/some/other")',
    );
  });
  test("index out of range", () => {
    const pointer = new JSONPointer("/some/thing/7");
    const data = { some: { thing: [1, 2, 3] } };
    expect(() => pointer.resolve(data)).toThrow(JSONPointerIndexError);
    expect(() => pointer.resolve(data)).toThrow(
      'index out of range ("/some/thing/7")',
    );
  });
  test("property of a primitive", () => {
    const pointer = new JSONPointer("/some/thing/else");
    const data = { some: { thing: "foo" } };
    expect(() => pointer.resolve(data)).toThrow(JSONPointerTypeError);
    expect(() => pointer.resolve(data)).toThrow(
      'found primitive value, expected an object ("/some/thing/else")',
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
});
