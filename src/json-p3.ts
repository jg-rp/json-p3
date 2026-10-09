export const version = process.env.PACKAGE_VERSION;

export * as jsonpath from "./path/index.js";

export {
  DEFAULT_ENVIRONMENT,
  NODES_TYPE,
  VALUE_TYPE,
  LOGICAL_TYPE,
  DetailedJSONPathError,
  JSONPathError,
  JSONPathEnvironment,
  JSONPathNameError,
  JSONPathSyntaxError,
  JSONPathTypeError,
  JSONPathQuery,
  compile,
  find,
  findIter,
  query,
  lazyQuery,
  findAll,
  findAllIter,
  findOne,
  match,
  test,
} from "./path/index.js";

export type { FilterFunction, ExpressionType, JSONPathEnvironmentOptions } from "./path/index.js";

export { JSONPathNode } from "./path/index.js";

export type { JSONValue } from "./types.js";

export * as jsonpointer from "./pointer/index.js";
export {
  JSONPointer,
  RelativeJSONPointer,
  resolve,
  UNDEFINED,
  JSONPointerError,
  JSONPointerIndexError,
  JSONPointerKeyError,
  JSONPointerResolutionError,
  JSONPointerSyntaxError,
  JSONPointerTypeError,
} from "./pointer/index.js";

export * as jsonpatch from "./patch/index.js";
export { JSONPatch, JSONPatchError, JSONPatchTestFailure, apply } from "./patch/index.js";
export type { OpObject } from "./patch/index.js";
