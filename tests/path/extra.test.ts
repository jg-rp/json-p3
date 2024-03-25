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
    want: [0, 1],
  },
  {
    description: "shorthand keys from an array",
    path: "$.some.~",
    data: { some: ["other", "thing"] },
    want: [0, 1],
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

  test("keys from an array, location is valid", () => {
    const path = "$.some[?# > 1]";
    const data = { some: ["other", "thing", "foo", "bar"] };
    const nodes = env.query(path, data);
    expect(nodes.values()).toStrictEqual(["foo", "bar"]);
    expect(env.query(nodes.nodes[0].path, data).values()).toStrictEqual([
      "foo",
    ]);
    expect(env.query(nodes.nodes[1].path, data).values()).toStrictEqual([
      "bar",
    ]);
  });

  test("keys from an object, location is valid", () => {
    const path = "$.some[?match(#, '^b.*')]";
    const data = { some: { foo: "a", bar: "b", baz: "c", qux: "d" } };
    const nodes = env.query(path, data);
    expect(nodes.values()).toStrictEqual(["b", "c"]);
    expect(env.query(nodes.nodes[0].path, data).values()).toStrictEqual(["b"]);
    expect(env.query(nodes.nodes[1].path, data).values()).toStrictEqual(["c"]);
  });

  // TODO: test custom keys pattern.
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
