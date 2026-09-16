import { deepEquals } from "../deep_equals";
import { JSONPointer, UNDEFINED } from "../pointer";
import {
  JSONPointerError,
  JSONPointerResolutionError,
} from "../pointer/errors";
import { JSONValue, isArray, isObject, isString } from "../types";
import { JSONPatchError, JSONPatchTestFailure } from "./errors";

export type OpObject = {
  op: string;
  path: string;
  value?: JSONValue;
  from?: string;
};

/**
 * A JSON Patch operation.
 */
export interface Op {
  /**
   * The patch operation name.
   */
  name: string;

  /**
   * Apply the patch operation to _value_.
   * @param value - The target JSON value.
   */
  apply: (value: JSONValue, index: number) => JSONValue;

  /**
   * A plain object representation of the patch operation.
   */
  toObject: () => OpObject;
}

/**
 * The JSON Patch _add_ operation.
 */
export class OpAdd implements Op {
  public name: string = "add";

  constructor(
    readonly path: JSONPointer,
    readonly value: JSONValue,
  ) {}

  public apply(value: JSONValue, index: number): JSONValue {
    return add(value, this.path, this.value, this.name, index);
  }

  public toObject(): OpObject {
    return { op: this.name, path: this.path.toString(), value: this.value };
  }
}

/**
 * The JSON Patch _remove_ operation.
 */
export class OpRemove implements Op {
  public name: string = "remove";

  constructor(readonly path: JSONPointer) {}

  public apply(value: JSONValue, index: number): JSONValue {
    remove(value, this.path, this.name, index);
    return value;
  }

  public toObject(): OpObject {
    return { op: this.name, path: this.path.toString() };
  }
}

/**
 * The JSON Patch _replace_ operation.
 */
export class OpReplace implements Op {
  name: string = "replace";

  constructor(
    readonly path: JSONPointer,
    readonly value: JSONValue,
  ) {}

  public apply(value: JSONValue, index: number): JSONValue {
    const [parent, obj] = this.path.resolveWithParent(value);
    if (parent === UNDEFINED) {
      // Replace the root object.
      return this.value;
    }

    const target = this.path.tokens.at(-1);
    if (target === undefined) {
      // this should not be possible
      throw new JSONPatchError(
        `unexpected operation on 'undefined' (${this.name}:${index})`,
      );
    }

    if (isArray(parent)) {
      if (obj === UNDEFINED) {
        throw new JSONPatchError(
          `can't replace nonexistent item (${this.name}:${index})`,
        );
      }

      parent.splice(Number(target), 1, this.value);
      return value;
    }

    if (isObject(parent)) {
      if (obj === UNDEFINED) {
        throw new JSONPatchError(
          `can't replace nonexistent property (${this.name}:${index})`,
        );
      }
      parent[target] = this.value;
      return value;
    }

    throw new JSONPatchError(
      `unexpected operation on '${typeof parent}' (${this.name}:${index})`,
    );
  }

  public toObject(): OpObject {
    return { op: this.name, path: this.path.toString(), value: this.value };
  }
}

/**
 * The JSON Patch _move_ operation.
 */
export class OpMove implements Op {
  name: string = "move";

  constructor(
    readonly from: JSONPointer,
    readonly path: JSONPointer,
  ) {}

  public apply(value: JSONValue, index: number): JSONValue {
    if (this.path.isRelativeTo(this.from)) {
      throw new JSONPatchError(
        `can't move object to one of its own children (${this.name}:${index})`,
      );
    }

    const obj = remove(value, this.from, this.name, index);
    return add(value, this.path, obj, this.name, index);
  }

  public toObject(): OpObject {
    return {
      op: this.name,
      from: this.from.toString(),
      path: this.path.toString(),
    };
  }
}

/**
 * The JSON Patch _copy_ operation.
 */
export class OpCopy implements Op {
  name = "copy";

  constructor(
    readonly from: JSONPointer,
    readonly path: JSONPointer,
  ) {}

  public apply(value: JSONValue, index: number): JSONValue {
    const [_, sourceObj] = this.from.resolveWithParent(value);
    if (sourceObj === UNDEFINED) {
      throw new JSONPatchError(
        `source object does not exist (${this.name}:${index})`,
      );
    }

    return add(value, this.path, sourceObj, this.name, index);
  }

  // eslint-disable-next-line sonarjs/no-identical-functions
  public toObject(): OpObject {
    return {
      op: this.name,
      from: this.from.toString(),
      path: this.path.toString(),
    };
  }

