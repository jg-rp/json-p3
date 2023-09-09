import { JSONValue } from "../types";
import { JSONPatch, OpObject } from "./patch";

export { JSONPatch } from "./patch";
export { JSONPatchError, JSONPatchTestFailure } from "./errors";
export type { OpObject } from "./patch";

/**
 * Apply the JSON Patch _patch_ to JSON-like data _value_.
 * @param ops - JSON Patch operations following RFC 6902.
 * @param value - The target JSON-like document to patch.
 */
export function apply(ops: OpObject[], value: JSONValue): JSONValue {
  return new JSONPatch(ops).apply(value);
}
