import type { JSONLike } from "json-p3";

import { JSONPathEnvironment, JSONPathError } from "json-p3";
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
        const values = nodes.map((n) => n.value);
        const normalizedPaths = nodes.map((n) => n.normalizedPath());

        if (result) {
          expect(values).toStrictEqual(result);
          expect(normalizedPaths).toStrictEqual(result_paths);
        } else if (results) {
          expect(results).toContainEqual(values);
          expect(results_paths).toContainEqual(normalizedPaths);
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
      const nodes = Array.from(it);
      const values = nodes.map((n) => n.value);
      const normalizedPaths = nodes.map((n) => n.normalizedPath());

      if (result) {
        expect(values).toStrictEqual(result);
        expect(normalizedPaths).toStrictEqual(result_paths);
      } else if (results) {
        expect(results).toContainEqual(values);
        expect(results_paths).toContainEqual(normalizedPaths);
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