  protected deepCopy(value: JSONValue): JSONValue {
    return JSON.parse(JSON.stringify(value));
  }
}

/**
 * The JSON Patch _test_ operation.
 */
export class OpTest implements Op {
  public name: string = "test";

  constructor(
    readonly path: JSONPointer,
    readonly value: JSONValue,
  ) {}

  public apply(value: JSONValue, index: number): JSONValue {
    const [_, obj] = this.path.resolveWithParent(value);
    if (!deepEquals(obj, this.value)) {
      throw new JSONPatchTestFailure(`test failed (${this.name}:${index})`);
    }
    return value;
  }

  public toObject(): OpObject {
    return { op: this.name, path: this.path.toString(), value: this.value };
  }
}

/**
 * Add _value_ to _data_ at _path_.
 *
 * This is semantically the `add` operation, used by `OpAdd`, `OpMove` and
 * `OpCopy`.
 */
function add(
  data: JSONValue,
  path: JSONPointer,
  value: JSONValue,
  opLabel: string,
  opIndex: number,
): JSONValue {
  const [parent, obj] = path.resolveWithParent(data);

  if (parent === UNDEFINED) {
    // Replace the root object.
    return value;
  }

  const target = path.tokens.at(-1);

  if (target === undefined) {
    throw new JSONPatchError(
      `unexpected operation on 'undefined' (${opLabel}:${opIndex})`,
    );
  }

  if (isArray(parent)) {
    if (obj === UNDEFINED) {
      if (!(target === "-" || Number(target) === parent.length)) {
        throw new JSONPatchError(`index out of range (${opLabel}:${opIndex})`);
      }

      parent.push(value);
      return data;
    }

    parent.splice(Number(target), 0, value);
    return data;
  }

  if (isObject(parent)) {
    parent[target] = value;
    return data;
  }

  throw new JSONPatchError(
    `unexpected operation on '${typeof parent}' (${opLabel}:${opIndex})`,
  );
}

/**
 * Remove the element at _path_ from _data_ and return the removed value.
 *
 * This is semantically the `remove` operation used by `OpRemove` and
 * `OpMove`.
 */
function remove(
  data: JSONValue,
  path: JSONPointer,
  opLabel: string,
  opIndex: number,
): JSONValue {
  const [parent, obj] = path.resolveWithParent(data);

  if (parent === UNDEFINED) {
    throw new JSONPatchError(`can't remove root (${opLabel}:${opIndex})`);
  }

  const target = path.tokens.at(-1);

  if (target === undefined) {
    throw new JSONPatchError(
      `unexpected operation on 'undefined' (${opLabel}:${opIndex})`,
    );
  }

  if (isArray(parent)) {
    if (obj === UNDEFINED) {
      throw new JSONPatchError(
        `can't ${opLabel} nonexistent item (${opLabel}:${opIndex})`,
      );
    }
    parent.splice(Number(target), 1);
    return obj;
  }

  if (isObject(parent)) {
    if (obj === UNDEFINED) {
      throw new JSONPatchError(
        `can't ${opLabel} nonexistent property (${opLabel}:${opIndex})`,
      );
    }
    delete parent[target];
    return obj;
  }

  throw new JSONPatchError(
    `unexpected operation on '${typeof parent}' (${opLabel}:${opIndex})`,
  );
}

/**
 *
 */
export class JSONPatch {
  private ops: Op[] = [];

  /**
   *
   * @param ops -
   */
  constructor(ops?: OpObject[]) {
    if (ops) {
      this.build(ops);
    }
  }

  /**
   * @returns an iterator over ops in this patch.
   */
  *[Symbol.iterator](): Iterator<OpObject> {
    for (const op of this.ops) {
      yield op.toObject();
    }
  }

  /**
   *
   * @param path -
   * @param value -
   * @returns
   */
  public add(path: string | JSONPointer, value: JSONValue): this {
    this.ops.push(
      new OpAdd(this.ensurePointer(path, "add", this.ops.length), value),
    );
    return this;
  }

  /**
   *
   * @param path -
   */
  public remove(path: string | JSONPointer): this {
    this.ops.push(
      new OpRemove(this.ensurePointer(path, "remove", this.ops.length)),
    );
    return this;
  }

  /**
   *
   * @param path -
   * @param value -
   * @returns
   */
  public replace(path: string | JSONPointer, value: JSONValue): this {
    this.ops.push(
      new OpReplace(
        this.ensurePointer(path, "replace", this.ops.length),
        value,
      ),
    );
    return this;
  }

