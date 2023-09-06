import { JSONPathEnvironment } from "./environment";

export const Nothing = Symbol.for("jsonpath.nothing");

// NOTE: tentatively including `undefined`
//   for example [{ d: "e" }, { a: "c", d: "f" }] has the type
//   ({ d: string; a?: undefined; } | { a: string; d: string; })[]
export type JSONValue =
  | string
  | number
  | null
  | undefined
  | boolean
  | JSONValue[]
  | { [key: string]: JSONValue };

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
 * A type predicate for the Array object.
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * A type predicate for object.
 */
export function isObject(value: unknown): value is object {
  const _type = typeof value;
  return (value !== null && _type === "object") || _type === "function"
    ? true
    : false;
}

/**
 * A type predicate for an object with a string property.
 */
export function hasStringKey(
  value: unknown,
  key: string,
): value is { [key: string]: unknown } {
  return isObject(value) && Object.hasOwn(value, key);
}

/**
 * A type predicate for a string primitive.
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * A type predicate for a number primitive.
 */
export function isNumber(value: unknown): value is string {
  return typeof value === "number";
}
