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

export class JSONPointerResolutionError extends JSONPointerError {
  constructor(readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "JSONPointerResolutionError";
  }
}

export class JSONPointerIndexError extends JSONPointerResolutionError {
  constructor(readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "JSONPointerIndexError";
  }
}

export class JSONPointerKeyError extends JSONPointerResolutionError {
  constructor(readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "JSONPointerKeyError";
  }
}

export class JSONPointerSyntaxError extends JSONPointerError {
  constructor(readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "JSONPointerSyntaxError";
  }
}

export class JSONPointerTypeError extends JSONPointerResolutionError {
  constructor(readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "JSONPointerTypeError";
  }
}
