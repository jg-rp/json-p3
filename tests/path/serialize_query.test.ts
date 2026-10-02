import { readFileSync } from "fs";

import { compile } from "../../src/json-p3";

type Case = {
  name: string;
  query: string;
  canonical: string;
  shorthand: string;
};

const canonicalPaths = JSON.parse(
  readFileSync("tests/path/serialized_paths.json", {
    encoding: "utf8",
  }),
);

describe("canonical paths", () => {
  test.each<Case>(canonicalPaths.tests)("$name", ({ query, canonical }: Case) => {
    expect(compile(query).canonicalPath()).toStrictEqual(canonical);
  });
});

describe("shorthand paths", () => {
  test.each<Case>(canonicalPaths.tests)("$name", ({ query, shorthand }: Case) => {
    expect(compile(query).shorthandPath()).toStrictEqual(shorthand);
  });
});
