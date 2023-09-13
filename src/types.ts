/**
 * Common types and type predicates.
 */

/**
 * A JSON-like value.
 */
export type JSONValue =
  | string
  | number
  | null
  | undefined
  | boolean
  | JSONValue[]
  | { [key: string]: JSONValue };

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
 * A type predicate for a string primitive.
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * A type predicate for a number primitive.
 */
export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}
