import {
  compile,
  JSONPathEnvironment,
  JSONPathSyntaxError,
  type JSONLike,
} from "../../src/json-p3";

type TestCase = {
  description: string;
  path: string;
  data: JSONLike;
  want: JSONLike;
};

const TEST_CASES: TestCase[] = [
  {
    description: "keys from an object",
    path: "$.some[~]",
    data: { some: { other: "foo", thing: "bar" } },
    want: ["other", "thing"],
  },
  {
    description: "shorthand keys from an object",
    path: "$.some.~",
    data: { some: { other: "foo", thing: "bar" } },
    want: ["other", "thing"],
  },
  {
    description: "keys from an array",
    path: "$.some[~]",
    data: { some: ["other", "thing"] },
    want: [],
  },
  {
    description: "shorthand keys from an array",
    path: "$.some.~",
    data: { some: ["other", "thing"] },
    want: [],
  },
  {
    description: "recurse object keys",
    path: "$..~",
    data: { some: { thing: "else", foo: { bar: "baz" } } },
    want: ["some", "thing", "foo", "bar"],
  },
  {
    description: "current key of an object",
    path: "$.some[?match(#, '^b.*')]",
    data: { some: { foo: "a", bar: "b", baz: "c", qux: "d" } },
    want: ["b", "c"],
  },
  {
    description: "current key of an array",
    path: "$.some[?# > 1]",
    data: { some: ["other", "thing", "foo", "bar"] },
    want: ["foo", "bar"],
  },
  {
    description: "filter keys from an object",
    path: "$.some[~?match(@, '^b.*')]",
    data: { some: { other: "foo", thing: "bar" } },
    want: ["thing"],
  },
  {
    description: "singular key from an object",
    path: "$.some[~'other']",
    data: { some: { other: "foo", thing: "bar" } },
    want: ["other"],
  },
  {
    description: "singular key from an object, does not exist",
    path: "$.some[~'else']",
    data: { some: { other: "foo", thing: "bar" } },
    want: [],
  },
  {
    description: "singular key from an array",
    path: "$.some[~'1']",
    data: { some: ["foo", "bar"] },
    want: [],
  },
  {
    description: "singular key from an object, shorthand",
    path: "$.some.~other",
    data: { some: { other: "foo", thing: "bar" } },
    want: ["other"],
  },
  {
    description: "recursive key from an object",
    path: "$.some..[~'other']",
    data: { some: { other: "foo", thing: "bar", else: { other: "baz" } } },
    want: ["other", "other"],
  },
  {
    description: "recursive key from an object, shorthand",
    path: "$.some..~other",
    data: { some: { other: "foo", thing: "bar", else: { other: "baz" } } },
    want: ["other", "other"],
  },
  {
    description: "recursive key from an object, does not exist",
    path: "$.some..[~'nosuchthing']",
    data: { some: { other: "foo", thing: "bar", else: { other: "baz" } } },
    want: [],
  },
];

describe("extra features", () => {
  const env = new JSONPathEnvironment({ strict: false });

  test.each<TestCase>(TEST_CASES)("$description", ({ path, data, want }: TestCase) => {
    expect(env.query(path, data).map((n) => n.value)).toStrictEqual(want);
    expect(env.findAll(path, data)).toStrictEqual(want);
    expect(Array.from(env.lazyQuery(path, data)).map((n) => n.value)).toStrictEqual(want);
    expect(Array.from(env.findAllIter(path, data))).toStrictEqual(want);
  });

  test("keys from an object, location is valid", () => {
    const path = "$.some.~";
    const data = { some: { a: 1, b: 2, c: 3 } };
    const nodes = env.query(path, data);
    expect(nodes.map((n) => n.value)).toStrictEqual(["a", "b", "c"]);
    expect(env.findAll(nodes[0]!.normalizedPath(), data)).toStrictEqual(["a"]);
    expect(env.findAll(nodes[1]!.normalizedPath(), data)).toStrictEqual(["b"]);
    expect(env.findAll(nodes[2]!.normalizedPath(), data)).toStrictEqual(["c"]);
  });
});

describe("extra errors", () => {
  const env = new JSONPathEnvironment({ strict: false });

  test("segments after current key identifier", () => {
    const query = "$.some[?#.foo > 1]";
    expect(() => env.query(query, {})).toThrow(JSONPathSyntaxError);
    expect(() => env.query(query, {})).toThrow("expected a comma or closing bracket");
  });
});

type DocsTestCase = {
  description: string;
  path: string;
  data: JSONLike;
  want: JSONLike;
  want_paths: string[];
};

