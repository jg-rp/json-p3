import { Token } from "./token";

/**
 * Base class for all JSONPath errors.
 */
export class JSONPathError extends Error {
  constructor(readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "JSONPathError";
  }
}

/**
 * Error thrown due to unexpected, internal path tokenization problems.
 */
export class JSONPathLexerError extends JSONPathError {
  constructor(readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "JSONPathLexerError";
  }
}

/**
 * Error thrown due to type errors when evaluating filter expressions.
 */
export class JSONPathTypeError extends JSONPathError {
  constructor(
    readonly message: string,
    readonly token: Token,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "JSONPathTypeError";
  }
}

/**
 * Error thrown when attempting to retrieve a filter function that has not
 * been registered.
 */
export class UndefinedFilterFunctionError extends JSONPathError {
  constructor(
    readonly message: string,
    readonly token: Token,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "UndefinedFilterFunctionError";
  }
}

/**
 * Error thrown due to syntax errors found during parsing a JSONPath query.
 */
export class JSONPathSyntaxError extends JSONPathError {
  constructor(
    readonly message: string,
    readonly token: Token,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "JSONPathSyntaxError";
  }
}
