import { JSONPathEnvironment } from "./environment";

export const Nothing = Symbol.for("jsonpath.nothing");

export type JSONValue =
  | string
  | number
  | null
  | boolean
  | JSONValue[]
  | { [key: string]: JSONValue };

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

export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function isNumber(value: unknown): value is string {
  return typeof value === "number";
}
