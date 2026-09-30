import { type JSONLike } from "../types";
import { JSONPatch, type OpObject } from "./patch";

export { JSONPatch } from "./patch";
export { JSONPatchError, JSONPatchTestFailure } from "./errors";
export type { OpObject } from "./patch";

/**
 * Apply JSON Patch operations to JSON-like data. **Data is modified in place.**
 *
 * @param ops - JSON Patch operations following RFC 6902.
 * @param data - The target JSON-like document to patch.
 * @returns The input object with modifications applied in place, or a different
 * object if the patch replaces the "document root".
 */
export function apply(ops: OpObject[], data: JSONLike): JSONLike {
  return new JSONPatch(ops).apply(data);
}
