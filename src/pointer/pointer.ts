import { isArray, isNumber, isPlainObject, isString, type JSONLike } from "../types";
import {
  JSONPointerError,
  JSONPointerIndexError,
  JSONPointerKeyError,
  JSONPointerResolutionError,
  JSONPointerSyntaxError,
  JSONPointerTypeError,
} from "./errors";

/**
 * The symbol indicating the absence of a JSON value.
 */
export const UNDEFINED = Symbol.for("jsonpointer.undefined");

const RE_RELATIVE_POINTER = /(?<ORIGIN>\d+)(?<INDEX_G>(?<SIGN>[+-])(?<INDEX>\d))?(?<POINTER>.*)/s;

const RE_INT = /(0|[1-9]\d*)/;

// A JSON Pointer evaluation result for a single token.
type Result<E = JSONPointerError> = [JSONLike, null] | [null, E];

export class JSONPointer {
  constructor(readonly tokens: string[]) {}

  /**
   * Return a new JSONPointer given a pointer string following RFC 6901.
   */
  static fromString(pointer: string): JSONPointer {
    if (pointer.length && !pointer.startsWith("/")) {
      throw new JSONPointerSyntaxError("pointers must start with a slash or be the empty string");
    }

    return new JSONPointer(
      pointer
        .split("/")
        .map((token) => token.replaceAll("~1", "/").replaceAll("~0", "~"))
        .slice(1),
    );
  }

  /**
   * Encode tokens into a '/' separated string with '~' and '/' escaped according to RFC 6901.
   *
   * @param tokens - A sequence of property names and array indexes forming a path
   *   through JSON-like data. Numeric tokens should be integers.
   *
   * @returns Tokens encoded according to RFC 6901.
   */
  static encode(tokens: Array<string | number>): string {
    if (!tokens.length) return "";
    return (
      "/" + tokens.map((t) => t.toString().replaceAll("~", "~0").replaceAll("/", "~1")).join("/")
    );
  }

  toString(): string {
    return JSONPointer.encode(this.tokens);
  }

  /**
   * Evaluate this pointer against `data`.
   *
   * @param data - The target JSON-like value, as you might get from `JSON.parse()`.
   *
   * @param fallback - A default value to return if this pointer can not be resolved
   *   against `data`.
   *
   * @returns The JSON-like value obtained by evaluating this pointer against `data`.
   *
   * @throws {@link JSONPointerResolutionError} If the pointer can not be resolved and
   * no fallback is given.
   */
  resolve(data: JSONLike, fallback: JSONLike | typeof UNDEFINED = UNDEFINED): JSONLike {
    if (!this.tokens.length) return data;

    let result = data;
    let err: JSONPointerError | null;

    for (let i = 0; i < this.tokens.length; i++) {
      [result, err] = this.getItem(result, this.tokens[i]!, i);

      if (err) {
        if (fallback !== UNDEFINED) return fallback;
        throw err;
      }
    }

    return result;
  }

  resolveWithParent(data: JSONLike): [JSONLike | typeof UNDEFINED, JSONLike | typeof UNDEFINED] {
    if (!this.tokens.length) return [UNDEFINED, data];

    let parent = data;
    let err: JSONPointerError | null;

    for (let i = 0; i < this.tokens.length - 1; i++) {
      [parent, err] = this.getItem(parent, this.tokens[i]!, i);

      if (err) {
        throw err;
      }
    }

    let result: JSONLike;
    [result, err] = this.getItem(
      parent,
      this.tokens[this.tokens.length - 1]!,
      this.tokens.length - 1,
    );

    if (err instanceof JSONPointerIndexError || err instanceof JSONPointerKeyError) {
      return [parent, UNDEFINED];
    }

    if (err) {
      throw err;
    }

    return [parent, result];
  }

  /**
   * Return _true_ if this pointer can be resolved against _value_.
   *
   * Note that `JSONPointer.resolve()` can return legitimate falsy values
   * that form part of the target JSON document. This method will return
   * `true` if a falsy value is found.
   */
  exists(value: JSONLike): boolean {
    try {
      this.resolve(value);
    } catch (error) {
      if (error instanceof JSONPointerResolutionError) {
        return false;
      }
      throw error;
    }
    return true;
  }

  /**
   * Return this pointer's parent as a new `JSONPointer`.
   *
   * If this pointer points to the document root, _this_ is returned.
   */
  parent(): JSONPointer {
    if (!this.tokens.length) {
      return this;
    }

    return new JSONPointer(this.tokens.slice(0, this.tokens.length - 1));
  }

  to(rel: string | RelativeJSONPointer): JSONPointer {
    const relativePointer = isString(rel) ? new RelativeJSONPointer(rel) : rel;
    return relativePointer.to(this);
  }

  /**
   * Return true if this pointer points to a child of `other`.
   */
  isRelativeTo(other: JSONPointer): boolean {
    return (
      other.tokens.length < this.tokens.length &&
      this.tokens.slice(0, other.tokens.length).every((t, i) => t === other.tokens[i])
    );
  }

  /**
   * Join this pointer with _tokens_.
   *
   * @param pointers - JSON Pointer strings, possibly without leading slashes.
   * If a token or "part" does have a leading slash, the previous pointer is
   * ignored and a new `JSONPointer` is created, then processing of the
   * remaining tokens continues.
   *
   * @returns A new JSON Pointer that is the concatenation of all tokens or
   * "parts".
   */
  join(...pointers: string[]): JSONPointer {
    if (!pointers.length) {
      return this;
    }

    // oxlint-disable-next-line typescript/no-this-alias
    let pointer: JSONPointer = this;

    for (const token of pointers) {
      pointer = pointer.joinOne(token);
    }

    return pointer;
  }

