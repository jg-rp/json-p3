import { JSONValue, isObject } from "../types";
import { JSONPathEnvironment } from "./environment";

export const Nothing = Symbol.for("jsonpath.nothing");

/**
 * ValueType for JSONPath function expression tye system.
 */
export type JSONPathValue = JSONValue | typeof Nothing;

/**
 * Object passed to FilterExpression.evaluate().
 */
export type FilterContext = {
  environment: JSONPathEnvironment;
  currentValue: JSONValue;
  rootValue: JSONValue;
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
