/**
 * A JSON-like value, as you'd get from `JSON.parse()`.
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
 * A type predicate for object.
 */
export function isPlainObject(value: unknown): value is object {
  return typeof value === "object" && value !== null && !isArray(value);
}

/**
 * A type predicate for an object with a string property.
 */
export function hasStringKey(value: unknown, key: string): value is { [key: string]: unknown } {
  return isPlainObject(value) && Object.hasOwn(value, key);
}

/**
 * A type predicate for the Array object.
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
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
