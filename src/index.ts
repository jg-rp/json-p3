export * as jsonpath from "./path";

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
} from "./path";

export type { FilterFunction, ExpressionType, JSONPathEnvironmentOptions } from "./path";

export { JSONPathNode, JSONPathNodeList } from "./path";

export type { JSONLike } from "./types";

export * as jsonpointer from "./pointer";
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
} from "./pointer";

export * as jsonpatch from "./patch";
export { JSONPatch, JSONPatchError, JSONPatchTestFailure, apply } from "./patch";
export type { OpObject } from "./patch";
