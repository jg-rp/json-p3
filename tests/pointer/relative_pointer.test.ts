import {
  JSONPointer,
  JSONPointerIndexError,
  JSONPointerSyntaxError,
  RelativeJSONPointer,
} from "../../src/pointer";

describe("relative JSON pointer", () => {
  test("syntax error", () => {
    expect(() => new RelativeJSONPointer("foo")).toThrow(
      JSONPointerSyntaxError,
    );
    expect(() => new RelativeJSONPointer("foo")).toThrow(
      "failed to parse relative pointer",
    );
  });
  test("origin leading zero", () => {
    expect(() => new RelativeJSONPointer("01")).toThrow(JSONPointerSyntaxError);
    expect(() => new RelativeJSONPointer("01")).toThrow(
      "unexpected leading zero",
    );
  });
  test("origin beyond pointer", () => {
    const pointer = new JSONPointer("/foo/bar/0");
    const rel = new RelativeJSONPointer("9/foo");
    expect(() => rel.to(pointer)).toThrow(JSONPointerIndexError);
    expect(() => rel.to(pointer)).toThrow("origin (9) exceeds root (3)");
  });
  test("zero index offset", () => {
    expect(() => new RelativeJSONPointer("1-0")).toThrow(
      JSONPointerSyntaxError,
    );
    expect(() => new RelativeJSONPointer("1+0")).toThrow(
      JSONPointerSyntaxError,
    );
  });
  test("negative index offset", () => {
    const pointer = new JSONPointer("/foo/1");
    const rel = new RelativeJSONPointer("0-2");
    expect(() => rel.to(pointer)).toThrow(JSONPointerIndexError);
    expect(() => rel.to(pointer)).toThrow("index offset out of range (-1)");
  });
});
