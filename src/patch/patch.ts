import { deepEquals } from "../deep_equals";
import { JSONPointer, UNDEFINED } from "../pointer";
import { JSONPointerError, JSONPointerResolutionError } from "../pointer/errors";
import { type JSONLike, isArray, isPlainObject, isString } from "../types";
import { JSONPatchError, JSONPatchTestFailure } from "./errors";

export type OpObject = {
  op: string;
  path: string;
  value?: JSONLike;
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
  apply: (value: JSONLike, index: number) => JSONLike;

  /**
   * A plain object representation of the patch operation.
   */
  toObject: () => OpObject;
}

/**
 * The JSON Patch _add_ operation.
 */
export class OpAdd implements Op {
  name = "add" as const;

  constructor(
    readonly path: JSONPointer,
    readonly value: JSONLike,
  ) {}

  apply(value: JSONLike, index: number): JSONLike {
    return add(value, this.path, this.value, this.name, index);
  }

  toObject(): OpObject {
    return { op: this.name, path: this.path.toString(), value: this.value };
  }
}

/**
 * The JSON Patch _remove_ operation.
 */
export class OpRemove implements Op {
  name = "remove" as const;

  constructor(readonly path: JSONPointer) {}

  apply(value: JSONLike, index: number): JSONLike {
    remove(value, this.path, this.name, index);
    return value;
  }

  toObject(): OpObject {
    return { op: this.name, path: this.path.toString() };
  }
}

/**
 * The JSON Patch _replace_ operation.
 */
export class OpReplace implements Op {
  name = "replace" as const;

  constructor(
    readonly path: JSONPointer,
    readonly value: JSONLike,
  ) {}

  apply(value: JSONLike, index: number): JSONLike {
    const [parent, obj] = this.path.resolveWithParent(value);
    if (parent === UNDEFINED) {
      // Replace the root object.
      return this.value;
    }

    const target = this.path.tokens.at(-1);
    if (target === undefined) {
      // this should not be possible
      throw new JSONPatchError(`unexpected operation on 'undefined' (${this.name}:${index})`);
    }

    if (isArray(parent)) {
      if (obj === UNDEFINED) {
        throw new JSONPatchError(`can't replace nonexistent item (${this.name}:${index})`);
      }

      parent.splice(Number(target), 1, this.value);
      return value;
    }

    if (isPlainObject(parent)) {
      if (obj === UNDEFINED) {
        throw new JSONPatchError(`can't replace nonexistent property (${this.name}:${index})`);
      }
      parent[target] = this.value;
      return value;
    }

    throw new JSONPatchError(`unexpected operation on '${typeof parent}' (${this.name}:${index})`);
  }

  toObject(): OpObject {
    return { op: this.name, path: this.path.toString(), value: this.value };
  }
}

/**
 * The JSON Patch _move_ operation.
 */
export class OpMove implements Op {
  name = "move" as const;

  constructor(
    readonly from: JSONPointer,
    readonly path: JSONPointer,
  ) {}

  apply(value: JSONLike, index: number): JSONLike {
    if (this.path.isRelativeTo(this.from)) {
      throw new JSONPatchError(
        `can't move object to one of its own children (${this.name}:${index})`,
      );
    }

    const obj = remove(value, this.from, this.name, index);
    return add(value, this.path, obj, this.name, index);
  }

  toObject(): OpObject {
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
  name = "copy" as const;

  constructor(
    readonly from: JSONPointer,
    readonly path: JSONPointer,
  ) {}

  apply(value: JSONLike, index: number): JSONLike {
    const [_, sourceObj] = this.from.resolveWithParent(value);
    if (sourceObj === UNDEFINED) {
      throw new JSONPatchError(`source object does not exist (${this.name}:${index})`);
    }

    return add(value, this.path, sourceObj, this.name, index);
  }

  toObject(): OpObject {
    return {
      op: this.name,
      from: this.from.toString(),
      path: this.path.toString(),
    };
  }

  protected deepCopy(value: JSONLike): JSONLike {
    return JSON.parse(JSON.stringify(value));
  }
}

/**
 * The JSON Patch _test_ operation.
 */
export class OpTest implements Op {
  name = "test" as const;

  constructor(
    readonly path: JSONPointer,
    readonly value: JSONLike,
  ) {}

  apply(value: JSONLike, index: number): JSONLike {
    const [_, obj] = this.path.resolveWithParent(value);
    if (!deepEquals(obj, this.value)) {
      throw new JSONPatchTestFailure(`test failed (${this.name}:${index})`);
    }
    return value;
  }

