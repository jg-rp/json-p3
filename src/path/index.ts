export { JSONPathEnvironment } from "./environment";
export { JSONPath } from "./path";
export { JSONPathNodeList, JSONPathNode } from "./node";
export { Token, TokenKind } from "./token";
export {
  JSONPathError,
  JSONPathIndexError,
  JSONPathLexerError,
  JSONPathSyntaxError,
  JSONPathTypeError,
} from "./errors";

export { Nothing } from "./types";
export type { JSONValue, JSONPathValue, FilterContext } from "./types";

// TODO: review exports
// TODO: convenience functions
