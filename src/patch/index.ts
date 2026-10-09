import { type JSONValue } from "../types.js";
import { JSONPatch, type OpObject } from "./patch.js";

export { JSONPatch } from "./patch.js";
export { JSONPatchError, JSONPatchTestFailure } from "./errors.js";
export type { OpObject } from "./patch.js";

/**
 * Apply JSON Patch operations to JSON-like data. **Data is modified in place.**
 *
 * @param ops - JSON Patch operations following RFC 6902.
 * @param data - The target JSON-like document to patch.
 * @returns The input object with modifications applied in place, or a different
 * object if the patch replaces the "document root".
 */
export function apply(ops: OpObject[], data: JSONValue): JSONValue {
  return new JSONPatch(ops).apply(data);
}