  toObject(): OpObject {
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
  data: JSONLike,
  path: JSONPointer,
  value: JSONLike,
  opLabel: string,
  opIndex: number,
): JSONLike {
  const [parent, obj] = path.resolveWithParent(data);

  if (parent === UNDEFINED) {
    // Replace the root object.
    return value;
  }

  const target = path.tokens.at(-1);

  if (target === undefined) {
    throw new JSONPatchError(`unexpected operation on 'undefined' (${opLabel}:${opIndex})`);
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

  if (isPlainObject(parent)) {
    parent[target] = value;
    return data;
  }

  throw new JSONPatchError(`unexpected operation on '${typeof parent}' (${opLabel}:${opIndex})`);
}

/**
 * Remove the element at _path_ from _data_ and return the removed value.
 *
 * This is semantically the `remove` operation used by `OpRemove` and
 * `OpMove`.
 */
function remove(data: JSONLike, path: JSONPointer, opLabel: string, opIndex: number): JSONLike {
  const [parent, obj] = path.resolveWithParent(data);

  if (parent === UNDEFINED) {
    throw new JSONPatchError(`can't remove root (${opLabel}:${opIndex})`);
  }

  const target = path.tokens.at(-1);

  if (target === undefined) {
    throw new JSONPatchError(`unexpected operation on 'undefined' (${opLabel}:${opIndex})`);
  }

  if (isArray(parent)) {
    if (obj === UNDEFINED) {
      throw new JSONPatchError(`can't ${opLabel} nonexistent item (${opLabel}:${opIndex})`);
    }
    parent.splice(Number(target), 1);
    return obj;
  }

  if (isPlainObject(parent)) {
    if (obj === UNDEFINED) {
      throw new JSONPatchError(`can't ${opLabel} nonexistent property (${opLabel}:${opIndex})`);
    }
    delete parent[target];
    return obj;
  }

  throw new JSONPatchError(`unexpected operation on '${typeof parent}' (${opLabel}:${opIndex})`);
}

export class JSONPatch {
  private ops: Op[] = [];

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

  add(path: string | JSONPointer, value: JSONLike): this {
    this.ops.push(new OpAdd(this.ensurePointer(path, "add", this.ops.length), value));
    return this;
  }

  remove(path: string | JSONPointer): this {
    this.ops.push(new OpRemove(this.ensurePointer(path, "remove", this.ops.length)));
    return this;
  }

  replace(path: string | JSONPointer, value: JSONLike): this {
    this.ops.push(new OpReplace(this.ensurePointer(path, "replace", this.ops.length), value));
    return this;
  }

  move(from: string | JSONPointer, path: string | JSONPointer): this {
    this.ops.push(
      new OpMove(
        this.ensurePointer(from, "move", this.ops.length),
        this.ensurePointer(path, "move", this.ops.length),
      ),
    );
    return this;
  }

  copy(from: string | JSONPointer, path: string | JSONPointer): this {
    this.ops.push(
      new OpCopy(
        this.ensurePointer(from, "copy", this.ops.length),
        this.ensurePointer(path, "copy", this.ops.length),
      ),
    );
    return this;
  }

  test(path: string | JSONPointer, value: JSONLike): this {
    this.ops.push(new OpTest(this.ensurePointer(path, "test", this.ops.length), value));
    return this;
  }

  apply(value: JSONLike): JSONLike {
    let result = value;

    for (let i = 0; i < this.ops.length; i++) {
      const op = this.ops[i]!;
      try {
        result = op.apply(result, i);
      } catch (error) {
        if (error instanceof JSONPointerResolutionError) {
          throw new JSONPatchError(`${error.message} (${op.name}:${i})`);
        }
        throw error;
      }
    }
    return result;
  }

  toArray(): OpObject[] {
    return this.ops.map((op) => op.toObject());
  }

  protected build(ops: OpObject[]): void {
    for (let i = 0; i < ops.length; i++) {
      const operation = ops[i]!;
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

    const p = opObj[key]!;

    if (!isString(p)) {
      throw new JSONPatchError(
        `expected a JSON Pointer string for '${key}', found ${typeof p} (${op}:${index})`,
      );
    }

    try {
      return JSONPointer.fromString(p);
    } catch (error) {
      if (error instanceof JSONPointerError) {
        throw new JSONPatchError(`${error.message} (${op}:${index})`);
      }
      throw error;
    }
  }

  protected opValue(opObj: OpObject, key: keyof OpObject, op: string, index: number): JSONLike {
    if (!Object.hasOwn(opObj, key)) {
      throw new JSONPatchError(`missing property '${key}' (${op}:${index})`);
    }

    return opObj[key];
  }

  protected ensurePointer(p: JSONPointer | string, op: string, index: number): JSONPointer {
    if (p instanceof JSONPointer) {
      return p;
    }

    if (!isString(p)) {
      throw new JSONPatchError(
        `expected a JSON Pointer string, found ${typeof p} (${op}:${index})`,
      );
    }

    try {
      return JSONPointer.fromString(p);
    } catch (error) {
      if (error instanceof JSONPointerError) {
        throw new JSONPatchError(`${error.message} (${op}:${index})`);
      }
      throw error;
    }
  }
}
