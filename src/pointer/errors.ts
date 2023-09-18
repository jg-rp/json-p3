/**
 * Base class for all JSON Pointer errors.
 */
export class JSONPointerError extends Error {
  constructor(readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "JSONPointerError";
  }
}

/**
 * Base class for JSON Pointer resolution errors.
 */
export class JSONPointerResolutionError extends JSONPointerError {
  constructor(readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "JSONPointerResolutionError";
  }
}

/**
 * Error thrown due to an out of range index when resolving a JSON Pointer.
 */
export class JSONPointerIndexError extends JSONPointerResolutionError {
  constructor(readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "JSONPointerIndexError";
  }
}

/**
 * Error thrown due to a missing property when resolving a JSON Pointer.
 */
export class JSONPointerKeyError extends JSONPointerResolutionError {
  constructor(readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "JSONPointerKeyError";
  }
}

/**
 * Error thrown due to invalid JSON Pointer syntax.
 */
export class JSONPointerSyntaxError extends JSONPointerError {
  constructor(readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "JSONPointerSyntaxError";
  }
}

/**
 * Error thrown when trying to resolve a property or index against a primitive value.
 */
export class JSONPointerTypeError extends JSONPointerResolutionError {
  constructor(readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "JSONPointerTypeError";
  }
}
