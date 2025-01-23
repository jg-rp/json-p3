import { readFileSync } from "fs";

import { JSONPathEnvironment } from "../../src/path/environment";

type Case = {
  name: string;
  query: string;
  canonical: string;
};

const normalized_paths = JSON.parse(
  readFileSync(
    process.env.JSONP3_NTS_CANONICAL_PATH ||
      "tests/path/nts/canonical_paths.json",
    {
      encoding: "utf8",
    },
  ),
);

const env = new JSONPathEnvironment();

describe("serialize to canonical path", () => {
  test.each<Case>(normalized_paths.tests)(
    "$name",
    ({ query, canonical }: Case) => {
      const q = env.compile(query).toString({ form: "canonical" });
      expect(q).toStrictEqual(canonical);
    },
  );
});
