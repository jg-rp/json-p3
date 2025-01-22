import { JSONValue, isObject } from "../types";
import { JSONPathEnvironment } from "./environment";

export const Nothing = Symbol.for("jsonpath.nothing");

/**
 * ValueType for JSONPath function expression tye system.
 */
export type JSONPathValue = JSONValue | typeof Nothing;

/**
 * Object passed to `FilterExpression.evaluate()`.
 */
export type FilterContext = {
  environment: JSONPathEnvironment;
  currentValue: JSONValue;
  rootValue: JSONValue;
  lazy?: boolean;
  currentKey?: string | number;
};

/**
 * A type predicate for an object with a string property.
 */
export function hasStringKey(
  value: unknown,
  key: string,
): value is { [key: string]: unknown } {
  return isObject(value) && Object.hasOwn(value, key);
}

export const KEY_MARK = "\x02";

/**
 * Options for serializing paths.
 */
export type SerializationOptions = {
  /**
   * `pretty` paths always use:
   *  - shorthand notation rather than dot notation where possible
   *  - double quotes rather than single quotes for string literals and where shorthand
   *    notation is not possible
   *  - short escape sequences for common non-printing characters such as `\n` and `\t`
   *
   * `canonical` paths always use:
   *  - bracket notation for name and wildcard selectors
   *  - single quotes for name selectors and string literals
   *  - short escape sequences for common non-printing characters such as `\n` and `\t`
   *
   * `canonical` paths will produce a normalized path where available, but cannot be
   * considered normalized paths if the query does not represent a singular, absolute node.
   */
  form: "pretty" | "canonical";
};

export const defaultSerializationOptions: SerializationOptions = {
  form: "pretty",
};
