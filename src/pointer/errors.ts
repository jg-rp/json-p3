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

export class JSONPointerIndexError extends JSONPointerError {
  constructor(readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "JSONPointerIndexError";
  }
}

export class JSONPointerKeyError extends JSONPointerError {
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

export class JSONPointerTypeError extends JSONPointerError {
  constructor(readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "JSONPointerTypeError";
  }
}
