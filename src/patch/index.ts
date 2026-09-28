import { type JSONLike } from "../types";
import { JSONPatch, type OpObject } from "./patch";

export { JSONPatch } from "./patch";
export { JSONPatchError, JSONPatchTestFailure } from "./errors";
export type { OpObject } from "./patch";

/**
 * Apply JSON Patch operations `ops` to JSON-like data.
 * @param ops - JSON Patch operations following RFC 6902.
 * @param data - The target JSON-like document to patch.
 */
export function apply(ops: OpObject[], data: JSONLike): JSONLike {
  return new JSONPatch(ops).apply(data);
}
