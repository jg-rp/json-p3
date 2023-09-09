/**
 * Base class for all JSON Patch errors.
 */
export class JSONPatchError extends Error {
  constructor(readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "JSONPatchError";
  }
}

export class JSONPatchTestFailure extends JSONPatchError {
  constructor(readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "JSONPatchTestFailure";
  }
}
