import { find, findIter } from "../../src/json-p3.js";

// Selecting from an array large enough that spreading the result into
// function call arguments would exceed the engine's argument limit and
// throw "RangeError: Maximum call stack size exceeded".
describe("large result sets", () => {
  const n = 200_000;
  const data = { a: Array.from({ length: n }, (_, i) => ({ b: i })) };

  test("wildcard child segment", () => {
    const nodes = find("$.a[*]", data);
    expect(nodes.length).toBe(n);
    expect(nodes.at(-1)!.value).toStrictEqual({ b: n - 1 });
  });

  test("wildcard followed by name", () => {
    const nodes = find("$.a[*].b", data);
    expect(nodes.length).toBe(n);
    expect(nodes.at(-1)!.value).toBe(n - 1);
  });

  test("descendant segment", () => {
    const nodes = find("$..b", data);
    expect(nodes.length).toBe(n);
  });

  test("descendant wildcard", () => {
    const nodes = find("$.a..[*]", data);
    expect(nodes.length).toBe(n * 2);
  });

  test("lazy query", () => {
    expect(Array.from(findIter("$.a[*]", data)).length).toBe(n);
  });
});
