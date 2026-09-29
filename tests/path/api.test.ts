import { JSONPathEnvironment, JSONPathNode, JSONPathNodeList } from "../../src/path";
import { JSONPointer } from "../../src/pointer";

describe("JSONPathNode API", () => {
  const env = new JSONPathEnvironment();

  test("locations from a node list", () => {
    const nodes = new JSONPathNodeList(
      env.query("$.some['foo', 'bar'][0]", {
        some: {
          foo: [1, 2, 3],
          bar: [4, 5, 6],
          baz: [7, 8, 9],
        },
      }),
    );
    expect(nodes.length).toBe(2);
    expect(nodes.locations()).toStrictEqual([
      ["some", "foo", 0],
      ["some", "bar", 0],
    ]);
  });

  test("paths from a node list", () => {
    const nodes = new JSONPathNodeList(
      env.query("$.some['foo', 'bar'][0]", {
        some: {
          foo: [1, 2, 3],
          bar: [4, 5, 6],
          baz: [7, 8, 9],
        },
      }),
    );
    expect(nodes.length).toBe(2);
    expect(nodes.shorthandPaths()).toStrictEqual(["$.some.foo[0]", "$.some.bar[0]"]);
  });

  test("node to pointer", () => {
    const nodes = new JSONPathNodeList(
      env.find("$.some['foo', 'bar'][0]", {
        some: {
          foo: [1, 2, 3],
          bar: [4, 5, 6],
          baz: [7, 8, 9],
        },
      }),
    );
    expect(nodes.length).toBe(2);
    expect(nodes.pointers().map((p) => p.toString())).toStrictEqual(["/some/foo/0", "/some/bar/0"]);
  });

  test("node pointer property", () => {
    const nodes = new JSONPathNodeList(
      env.find("$.some['foo', 'bar'][0]", {
        some: {
          foo: [1, 2, 3],
          bar: [4, 5, 6],
          baz: [7, 8, 9],
        },
      }),
    );
    expect(nodes.length).toBe(2);
    expect(nodes.map((p) => p.pointer.toString())).toStrictEqual(["/some/foo/0", "/some/bar/0"]);
  });

  test("node to patch op", () => {
    const nodes = new JSONPathNodeList(
      env.find("$.some.foo", {
        some: {
          foo: [1, 2, 3],
          baz: [7, 8, 9],
        },
      }),
    );

    expect(nodes.length).toBe(1);
    const node = nodes.nodes[0]!;

    expect(node.addOp(42)).toStrictEqual({ op: "add", path: "/some/foo", value: 42 });
    expect(node.removeOp()).toStrictEqual({ op: "remove", path: "/some/foo" });
    expect(node.replaceOp(42)).toStrictEqual({ op: "replace", path: "/some/foo", value: 42 });
    expect(node.moveOp(JSONPointer.fromString("/some/bar"))).toStrictEqual({
      op: "move",
      from: "/some/foo",
      path: "/some/bar",
    });
    expect(node.copyOp(JSONPointer.fromString("/some/bar"))).toStrictEqual({
      op: "copy",
      from: "/some/foo",
      path: "/some/bar",
    });
    expect(node.testOp(42)).toStrictEqual({
      op: "test",
      path: "/some/foo",
      value: 42,
    });
  });

  test("match first available node", () => {
    const node = env.match("$.foo", { foo: [1, 2, 3] });
    expect(node).toBeInstanceOf(JSONPathNode);
    if (node) {
      expect(node.value).toStrictEqual([1, 2, 3]);
    }
  });
});