  /**
   *
   * @param from -
   * @param path -
   * @returns
   */
  public move(from: string | JSONPointer, path: string | JSONPointer): this {
    this.ops.push(
      new OpMove(
        this.ensurePointer(from, "move", this.ops.length),
        this.ensurePointer(path, "move", this.ops.length),
      ),
    );
    return this;
  }
  /**
   *
   * @param from -
   * @param path -
   * @returns
   */
  public copy(from: string | JSONPointer, path: string | JSONPointer): this {
    this.ops.push(
      new OpCopy(
        this.ensurePointer(from, "copy", this.ops.length),
        this.ensurePointer(path, "copy", this.ops.length),
      ),
    );
    return this;
  }

  /**
   *
   * @param path -
   * @param value -
   * @returns
   */
  public test(path: string | JSONPointer, value: JSONValue): this {
    this.ops.push(
      new OpTest(this.ensurePointer(path, "test", this.ops.length), value),
    );
    return this;
  }

  /**
   *
   * @param value -
   */
  public apply(value: JSONValue): JSONValue {
    let _value = value;
    for (let i = 0; i < this.ops.length; i++) {
      const op = this.ops[i];
      try {
        _value = op.apply(_value, i);
      } catch (error) {
        if (error instanceof JSONPointerResolutionError) {
          throw new JSONPatchError(`${error.message} (${op.name}:${i})`);
        }
        throw error;
      }
    }
    return _value;
  }

  /**
   *
   * @returns
   */
  public toArray(): OpObject[] {
    return this.ops.map((op) => op.toObject());
  }

  protected build(ops: OpObject[]): void {
    for (let i = 0; i < ops.length; i++) {
      const operation = ops[i];
      switch (operation.op) {
        case "add":
          this.add(
            this.opPointer(operation, "path", "add", i),
            this.opValue(operation, "value", "add", i),
          );
          break;
        case "remove":
          this.remove(this.opPointer(operation, "path", "remove", i));
          break;
        case "replace":
          this.replace(
            this.opPointer(operation, "path", "replace", i),
            this.opValue(operation, "value", "replace", i),
          );
          break;
        case "move":
          this.move(
            this.opPointer(operation, "from", "move", i),
            this.opPointer(operation, "path", "move", i),
          );
          break;
        case "copy":
          this.copy(
            this.opPointer(operation, "from", "copy", i),
            this.opPointer(operation, "path", "copy", i),
          );
          break;
        case "test":
          this.test(
            this.opPointer(operation, "path", "test", i),
            this.opValue(operation, "value", "test", i),
          );
          break;
        default:
          throw new JSONPatchError(
            `expected 'op' to be one of 'add', 'remove', 'replace', 'move', 'copy' or 'test' (${operation.op}:${i})`,
          );
      }
    }
  }

  protected opPointer(
    opObj: OpObject,
    key: keyof OpObject,
    op: string,
    index: number,
  ): JSONPointer {
    if (!Object.hasOwn(opObj, key)) {
      throw new JSONPatchError(`missing property '${key}' (${op}:${index})`);
    }

    const p = opObj[key];

    if (!isString(p)) {
      throw new JSONPatchError(
        `expected a JSON Pointer string for '${key}', found ${typeof p} (${op}:${index})`,
      );
    }

    try {
      return new JSONPointer(p);
    } catch (error) {
      if (error instanceof JSONPointerError) {
        throw new JSONPatchError(`${error.message} (${op}:${index})`);
      }
      throw error;
    }
  }

  protected opValue(
    opObj: OpObject,
    key: keyof OpObject,
    op: string,
    index: number,
  ): JSONValue {
    if (!Object.hasOwn(opObj, key)) {
      throw new JSONPatchError(`missing property '${key}' (${op}:${index})`);
    }

    return opObj[key];
  }

  protected ensurePointer(
    p: JSONPointer | string,
    op: string,
    index: number,
  ): JSONPointer {
    if (p instanceof JSONPointer) {
      return p;
    }

    if (!isString(p)) {
      throw new JSONPatchError(
        `expected a JSON Pointer string, found ${typeof p} (${op}:${index})`,
      );
    }

    try {
      return new JSONPointer(p);
    } catch (error) {
      if (error instanceof JSONPointerError) {
        throw new JSONPatchError(`${error.message} (${op}:${index})`);
      }
      throw error;
    }
  }
}
