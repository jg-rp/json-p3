import type { JSONLike } from "../types";
import type { JSONPathQuery } from "./query";

import { JSONPathEnvironment } from "./environment";
import { JSONPathNode } from "./nodes";

export { JSONPathEnvironment } from "./environment";
export type { JSONPathEnvironmentOptions } from "./environment";

export { JSONPathQuery } from "./query";
export { JSONPathNode } from "./nodes";

export { NODES_TYPE, VALUE_TYPE, LOGICAL_TYPE, Has, CachingRegexFunction } from "./functions";
export type {
  ExpressionType,
  FilterFunction,
  RegexFunctionOptions,
  HasFilterFunctionOptions,
} from "./functions";

export * as functions from "./functions";

export {
  type Diagnostic,
  JSONPathError,
  JSONPathNameError,
  DetailedJSONPathError,
  JSONPathSyntaxError,
  JSONPathTypeError,
  JSONPathRecursionError,
} from "./errors";

export { Nothing } from "./nothing";

export const DEFAULT_ENVIRONMENT = new JSONPathEnvironment();

/**
 * Compile a JSONPath query expression for later evaluation.
 */
export function compile(expression: string): JSONPathQuery {
  return DEFAULT_ENVIRONMENT.compile(expression);
}

/**
 * Evaluate JSONPath query _expression_ against _data_ and return an array of matched nodes.
 */
export function find(expression: string, data: JSONLike): JSONPathNode[] {
  return DEFAULT_ENVIRONMENT.find(expression, data);
}

/**
 * Evaluate JSONPath query _expression_ against _data_ and return an array of matched nodes.
 */
export function findIter(expression: string, data: JSONLike): IterableIterator<JSONPathNode> {
  return DEFAULT_ENVIRONMENT.findIter(expression, data);
}

/**
 * Evaluate JSONPath query _expression_ against _data_ and return an array of matched nodes.
 *
 * @deprecated Use {@link find} instead.
 */
export function query(expression: string, data: JSONLike): JSONPathNode[] {
  return DEFAULT_ENVIRONMENT.query(expression, data);
}

/**
 * Evaluate JSONPath query _expression_ against _data_ and generate nodes lazily.
 *
 * @deprecated Use {@link findIter} instead.
 */
export function lazyQuery(expression: string, data: JSONLike): IterableIterator<JSONPathNode> {
  return DEFAULT_ENVIRONMENT.lazyQuery(expression, data);
}

/**
 * Evaluate JSONPath query _expression_ against _data_ and return an array of values.
 */
export function findAll(expression: string, data: JSONLike): JSONLike[] {
  return DEFAULT_ENVIRONMENT.findAll(expression, data);
}

/**
 * Evaluate JSONPath query _expression_ against _data_ and generate values lazily.
 *
 * Note that some queries will require internal iterators to be materialized into arrays, so
 * peak memory usage might be higher than expected.
 */
export function findAllIter(expression: string, data: JSONLike): IterableIterator<JSONLike> {
  return DEFAULT_ENVIRONMENT.findAllIter(expression, data);
}

/**
 * Evaluate JSONPath query _expression_ against _data_ and return the first matching node,
 * or `undefined` if there were no matches.
 */
export function findOne(expression: string, data: JSONLike): JSONPathNode | undefined {
  return DEFAULT_ENVIRONMENT.findOne(expression, data);
}

/**
 * Evaluate JSONPath query _expression_ against _data_ and return the first matching node,
 * or `undefined` if there were no matches.
 *
 * @deprecated Use {@link findOne} instead.
 */
export function match(expression: string, data: JSONLike): JSONPathNode | undefined {
  return DEFAULT_ENVIRONMENT.match(expression, data);
}

/**
 * Return `true` if JSONPath query _expression_ matches at least one node in `data`, or
 * `false` otherwise.
 */
export function test(expression: string, data: JSONLike): boolean {
  return DEFAULT_ENVIRONMENT.test(expression, data);
}
