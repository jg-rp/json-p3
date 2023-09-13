import { JSONValue } from "../types";
import { JSONPointer, MaybeJSONValue, UNDEFINED } from "./pointer";

export { JSONPointer, RelativeJSONPointer, UNDEFINED } from "./pointer";
export type { MaybeJSONValue } from "./pointer";

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
 * @param value - The target JSON-like value, possibly loaded using
 *  `JSON.parse()`.
 * @param fallback - A default value to return if _value_ has no
 *   path matching `pointer`.
 * @returns The value identified by _pointer_ or, if given, the fallback
 *   value in the even of a `JSONPointerResolutionError`.
 *
 * @throws {@link JSONPointerResolutionError}
 * If the value pointed to by _pointer_ does not exist in _value_, and
 * no fallback value is given.
 *
 * @throws {@link JSONPointerSyntaxError}
 * If _pointer_ is malformed according to RFC 6901.
 */
export function resolve(
  pointer: string,
  value: JSONValue,
  fallback: MaybeJSONValue = UNDEFINED,
): JSONValue {
  return new JSONPointer(pointer).resolve(value, fallback);
}
