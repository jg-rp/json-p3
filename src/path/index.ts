import { JSONPathEnvironment } from "./environment";

export { JSONPathEnvironment } from "./environment";
export type { JSONPathEnvironmentOptions } from "./environment";

export { JSONPath } from "./path";
export { JSONPathNodeList, JSONPathNode } from "./node";
export { Token, TokenKind } from "./token";

export * as selectors from "./selectors";
export * as expressions from "./expression";
export * as functions from "./functions";

export {
  JSONPathError,
  JSONPathIndexError,
  JSONPathLexerError,
  JSONPathSyntaxError,
  JSONPathTypeError,
} from "./errors";

export { Nothing } from "./types";
export type { JSONPathValue, FilterContext } from "./types";

export const DEFAULT_ENVIRONMENT = new JSONPathEnvironment();
// TODO: document or wrap convenience functions
export const query = DEFAULT_ENVIRONMENT.query.bind(DEFAULT_ENVIRONMENT);
export const compile = DEFAULT_ENVIRONMENT.compile.bind(DEFAULT_ENVIRONMENT);
export default query;
