import { JSONPathNodeList } from "../../src/path";
import { JSONPathEnvironment } from "../../src/path/environment";
import { JSONPathError } from "../../src/path/errors";
import { JSONValue } from "../../src/types";

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

describe("lazy resolution", () => {
  test.each<Case>(cts.tests)(
    "$name",
    ({ selector, document, result, invalid_selector }: Case) => {
      const env = new JSONPathEnvironment();
      if (invalid_selector) {
        expect(() => env.compile(selector)).toThrow(JSONPathError);
      } else if (document && result) {
        const it = env.lazyQuery(selector, document);
        const rv = new JSONPathNodeList(Array.from(it)).values();
        expect(rv).toStrictEqual(result);
      }
    },
  );
});
