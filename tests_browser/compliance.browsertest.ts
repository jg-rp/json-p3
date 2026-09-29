import type { JSONLike } from "json-p3";

import { JSONPathEnvironment, JSONPathError, JSONPathNodeList } from "json-p3";
import { describe, test, expect } from "vitest";

type Case = {
  name: string;
  selector: string;
  document?: JSONLike;
  result?: JSONLike[];
  result_paths?: string[];
  results?: JSONLike[][];
  results_paths?: string[][];
  invalid_selector?: boolean;
};

import cts from "../cts/cts.json";

const validQueries = cts.tests.filter((c: Case) => !c.invalid_selector);

const env = new JSONPathEnvironment();

describe("compliance test suite", () => {
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
        const nodes = env.find(selector, document);
        if (result) {
          expect(nodes.values()).toStrictEqual(result);
          expect(nodes.normalizedPaths()).toStrictEqual(result_paths);
        } else if (results) {
          expect(results).toContainEqual(nodes.values());
          expect(results_paths).toContainEqual(nodes.normalizedPaths());
        }
      }
    },
  );
});

describe("compliance test suite, lazy", () => {
  test.each<Case>(validQueries)(
    "$name",
    ({ selector, document, result, result_paths, results, results_paths }: Case) => {
      const it = env.findIter(selector, document);
      const nodes = new JSONPathNodeList(Array.from(it));
      const values = nodes.values();
      const paths = nodes.normalizedPaths();

      if (result) {
        expect(values).toStrictEqual(result);
        expect(paths).toStrictEqual(result_paths);
      } else if (results) {
        expect(results).toContainEqual(values);
        expect(results_paths).toContainEqual(paths);
      }
    },
  );
});

describe("compliance test suite, basic", () => {
  test.each<Case>(validQueries)("$name", ({ selector, document, result, results }: Case) => {
    const values = env.findAll(selector, document);

    if (result) {
      expect(values).toStrictEqual(result);
    } else if (results) {
      expect(results).toContainEqual(values);
    }
  });
});

describe("compliance test suite, lazy basic", () => {
  test.each<Case>(validQueries)("$name", ({ selector, document, result, results }: Case) => {
    const it = env.findAllIter(selector, document);
    const values = Array.from(it);

    if (result) {
      expect(values).toStrictEqual(result);
    } else if (results) {
      expect(results).toContainEqual(values);
    }
  });
});
