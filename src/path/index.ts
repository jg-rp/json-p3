import type { JSONLike } from "../types";
import type { JSONPathQuery } from "./query";

import { JSONPathEnvironment } from "./environment";
import { JSONPathNode, JSONPathNodeList } from "./nodes";

export { JSONPathEnvironment } from "./environment";
export type { JSONPathEnvironmentOptions } from "./environment";

export { JSONPathQuery } from "./query";
export { JSONPathNode, JSONPathNodeList } from "./nodes";

export { NODES_TYPE, VALUE_TYPE, LOGICAL_TYPE, Has, CachingRegexFunction } from "./functions";
export type {
  ExpressionType,
  FilterFunction,
  RegexFunctionOptions,
  HasFilterFunctionOptions,
} from "./functions";

export {
  JSONPathError,
  JSONPathNameError,
  DetailedJSONPathError,
  JSONPathSyntaxError,
  JSONPathTypeError,
  JSONPathRecursionError,
} from "./errors";

export { Nothing } from "./nothing";

export const DEFAULT_ENVIRONMENT = new JSONPathEnvironment();

export function compile(expression: string): JSONPathQuery {
  return DEFAULT_ENVIRONMENT.compile(expression);
}

export function find(expression: string, data: JSONLike): JSONPathNodeList {
  return DEFAULT_ENVIRONMENT.find(expression, data);
}

export function findIter(expression: string, data: JSONLike): IterableIterator<JSONPathNode> {
  return DEFAULT_ENVIRONMENT.findIter(expression, data);
}

/**
 * @deprecated Use {@link find} instead.
 */
export function query(expression: string, data: JSONLike): JSONPathNodeList {
  return DEFAULT_ENVIRONMENT.query(expression, data);
}

/**
 * @deprecated Use {@link findIter} instead.
 */
export function lazyQuery(expression: string, data: JSONLike): IterableIterator<JSONPathNode> {
  return DEFAULT_ENVIRONMENT.lazyQuery(expression, data);
}

export function findAll(expression: string, data: JSONLike): JSONLike[] {
  return DEFAULT_ENVIRONMENT.findAll(expression, data);
}

export function findAllIter(expression: string, data: JSONLike): IterableIterator<JSONLike> {
  return DEFAULT_ENVIRONMENT.findAllIter(expression, data);
}

export function findOne(expression: string, data: JSONLike): JSONPathNode | undefined {
  return DEFAULT_ENVIRONMENT.findOne(expression, data);
}

export function match(expression: string, data: JSONLike): JSONPathNode | undefined {
  return DEFAULT_ENVIRONMENT.match(expression, data);
}

export function test(expression: string, data: JSONLike): boolean {
  return DEFAULT_ENVIRONMENT.test(expression, data);
}
