/**
 * Deep equality of JSON-like values.
 *
 * No attempt is made to handle function objects, recursive data
 * structures, NaNs, sparse arrays, primitive wrapper objects....
 *
 * We're not using JSON.stringify because we want objects with the same
 * entries in a different order to compare equal.
 */

import { isObject } from "./types";

// eslint-disable-next-line sonarjs/cognitive-complexity
export function deepEquals(a: unknown, b: unknown): boolean {
  if (a === b) {
    return true;
  }

  if (Array.isArray(a)) {
    if (Array.isArray(b)) {
      if (a.length !== b.length) {
        return false;
      }
      for (let i = 0; i < a.length; i++) {
        if (!deepEquals(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    return false;
  } else if (isObject(a) && isObject(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (const key of keysA) {
      if (!deepEquals(a[key as keyof typeof a], b[key as keyof typeof b])) {
        return false;
      }
    }

    return true;
  }

  return false;
}
