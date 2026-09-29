import { JSONPathEnvironment, JSONPathNode } from "../../src/path";

describe("JSONPathNode API", () => {
  const env = new JSONPathEnvironment();

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
    expect(nodes.shorthandPaths()).toStrictEqual(["$.some.foo[0]", "$.some.bar[0]"]);
  });

  test("pointer from node", () => {
    const nodes = env.find("$.some['foo', 'bar'][0]", {
      some: {
        foo: [1, 2, 3],
        bar: [4, 5, 6],
        baz: [7, 8, 9],
      },
    });
    expect(nodes.length).toBe(2);
    expect(nodes.pointers().map((p) => p.toString())).toStrictEqual(["/some/foo/0", "/some/bar/0"]);
  });

  test("match first available node", () => {
    const node = env.match("$.foo", { foo: [1, 2, 3] });
    expect(node).toBeInstanceOf(JSONPathNode);
    if (node) {
      expect(node.value).toStrictEqual([1, 2, 3]);
    }
  });
});
