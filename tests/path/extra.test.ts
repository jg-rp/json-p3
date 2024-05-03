import { readFileSync } from "fs";

import { JSONPathEnvironment } from "../../src/path/environment";
import { JSONPathError, JSONPathSyntaxError } from "../../src/path/errors";
import { JSONValue } from "../../src/types";

type Case = {
  name: string;
  selector: string;
  document?: JSONValue;
  result?: JSONValue[];
  results?: JSONValue[][];
  invalid_selector?: boolean;
};

const cts = JSON.parse(
  readFileSync(process.env.JSONP3_CTS_PATH || "tests/path/cts/cts.json", {
    encoding: "utf8",
  }),
);

const env = new JSONPathEnvironment({
  strict: false,
  nondeterministic: process.env.JSONP3_CTS_NONDETERMINISTIC === "true",
});

const testSuiteName = env.nondeterministic
  ? "compliance test suite (extra, nondeterministic)"
  : "compliance test suite (extra)";

describe(testSuiteName, () => {
  test.each<Case>(cts.tests)(
    "$name",
    ({ selector, document, result, results, invalid_selector }: Case) => {
      if (invalid_selector) {
        expect(() => env.compile(selector)).toThrow(JSONPathError);
      } else if (document) {
        if (result) {
          const rv = env.query(selector, document).values();
          expect(rv).toStrictEqual(result);
        } else if (results) {
          const rv = env.query(selector, document).values();
          expect(results).toContainEqual(rv);
        }
      }
    },
  );
});

type TestCase = {
  description: string;
  path: string;
  data: JSONValue;
  want: JSONValue;
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
  test.each<TestCase>(TEST_CASES)(
    "$description",
    ({ path, data, want }: TestCase) => {
      expect(env.query(path, data).values()).toStrictEqual(want);
      expect(
        Array.from(env.lazyQuery(path, data)).map((n) => n.value),
      ).toStrictEqual(want);
    },
  );

  test("keys from an object, location is valid", () => {
    const path = "$.some.~";
    const data = { some: { a: 1, b: 2, c: 3 } };
    const nodes = env.query(path, data);
    expect(nodes.values()).toStrictEqual(["a", "b", "c"]);
    expect(env.query(nodes.nodes[0].path, data).values()).toStrictEqual(["a"]);
    expect(env.query(nodes.nodes[1].path, data).values()).toStrictEqual(["b"]);
    expect(env.query(nodes.nodes[2].path, data).values()).toStrictEqual(["c"]);
  });

  test("custom keys pattern", () => {
    const path = "$.some[*~]";
    const data = { some: { other: "foo", thing: "bar" } };
    const laxEnv = new JSONPathEnvironment({
      strict: false,
      keysPattern: /\*~/y,
    });
    const nodes = laxEnv.query(path, data);
    expect(nodes.values()).toStrictEqual(["other", "thing"]);
  });

  test("custom keys pattern, shorthand", () => {
    const path = "$.some.*~";
    const data = { some: { other: "foo", thing: "bar" } };
    const laxEnv = new JSONPathEnvironment({
      strict: false,
      keysPattern: /\*~/y,
    });
    const nodes = laxEnv.query(path, data);
    expect(nodes.values()).toStrictEqual(["other", "thing"]);
  });
});

describe("extra errors", () => {
  test("segments after current key identifier", () => {
    const query = "$.some[?#.foo > 1]";
    expect(() => env.query(query, {})).toThrow(JSONPathSyntaxError);
    expect(() => env.query(query, {})).toThrow(
      "expected token 'TOKEN_COMMA', found 'TOKEN_NAME' ('[?#.foo >':10)",
    );
  });
});

type DocsTestCase = {
  description: string;
  path: string;
  data: JSONValue;
  want: JSONValue;
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
    want_paths: ["$['a'][0][~'c']"],
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
    want_paths: ["$['a'][0][~'b']", "$['a'][1][~'b']"],
  },
  {
    description: "key selector, , descendant, double quoted key",
    path: '$..[~"b"]',
    data: {
      a: [{ b: "x", c: "z" }, { b: "y" }],
    },
    want: ["b", "b"],
    want_paths: ["$['a'][0][~'b']", "$['a'][1][~'b']"],
  },
  {
    description: "keys selector, object key",
    path: "$.a[0].~",
    data: {
      a: [{ b: "x", c: "z" }, { b: "y" }],
    },
    want: ["b", "c"],
    want_paths: ["$['a'][0][~'b']", "$['a'][0][~'c']"],
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
  // {
  //   description: "keys selector, non-deterministic ordering",
  //   path: "$.a[0][~, ~]",
  //   data: {
  //     a: [{ b: "x", c: "z" }, { b: "y" }],
  //   },
  //   want: ["b", "c", "b", "c"], // non-deterministic
  //   want_paths: [
  //     "$['a'][0][~'b']",
  //     "$['a'][0][~'c']",
  //     "$['a'][0][~'b']",
  //     "$['a'][0][~'c']",
  //   ],
  // },
  {
    description: "keys selector, descendant keys",
    path: "$..[~]",
    data: {
      a: [{ b: "x", c: "z" }, { b: "y" }],
    },
    want: ["a", "b", "c", "b"],
    want_paths: [
      "$[~'a']",
      "$['a'][0][~'b']",
      "$['a'][0][~'c']",
      "$['a'][1][~'b']",
    ],
  },
  {
    description: "keys filter selector, conditionally select object keys",
    path: "$.*[~?length(@) > 2]",
    data: [{ a: [1, 2, 3], b: [4, 5] }, { c: { x: [1, 2] } }, { d: [1, 2, 3] }],
    want: ["a", "d"],
    want_paths: ["$[0][~'a']", "$[2][~'d']"],
  },
  {
    description: "keys filter selector, existence test",
    path: "$.*[~?@.x]",
    data: [{ a: [1, 2, 3], b: [4, 5] }, { c: { x: [1, 2] } }, { d: [1, 2, 3] }],
    want: ["c"],
    want_paths: ["$[1][~'c']"],
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
    want_paths: ["$['abc']", "$['abx']"],
  },
  {
    description: "current key identifier, compare current array index",
    path: "$.abc[?(# >= 1)]",
    data: { abc: [1, 2, 3], def: [4, 5], abx: [6], aby: [] },
    want: [2, 3],
    want_paths: ["$['abc'][1]", "$['abc'][2]"],
  },
];

describe("extra docs examples", () => {
  test.each<DocsTestCase>(DOCS_EXAMPLE_TEST_CASES)(
    "$description",
    ({ path, data, want, want_paths }: DocsTestCase) => {
      expect(env.query(path, data).values()).toStrictEqual(want);
      expect(env.query(path, data).paths()).toStrictEqual(want_paths);
      expect(
        Array.from(env.lazyQuery(path, data)).map((n) => n.value),
      ).toStrictEqual(want);
    },
  );
});
