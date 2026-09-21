import { query, lazyQuery } from "../../src";

// Selecting from an array large enough that spreading the result into
// function call arguments would exceed the engine's argument limit and
// throw "RangeError: Maximum call stack size exceeded".
describe("large result sets", () => {
  const n = 200_000;
  const data = { a: Array.from({ length: n }, (_, i) => ({ b: i })) };

  test("wildcard child segment", () => {
    const nodes = query("$.a[*]", data);
    expect(nodes.length).toBe(n);
    expect(nodes.nodes[n - 1].value).toStrictEqual({ b: n - 1 });
  });

  test("wildcard followed by name", () => {
    const nodes = query("$.a[*].b", data);
    expect(nodes.length).toBe(n);
    expect(nodes.nodes[n - 1].value).toBe(n - 1);
  });

  test("descendant segment", () => {
    const nodes = query("$..b", data);
    expect(nodes.length).toBe(n);
  });

  test("descendant wildcard", () => {
    const nodes = query("$.a..[*]", data);
    expect(nodes.length).toBe(n * 2);
  });

  test("lazy query", () => {
    expect(Array.from(lazyQuery("$.a[*]", data)).length).toBe(n);
  });
});
