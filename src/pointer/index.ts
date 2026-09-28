import type { JSONLike } from "../types";

import { JSONPointer, UNDEFINED } from "./pointer";

export { JSONPointer, UNDEFINED, RelativeJSONPointer } from "./pointer";

export {
  JSONPointerError,
  JSONPointerResolutionError,
  JSONPointerIndexError,
  JSONPointerKeyError,
  JSONPointerSyntaxError,
  JSONPointerTypeError,
} from "./errors";

/**
 * Resolve JSON Pointer _pointer_ against JSON-like data _value_.
 *
 * @param pointer - A string representation of a JSON pointer.
 *
 * @param data - The target JSON-like value, as you would get from `JSON.parse()`.
 *
 * @param fallback - A default value to return if `pointer` can not be resolved
 *   against `data`.
 *
 * @returns The value identified by `pointer` or, if given, the fallback
 *   value in the event of a `JSONPointerResolutionError`.
 *
 * @throws {@link JSONPointerResolutionError} If the pointer can not be resolved
 * and no fallback is given.
 *
 * @throws {@link JSONPointerSyntaxError} If _pointer_ is malformed according to RFC 6901.
 */
export function resolve(
  pointer: string,
  data: JSONLike,
  fallback: JSONLike | typeof UNDEFINED = UNDEFINED,
): JSONLike {
  return JSONPointer.fromString(pointer).resolve(data, fallback);
}
