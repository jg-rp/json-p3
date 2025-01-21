import { compile } from "../../src/path";

const cases = [
  { key: "a", serialized: "$.a" },

  { key: 1, serialized: "$[1]" },
  { key: "1", serialized: `$['1']` },
  { key: "a1", serialized: "$.a1" },
  { key: "1a", serialized: `$['1a']` },
  { key: "a1a", serialized: "$.a1a" },
  { key: "1a1", serialized: `$['1a1']` },

  { key: "$", serialized: `$['$']` },
  { key: "$a", serialized: `$['$a']` },
  { key: "a$", serialized: `$['a$']` },
  { key: "a$a", serialized: `$['a$a']` },
  { key: "$a$", serialized: `$['$a$']` },

  { key: "_", serialized: "$._" },
  { key: "_a", serialized: "$._a" },
  { key: "a_", serialized: "$.a_" },
  { key: "a_a", serialized: "$.a_a" },
  { key: "_a_", serialized: "$._a_" },

  { key: " ", serialized: `$[' ']` },
  { key: " a", serialized: `$[' a']` },
  { key: "a ", serialized: `$['a ']` },
  { key: "a a", serialized: `$['a a']` },
  { key: " a ", serialized: `$[' a ']` },

  { key: "\\", serialized: String.raw`$['\\']` },
  { key: '"', serialized: String.raw`$['"']` },
  { key: `'`, serialized: String.raw`$["'"]` },
  { key: '\\"', serialized: String.raw`$['\\"']` },
  { key: `\\'`, serialized: String.raw`$["\\'"]` },

  { key: `'"`, serialized: String.raw`$['\'"']` },
  { key: `"'`, serialized: String.raw`$['"\'']` },

  { key: "*", serialized: `$['*']` },
  { key: "@", serialized: `$['@']` },
  { key: "[]", serialized: `$['[]']` },
  { key: "💩", serialized: `$['💩']` },

  { key: "文字", serialized: `$.文字` },

  { key: "\u200c", serialized: `$['\u200c']` },
  { key: "\u200ca", serialized: `$['\u200ca']` },
  { key: "a\u200c", serialized: "$.a\u200c" },
  { key: "a\u200ca", serialized: "$.a\u200ca" },
  { key: "\u200ca\u200c", serialized: `$['\u200ca\u200c']` },

  { key: "null", serialized: "$.null" },
  { key: "Infinity", serialized: "$.Infinity" },
  { key: "__proto__", serialized: "$.__proto__" },

  { key: "\n", serialized: String.raw`$['\n']` },
  { key: "\t", serialized: String.raw`$['\t']` },
];

const obj = Object.fromEntries(cases.map(({ key }) => [key, key]));
const arr = Array.from({ length: 100 }, (_, i) => i);

describe("escaping of keys", () => {
  test.each(cases)("$key -> $serialized", ({ key, serialized }) => {
    const input = `$${JSON.stringify([key])}`;
    const jpq = compile(input);
    const path = jpq.toString();
    const roundTripped = compile(path);

    expect(path).toBe(serialized);
    expect(roundTripped.toString()).toBe(path);

    const target = typeof key === "number" ? arr : obj;
    expect(jpq.query(target).values()[0]).toBe(key);
    expect(roundTripped.query(target).values()[0]).toBe(key);
  });
});
