import { Token } from "./token";

/**
 * Base class for all JSONPath errors.
 */
export class JSONPathError extends Error {
  constructor(
    readonly message: string,
    readonly token: Token,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "JSONPathError";
    this.message = withErrorContext(message, token);
  }
}

function withErrorContext(message: string, token: Token): string {
  if (token.input.length <= 9) {
    return `${message} ('${token.input}':${token.index})`;
  }

  if (token.index > token.input.length - 5) {
    return `${message} ('${token.input.slice(token.input.length - 9)}':${
      token.index
    })`;
  }

  if (token.index - 4 < 0) {
    return `${message} ('${token.input.slice(0, 9)}':${token.index})`;
  }

  return `${message} ('${token.input.slice(
    token.index - 4,
    token.index + 5,
  )}':${token.index})`;
}

/**
 * Error thrown due to unexpected, internal path tokenization problems.
 */
export class JSONPathLexerError extends JSONPathError {
  constructor(
    readonly message: string,
    readonly token: Token,
  ) {
    super(message, token);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "JSONPathLexerError";
    this.message = withErrorContext(message, token);
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
    super(message, token);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "JSONPathTypeError";
    this.message = withErrorContext(message, token);
  }
}

/**
 * Error thrown due to out of range indices.
 */
export class JSONPathIndexError extends JSONPathError {
  constructor(
    readonly message: string,
    readonly token: Token,
  ) {
    super(message, token);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "JSONPathIndexError";
    this.message = withErrorContext(message, token);
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
    super(message, token);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "UndefinedFilterFunctionError";
    this.message = withErrorContext(message, token);
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
    super(message, token);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "JSONPathSyntaxError";
    this.message = withErrorContext(message, token);
  }
}
