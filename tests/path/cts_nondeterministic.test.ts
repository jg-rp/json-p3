import { JSONPathEnvironment } from "../../src/path/environment";
import { JSONPathError } from "../../src/path/errors";
import { JSONValue } from "../../src/types";

import ctsNondeterministic from "./cts_nondeterministic/cts.json";

type Case = {
  name: string;
  selector: string;
  document?: JSONValue;
  result?: JSONValue[];
  results?: JSONValue[][];
  invalid_selector?: boolean;
};

describe("nondeterministic compliance test suite", () => {
  test.each<Case>(ctsNondeterministic.tests)(
    "$name",
    ({ selector, document, result, results, invalid_selector }: Case) => {
      const env = new JSONPathEnvironment();
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
