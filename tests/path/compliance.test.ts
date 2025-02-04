import { readFileSync } from "fs";

import { JSONPathEnvironment } from "../../src/path/environment";
import { JSONPathError } from "../../src/path/errors";
import { JSONValue } from "../../src/types";

type Case = {
  name: string;
  selector: string;
  document?: JSONValue;
  result?: JSONValue[];
  result_paths?: string[];
  results?: JSONValue[][];
  results_paths?: string[][];
  invalid_selector?: boolean;
};

const cts = JSON.parse(
  readFileSync(process.env.JSONP3_CTS_PATH || "tests/path/cts/cts.json", {
    encoding: "utf8",
  }),
);

const env = new JSONPathEnvironment({
  nondeterministic: process.env.JSONP3_CTS_NONDETERMINISTIC === "true",
});

const testSuiteName = env.nondeterministic
  ? "compliance test suite (nondeterministic)"
  : "compliance test suite";

describe(testSuiteName, () => {
  test.each<Case>(cts.tests)(
    "$name",
    ({
      selector,
      document,
      result,
      result_paths,
      results,
      results_paths,
      invalid_selector,
    }: Case) => {
      if (invalid_selector) {
        expect(() => env.compile(selector)).toThrow(JSONPathError);
      } else if (document) {
        if (result) {
          const nodes = env.query(selector, document);
          expect(nodes.values()).toStrictEqual(result);
          expect(nodes.paths({ form: "canonical" })).toStrictEqual(
            result_paths,
          );
        } else if (results) {
          const nodes = env.query(selector, document);
          expect(results).toContainEqual(nodes.values());
          expect(results_paths).toContainEqual(
            nodes.paths({ form: "canonical" }),
          );
        }
      }
    },
  );
});
