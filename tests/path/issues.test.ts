import {
  query,
  compile,
  findAll,
  findIter,
  JSONPathQuery,
  JSONPathSyntaxError,
} from "../../src/json-p3.js";

describe("issues", () => {
  test("issue 40", () => {
    const data = { a: "d449f7a5-9153-4f39-a05d-dca1c35538ec" };
    const path = '$[?search(@, "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{10}")]';
    const nodes = query(path, data);
    expect(nodes.map((n) => n.value)).toStrictEqual(["d449f7a5-9153-4f39-a05d-dca1c35538ec"]);
  });

  test("issue 42", () => {
    // This was failing with an "unbalanced parentheses" syntax error.
    expect(compile("$[? count(@.likes[? @.location]) > 3]")).toBeInstanceOf(JSONPathQuery);
  });

  test("issue 47", () => {
    const cases = [
      { path: "$[1:]", data: ["a"], want: [] },
      { path: "$[3:]", data: ["a", "b", "c"], want: [] },
      { path: "$[2:]", data: ["a", "b", "c"], want: ["c"] },
    ];

    for (const t of cases) {
      const nodes = query(t.path, t.data);
      expect(nodes.map((n) => n.value)).toStrictEqual(t.want);

      const it = findIter(t.path, t.data);
      const rv = Array.from(it).map((n) => n.value);
      expect(rv).toStrictEqual(t.want);
    }
  });

  test("python jsonpath issue 24", () => {
    const data = { "\u001f": 1, é: 2 };
    expect(findAll("$['\\u001f']", data)).toStrictEqual([1]);
    expect(findAll("$['\\u00e9']", data)).toStrictEqual([2]);
    expect(findAll("$['\\u00E9']", data)).toStrictEqual([2]);
  });

  test("python jsonpath issue 25", () => {
    expect(() => {
      compile("$.a-b");
    }).toThrow(JSONPathSyntaxError);

    expect(findAll("$.😀", { "😀": 1 })).toStrictEqual([1]);
    expect(findAll("$['😀']", { "😀": 1 })).toStrictEqual([1]);
  });

  test("python jsonpath issue 26", () => {
    expect(() => compile("$[1,]")).toThrow(JSONPathSyntaxError);
    expect(() => compile("$[1, ]")).toThrow(JSONPathSyntaxError);
    expect(() => compile("$[ 1, ]")).toThrow(JSONPathSyntaxError);
  });

  test("python jsonpath issue 27", () => {
    expect(findAll("$[?@ > false]", [0, 1, true, false])).toStrictEqual([]);
    expect(findAll("$[?@ < true]", [0, 1, true])).toStrictEqual([]);
    expect(findAll("$[?@ >= 0]", [true, false, 0])).toStrictEqual([0]);
  });
});
