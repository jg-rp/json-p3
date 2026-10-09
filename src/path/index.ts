import type { JSONValue } from "../types.js";
import type { JSONPathQuery } from "./query.js";

import { JSONPathEnvironment } from "./environment.js";
import { JSONPathNode } from "./nodes.js";

export { JSONPathEnvironment } from "./environment.js";
export type { JSONPathEnvironmentOptions } from "./environment.js";

export { JSONPathQuery } from "./query.js";
export { JSONPathNode } from "./nodes.js";

export { NODES_TYPE, VALUE_TYPE, LOGICAL_TYPE, Has, CachingRegexFunction } from "./functions.js";
export type {
  ExpressionType,
  FilterFunction,
  RegexFunctionOptions,
  HasFilterFunctionOptions,
} from "./functions.js";

export * as functions from "./functions.js";

export {
  type Diagnostic,
  JSONPathError,
  JSONPathNameError,
  DetailedJSONPathError,
  JSONPathSyntaxError,
  JSONPathTypeError,
  JSONPathRecursionError,
} from "./errors.js";

export { Nothing } from "./nothing.js";

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
export function find(expression: string, data: JSONValue): JSONPathNode[] {
  return DEFAULT_ENVIRONMENT.find(expression, data);
}

/**
 * Evaluate JSONPath query _expression_ against _data_ and return an array of matched nodes.
 */
export function findIter(expression: string, data: JSONValue): IterableIterator<JSONPathNode> {
  return DEFAULT_ENVIRONMENT.findIter(expression, data);
}

/**
 * Evaluate JSONPath query _expression_ against _data_ and return an array of matched nodes.
 *
 * @deprecated Use {@link find} instead.
 */
export function query(expression: string, data: JSONValue): JSONPathNode[] {
  return DEFAULT_ENVIRONMENT.query(expression, data);
}

/**
 * Evaluate JSONPath query _expression_ against _data_ and generate nodes lazily.
 *
 * @deprecated Use {@link findIter} instead.
 */
export function lazyQuery(expression: string, data: JSONValue): IterableIterator<JSONPathNode> {
  return DEFAULT_ENVIRONMENT.lazyQuery(expression, data);
}

/**
 * Evaluate JSONPath query _expression_ against _data_ and return an array of values.
 */
export function findAll(expression: string, data: JSONValue): JSONValue[] {
  return DEFAULT_ENVIRONMENT.findAll(expression, data);
}

/**
 * Evaluate JSONPath query _expression_ against _data_ and generate values lazily.
 *
 * Note that some queries will require internal iterators to be materialized into arrays, so
 * peak memory usage might be higher than expected.
 */
export function findAllIter(expression: string, data: JSONValue): IterableIterator<JSONValue> {
  return DEFAULT_ENVIRONMENT.findAllIter(expression, data);
}

/**
 * Evaluate JSONPath query _expression_ against _data_ and return the first matching node,
 * or `undefined` if there were no matches.
 */
export function findOne(expression: string, data: JSONValue): JSONPathNode | undefined {
  return DEFAULT_ENVIRONMENT.findOne(expression, data);
}

/**
 * Evaluate JSONPath query _expression_ against _data_ and return the first matching node,
 * or `undefined` if there were no matches.
 *
 * @deprecated Use {@link findOne} instead.
 */
export function match(expression: string, data: JSONValue): JSONPathNode | undefined {
  return DEFAULT_ENVIRONMENT.match(expression, data);
}

/**
 * Return `true` if JSONPath query _expression_ matches at least one node in `data`, or
 * `false` otherwise.
 */
export function test(expression: string, data: JSONValue): boolean {
  return DEFAULT_ENVIRONMENT.test(expression, data);
}