  private getItem(value: JSONLike, token: string, tokenIndex: number): Result {
    if (isArray(value)) {
      return this.getArrayItem(value, token, tokenIndex);
    }

    if (isPlainObject(value)) {
      return this.getObjectItem(value, token, tokenIndex);
    }

    return [null, new JSONPointerTypeError(`unexpected primitive '${this.slice(tokenIndex)}'`)];
  }

  private getArrayItem(value: Array<JSONLike>, token: string, tokenIndex: number): Result {
    if (token !== "length" && Object.hasOwn(value, token)) {
      return [value[Number(token)], null];
    }

    if (token.startsWith("#")) {
      return this.getRelativeArrayItem(value, token, tokenIndex);
    }

    return [null, new JSONPointerIndexError(`index out of range '${this.slice(tokenIndex)}'`)];
  }

  private getObjectItem(
    value: Record<string, JSONLike>,
    token: string,
    tokenIndex: number,
  ): Result {
    if (Object.hasOwn(value, token)) {
      return [value[token], null];
    }

    if (token.startsWith("#") && Object.hasOwn(value, token.slice(1))) {
      return [token.slice(1), null];
    }

    return [null, new JSONPointerKeyError(`no such property '${this.slice(tokenIndex)}'`)];
  }

  private getRelativeArrayItem(value: Array<JSONLike>, token: string, tokenIndex: number): Result {
    const index = token.slice(1);
    if (RE_INT.test(index) && Object.hasOwn(value, index)) {
      return [Number(index), null];
    }

    return [null, new JSONPointerIndexError(`index out of range '${this.slice(tokenIndex)}'`)];
  }

  private slice(tokenIndex: number): string {
    return JSONPointer.encode(this.tokens.slice(0, tokenIndex + 1));
  }

  private joinOne(pointer: string): JSONPointer {
    if (!isString(pointer)) {
      throw new JSONPointerTypeError(`join() requires string arguments, found ${typeof pointer}`);
    }

    if (pointer.startsWith("/")) {
      return JSONPointer.fromString(pointer);
    }

    const tokens = this.tokens.concat(
      pointer.split("/").map((token) => token.replaceAll("~1", "/").replaceAll("~0", "~")),
    );

    return new JSONPointer(tokens);
  }
}

/**
 * A relative JSON Pointer.
 *
 * See https://datatracker.ietf.org/doc/html/draft-hha-relative-json-pointer
 */
export class RelativeJSONPointer {
  readonly origin: number;
  readonly index: number;
  readonly pointer: string | JSONPointer;

  constructor(rel: string) {
    [this.origin, this.index, this.pointer] = this.parse(rel);
  }

  toString(): string {
    const sign = this.index > 0 ? "+" : "";
    const index = this.index === 0 ? "" : `${sign}${this.index}`;
    return `${this.origin}${index}${this.pointer.toString()}`;
  }

  to(pointer: string | JSONPointer): JSONPointer {
    const p = isString(pointer) ? JSONPointer.fromString(pointer) : pointer;

    // move to origin
    if (this.origin > p.tokens.length) {
      throw new JSONPointerIndexError(`origin (${this.origin}) exceeds root (${p.tokens.length})`);
    }

    const tokens = this.origin < 1 ? p.tokens.slice() : p.tokens.slice(0, -this.origin);

    // array index offset
    if (this.index && tokens.length && this.isIntLike(tokens.at(-1))) {
      const newIndex = Number(tokens.at(-1)) + this.index;
      if (newIndex < 0) {
        throw new JSONPointerIndexError(`index offset out of range (${newIndex})`);
      }
      tokens[tokens.length - 1] = String(newIndex);
    }

    // pointer or index/property
    if (this.pointer instanceof JSONPointer) {
      tokens.push(...this.pointer.tokens);
    } else {
      tokens[tokens.length - 1] = `#${tokens[tokens.length - 1]}`;
    }

    return new JSONPointer(tokens);
  }

  private parse(rel: string): [number, number, string | JSONPointer] {
    const match = RE_RELATIVE_POINTER.exec(rel);
    if (!match || !match.groups) {
      throw new JSONPointerSyntaxError("failed to parse relative pointer");
    }

    // steps to move
    const origin = this.parseInt(match.groups.ORIGIN!);

    // optional index manipulation
    let index = 0;
    if (match.groups["INDEX_G"]) {
      index = this.parseInt(match.groups.INDEX!);
      if (index === 0) {
        throw new JSONPointerSyntaxError("index offset can't be zero");
      }
      if (match.groups.SIGN === "-") {
        index = -index;
      }
    }

    // pointer or '#'. an empty string is OK.
    if (match.groups.POINTER === "#") {
      return [origin, index, "#"];
    }

    return [origin, index, JSONPointer.fromString(match.groups.POINTER!)];
  }

  private parseInt(s: string): number {
    if (s.startsWith("0") && s.length > 1) {
      throw new JSONPointerSyntaxError("unexpected leading zero");
    }

    if (RE_INT.test(s)) {
      return Number(s);
    }

    throw new JSONPointerSyntaxError(`expected an integer, found '${s}'`);
  }

  private isIntLike(value: string | number | undefined): boolean {
    if (value === undefined || isNumber(value)) {
      return true;
    } else {
      return RE_INT.test(value);
    }
  }
}
