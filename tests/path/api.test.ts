import { JSONPathEnvironment, JSONPathNode } from "../../src/path";

describe("JSONPath API", () => {
  const env = new JSONPathEnvironment();
  test("values or singular from a single element node list", () => {
    const nodes = env.query("$.foo", { foo: [1, 2, 3] });
    expect(nodes.length).toBe(1);
    expect(nodes.valuesOrSingular()).toStrictEqual([1, 2, 3]);
  });
  test("values or singular from an empty node list", () => {
    const nodes = env.query("$.bar", { foo: [1, 2, 3] });
    expect(nodes.length).toBe(0);
    expect(nodes.valuesOrSingular()).toStrictEqual([]);
  });
  test("values or singular from a node list", () => {
    const nodes = env.query("$['foo', 'bar']", {
      foo: [1, 2, 3],
      bar: [4, 5, 6],
    });
    expect(nodes.length).toBe(2);
    expect(nodes.valuesOrSingular()).toStrictEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });
  test("locations from a node list", () => {
    const nodes = env.query("$.some['foo', 'bar'][0]", {
      some: {
        foo: [1, 2, 3],
        bar: [4, 5, 6],
        baz: [7, 8, 9],
      },
    });
    expect(nodes.length).toBe(2);
    expect(nodes.locations()).toStrictEqual([
      ["some", "foo", 0],
      ["some", "bar", 0],
    ]);
  });
  test("paths from a node list", () => {
    const nodes = env.query("$.some['foo', 'bar'][0]", {
      some: {
        foo: [1, 2, 3],
        bar: [4, 5, 6],
        baz: [7, 8, 9],
      },
    });
    expect(nodes.length).toBe(2);
    expect(nodes.paths()).toStrictEqual([
      "$['some']['foo'][0]",
      "$['some']['bar'][0]",
    ]);
  });
  test("pointer from node", () => {
    const nodes = env.query("$.some['foo', 'bar'][0]", {
      some: {
        foo: [1, 2, 3],
        bar: [4, 5, 6],
        baz: [7, 8, 9],
      },
    });
    expect(nodes.length).toBe(2);
    expect(nodes.pointers().map((p) => p.toString())).toStrictEqual([
      "/some/foo/0",
      "/some/bar/0",
    ]);
  });
  test("pointer from empty node", () => {
    const node = new JSONPathNode("", [], {});
    expect(node.toPointer().toString()).toBe("");
  });
  test("match first available node", () => {
    const node = env.match("$.foo", { foo: [1, 2, 3] });
    expect(node).toBeInstanceOf(JSONPathNode);
    if (node) {
      expect(node.value).toStrictEqual([1, 2, 3]);
    }
  });
});
