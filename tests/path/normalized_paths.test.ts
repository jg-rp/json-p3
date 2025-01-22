import { readFileSync } from "fs";

import { JSONPathEnvironment } from "../../src/path/environment";
import { JSONValue } from "../../src/types";

type Case = {
  name: string;
  query: string;
  document: JSONValue;
  paths: string[];
};

const normalized_paths = JSON.parse(
  readFileSync(
    process.env.JSONP3_NTS_PATH || "tests/path/nts/normalized_paths.json",
    {
      encoding: "utf8",
    },
  ),
);

const env = new JSONPathEnvironment();

describe("compliance normalized paths", () => {
  test.each<Case>(normalized_paths.tests)(
    "$name",
    ({ query, document, paths }: Case) => {
      const rv = env.query(query, document).paths({ form: "canonical" });
      expect(paths).toStrictEqual(rv);
    },
  );
});