const DOCS_EXAMPLE_TEST_CASES: DocsTestCase[] = [
  {
    description: "key selector, key of nested object",
    path: "$.a[0].~c",
    data: {
      a: [{ b: "x", c: "z" }, { b: "y" }],
    },
    want: ["c"],
    want_paths: ["$.a[0].~c"],
  },
  {
    description: "key selector, key does not exist",
    path: "$.a[1].~c",
    data: {
      a: [{ b: "x", c: "z" }, { b: "y" }],
    },
    want: [],
    want_paths: [],
  },
  {
    description: "key selector, descendant, single quoted key",
    path: "$..[~'b']",
    data: {
      a: [{ b: "x", c: "z" }, { b: "y" }],
    },
    want: ["b", "b"],
    want_paths: ["$.a[0].~b", "$.a[1].~b"],
  },
  {
    description: "key selector, descendant, double quoted key",
    path: '$..[~"b"]',
    data: {
      a: [{ b: "x", c: "z" }, { b: "y" }],
    },
    want: ["b", "b"],
    want_paths: ["$.a[0].~b", "$.a[1].~b"],
  },
  {
    description: "keys selector, object key",
    path: "$.a[0].~",
    data: {
      a: [{ b: "x", c: "z" }, { b: "y" }],
    },
    want: ["b", "c"],
    want_paths: ["$.a[0].~b", "$.a[0].~c"],
  },
  {
    description: "keys selector, array key",
    path: "$.a.~",
    data: {
      a: [{ b: "x", c: "z" }, { b: "y" }],
    },
    want: [],
    want_paths: [],
  },
  {
    description: "keys selector, descendant keys",
    path: "$..[~]",
    data: {
      a: [{ b: "x", c: "z" }, { b: "y" }],
    },
    want: ["a", "b", "c", "b"],
    want_paths: ["$.~a", "$.a[0].~b", "$.a[0].~c", "$.a[1].~b"],
  },
  {
    description: "keys filter selector, conditionally select object keys",
    path: "$.*[~?length(@) > 2]",
    data: [{ a: [1, 2, 3], b: [4, 5] }, { c: { x: [1, 2] } }, { d: [1, 2, 3] }],
    want: ["a", "d"],
    want_paths: ["$[0].~a", "$[2].~d"],
  },
  {
    description: "keys filter selector, existence test",
    path: "$.*[~?@.x]",
    data: [{ a: [1, 2, 3], b: [4, 5] }, { c: { x: [1, 2] } }, { d: [1, 2, 3] }],
    want: ["c"],
    want_paths: ["$[1].~c"],
  },
  {
    description: "keys filter selector, keys from an array",
    path: "$[~?(true == true)]",
    data: [{ a: [1, 2, 3], b: [4, 5] }, { c: { x: [1, 2] } }, { d: [1, 2, 3] }],
    want: [],
    want_paths: [],
  },
  {
    description: "current key identifier, match on object names",
    path: "$[?match(#, '^ab.*') && length(@) > 0 ]",
    data: { abc: [1, 2, 3], def: [4, 5], abx: [6], aby: [] },
    want: [[1, 2, 3], [6]],
    want_paths: ["$.abc", "$.abx"],
  },
  {
    description: "current key identifier, compare current array index",
    path: "$.abc[?(# >= 1)]",
    data: { abc: [1, 2, 3], def: [4, 5], abx: [6], aby: [] },
    want: [2, 3],
    want_paths: ["$.abc[1]", "$.abc[2]"],
  },
];

describe("extra docs examples", () => {
  const env = new JSONPathEnvironment({ strict: false });

  test.each<DocsTestCase>(DOCS_EXAMPLE_TEST_CASES)(
    "$description",
    ({ path, data, want, want_paths }: DocsTestCase) => {
      expect(env.query(path, data).map((n) => n.value)).toStrictEqual(want);
      expect(env.query(path, data).map((n) => n.shorthandPath())).toStrictEqual(want_paths);
      expect(Array.from(env.lazyQuery(path, data)).map((n) => n.value)).toStrictEqual(want);
    },
  );
});

describe("extra syntax is disabled by default", () => {
  test("current key", () => {
    expect(() => compile("$.some[?# > 1]")).toThrow(JSONPathSyntaxError);
  });

  test("child keys", () => {
    expect(() => compile("$.some[~]")).toThrow(JSONPathSyntaxError);
  });

  test("shorthand keys", () => {
    expect(() => compile("$.some.~")).toThrow(JSONPathSyntaxError);
  });

  test("recursive keys", () => {
    expect(() => compile("$..~")).toThrow(JSONPathSyntaxError);
  });

  test("just a key", () => {
    expect(() => compile("$.some[~'other']")).toThrow(JSONPathSyntaxError);
  });
  test("just a key, shorthand", () => {
    expect(() => compile("$.some.~other")).toThrow(JSONPathSyntaxError);
  });

  test("filter keys", () => {
    expect(() => compile("$.some[~?match(@, '^b.*')]")).toThrow(JSONPathSyntaxError);
  });
});
