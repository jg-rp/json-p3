import { query } from "../../src/path";

describe("JSONPath query", () => {
    test("logical expression, existence tests", () => {
      const path = "$[?@.a && @.b]";
      const data =  [{"a": false, "b": false}];
      expect(query(path, data).values()).toStrictEqual([{"a": false, "b": false}]);
    });
  }
);