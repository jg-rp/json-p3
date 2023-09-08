import { JSONPointer } from "../../src/pointer";

describe("JSON pointer", () => {
  test("string representation", () => {
    const pointer = new JSONPointer("/some/thing/1");
    expect(pointer.toString()).toBe("/some/thing/1");
  });
  test("resolve with default", () => {
    const pointer = new JSONPointer("/some/other");
    const data = { some: { thing: "else" } };
    expect(pointer.resolve(data, null)).toBe(null);
  });
});
