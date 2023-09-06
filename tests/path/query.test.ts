import { JSONPathEnvironment } from "../../src/path/environment";
import { JSONPathError } from "../../src/path/errors";
import { JSONValue } from "../../src/path/types";

import cts from "./cts/cts.json";

type Case = {
  name: string;
  selector: string;
  document?: JSONValue;
  result?: JSONValue[];
  invalid_selector?: boolean;
};

describe("compliance test suite", () => {
  test.each<Case>(cts.tests)(
    "$name",
    ({ selector, document, result, invalid_selector }: Case) => {
      const env = new JSONPathEnvironment();
      if (invalid_selector) {
        expect(() => env.compile(selector)).toThrow(JSONPathError);
      } else if (document && result) {
        const rv = env.query(selector, document).values();
        expect(rv).toStrictEqual(result);
      }
    },
  );
});
