import { readFileSync } from "fs";

import { JSONPathEnvironment } from "../../src/path/environment";
import { JSONPathError } from "../../src/path/errors";
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
  readFileSync(process.env.JSONP3_CTS || "tests/path/cts/cts.json", {
    encoding: "utf8",
  }),
);

const env = new JSONPathEnvironment({
  nondeterministic: process.env.JSONP3_CTS_NONDETERMINISTIC === "true",
});

describe("compliance test suite", () => {
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
