export const version = "__VERSION__";

export * as jsonpath from "./path";
export {
  FunctionExpressionType,
  JSONPath,
  JSONPathEnvironment,
  JSONPathError,
  JSONPathIndexError,
  JSONPathLexerError,
  JSONPathNode,
  JSONPathNodeList,
  JSONPathSyntaxError,
  JSONPathTypeError,
  Token,
  TokenKind,
  Nothing,
  query,
  compile,
} from "./path";
export type { JSONPathEnvironmentOptions, FilterFunction } from "./path";

export * as jsonpointer from "./pointer";
export { JSONPointer, resolve, UNDEFINED } from "./pointer";

export * as jsonpatch from "./patch";
export {
  JSONPatch,
  JSONPatchError,
  JSONPatchTestFailure,
  apply,
} from "./patch";
export type { OpObject } from "./patch";

export type { JSONValue } from "./types";
