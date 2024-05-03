import { JSONValue } from "../types";
import { JSONPathEnvironment } from "./environment";
import { JSONPathNode, JSONPathNodeList } from "./node";
import { JSONPath } from "./path";

export { JSONPathEnvironment } from "./environment";
export type { JSONPathEnvironmentOptions } from "./environment";

export { JSONPath } from "./path";
export { JSONPathNodeList, JSONPathNode } from "./node";
export { Token, TokenKind } from "./token";

export * as selectors from "./selectors";
export * as expressions from "./expression";
export * as functions from "./functions";

export { FunctionExpressionType } from "./functions";
export type { FilterFunction } from "./functions";

export {
  JSONPathError,
  JSONPathIndexError,
  JSONPathLexerError,
  JSONPathSyntaxError,
  JSONPathTypeError,
  JSONPathRecursionLimitError,
} from "./errors";

export { Nothing, KEY_MARK } from "./types";
export type { JSONPathValue, FilterContext } from "./types";

export const DEFAULT_ENVIRONMENT = new JSONPathEnvironment();

/**
 * Query JSON value _value_ with JSONPath expression _path_.
 * @param path - A JSONPath expression/query.
 * @param value - The JSON-like value the JSONPath query is applied to.
 * @returns A list of JSONPathNode objects, one for each value matched
 *  by _path_ in _value_.
 *
 * @throws {@link JSONPathSyntaxError}
 * If the path does not conform to standard syntax.
 *
 * @throws {@link JSONPathTypeError}
 * If filter function arguments are invalid, or filter expression are
 * used in an invalid way.
 */
export function query(path: string, value: JSONValue): JSONPathNodeList {
  return DEFAULT_ENVIRONMENT.query(path, value);
}

/**
 * Lazily query JSON value _value_ with JSONPath expression _path_.
 * Lazy queries can be faster and more memory efficient when querying
 * large datasets, especially when using recursive decent selectors.
 *
 * @param path - A JSONPath expression/query.
 * @param value - The JSON-like value the JSONPath query is applied to.
 * @returns A sequence of {@link JSONPathNode} objects resulting from
 * applying _path_ to _value_.
 *
 * @throws {@link JSONPathSyntaxError}
 * If the path does not conform to standard syntax.
 *
 * @throws {@link JSONPathTypeError}
 * If filter function arguments are invalid, or filter expression are
 * used in an invalid way.
 */
export function lazyQuery(
  path: string,
  value: JSONValue,
): IterableIterator<JSONPathNode> {
  return DEFAULT_ENVIRONMENT.lazyQuery(path, value);
}

/**
 * Compile JSONPath _path_ for later use.
 * @param path - A JSONPath expression/query.
 * @returns A path object with a `query()` method.
 *
 * @throws {@link JSONPathSyntaxError}
 * If the path does not conform to standard syntax.
 *
 * @throws {@link JSONPathTypeError}
 * If filter function arguments are invalid, or filter expression are
 * used in an invalid way.
 */
export function compile(path: string): JSONPath {
  return DEFAULT_ENVIRONMENT.compile(path);
}

/**
 * Return a {@link JSONPathNode} instance for the first object found in
 * _value_ matching _path_.
 *
 * @param path - A JSONPath query.
 * @param value - JSON-like data to which the query _path_ will be applied.
 * @returns The first node in _value_ matching  _path_, or `undefined` if
 * there are no matches.
 */
export function match(
  path: string,
  value: JSONValue,
): JSONPathNode | undefined {
  return DEFAULT_ENVIRONMENT.match(path, value);
}
