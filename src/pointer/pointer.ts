import { JSONValue, isArray, isObject, isString } from "../types";
import {
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

export type MaybeJSONValue = JSONValue | typeof UNDEFINED;

/**
 * Identify a single value in JSON-like data, as per RFC 6901.
 */
export class JSONPointer {
  #pointer: string;
  tokens: string[];

  /**
   * @param pointer - A string representation of a JSON Pointer.
   */
  constructor(pointer: string) {
    this.tokens = this.parse(pointer);
    this.#pointer = JSONPointer.encode(this.tokens);
  }

  static encode(tokens: string[]) {
    if (!tokens.length) return "";
    return (
      // eslint-disable-next-line prefer-template
      "/" +
      tokens
        .map((token) => token.replaceAll("~", "~0").replaceAll("/", "~1"))
        .join("/")
    );
  }

  /**
   * Resolve this pointer against JSON-like data _value_.
   *
   * @param value - The target JSON-like value, possibly loaded using
   *  `JSON.parse()`.
   * @param fallback - A default value to return if _value_ has no
   *   path matching `pointer`.
   * @returns The value identified by _pointer_ or, if given, the fallback
   *   value in the even of a `JSONPointerResolutionError`.
   *
   * @throws {@link JSONPointerResolutionError}
   * If the value pointed to by _pointer_ does not exist in _value_, and
   * no fallback value is given.
   */
  public resolve(
    value: JSONValue,
    fallback: MaybeJSONValue = UNDEFINED,
  ): JSONValue {
    try {
      return this.tokens.reduce(this.getItem.bind(this), value);
    } catch (error) {
      if (
        error instanceof JSONPointerResolutionError &&
        fallback !== UNDEFINED
      ) {
        return fallback;
      }
      throw error;
    }
  }

  // TODO: add `resolveWithFallback` to handle explicit `undefined`

  /**
   *
   * @param value -
   * @returns
   */
  public resolveWithParent(value: JSONValue): [MaybeJSONValue, MaybeJSONValue] {
    if (!this.tokens.length) return [UNDEFINED, this.resolve(value)];

    const parent = this.tokens
      .slice(0, this.tokens.length - 1)
      .reduce(this.getItem.bind(this), value);

    try {
      return [
        parent,
        this.getItem(
          parent,
          this.tokens[this.tokens.length - 1],
          this.tokens.length - 1,
        ),
      ];
    } catch (error) {
      if (
        error instanceof JSONPointerIndexError ||
        error instanceof JSONPointerKeyError
      ) {
        return [parent, UNDEFINED];
      }
      throw error;
    }
  }

  /**
   *
   * @returns
   */
  public toString(): string {
    return this.#pointer;
  }

  /**
   * Return _true_ if this pointer points to a child of _pointer_.
   */
  public isRelativeTo(pointer: JSONPointer): boolean {
    return (
      pointer.tokens.length < this.tokens.length &&
      this.tokens
        .slice(0, pointer.tokens.length)
        .every((t, i) => t === pointer.tokens[i])
    );
  }

  protected parse(pointer: string): string[] {
    if (pointer.length && !pointer.startsWith("/")) {
      throw new JSONPointerSyntaxError(
        `"${pointer}" pointers must start with a slash or be the empty string`,
      );
    }

    return pointer
      .split("/")
      .map((token) => token.replaceAll("~1", "/").replaceAll("~0", "~"))
      .slice(1);
  }

  protected getItem(val: JSONValue, token: string, idx: number): JSONValue {
    // NOTE:
    //   - string primitives "have own" indices and `length`.
    //   - Arrays have a `length` property.
    //   - A property might exist with the value `undefined` or `null`.
    //   - obj[1] is equivalent to obj["1"].
    if (isArray(val)) {
      if (token !== "length" && Object.hasOwn(val, token)) {
        return val[Number(token)];
      } else {
        throw new JSONPointerIndexError(
          `index out of range '${JSONPointer.encode(
            this.tokens.slice(0, idx + 1),
          )}'`,
        );
      }
    } else if (isObject(val)) {
      if (Object.hasOwn(val, token)) {
        return val[token];
      } else {
        throw new JSONPointerKeyError(
          `no such property '${JSONPointer.encode(
            this.tokens.slice(0, idx + 1),
          )}'`,
        );
      }
    }
    throw new JSONPointerTypeError(
      `found primitive value, expected an object '${JSONPointer.encode(
        this.tokens.slice(0, idx + 1),
      )}'`,
    );
  }

  private _join(pointer: string): JSONPointer {
    if (!isString(pointer)) {
      throw new JSONPointerTypeError(
        `join() requires string arguments, found ${typeof pointer}`,
      );
    }

    if (pointer.startsWith("/")) {
      return new JSONPointer(pointer);
    }

    const tokens = this.tokens.concat(
      pointer
        .split("/")
        .map((token) => token.replaceAll("~1", "/").replaceAll("~0", "~")),
    );

    return new JSONPointer(JSONPointer.encode(tokens));
  }

  /**
   * Join this pointer with _tokens_.
   *
   * @param tokens - JSON Pointer strings, possibly without leading slashes.
   * If a token or "part" does have a leading slash, the previous pointer is
   * ignored and a new `JSONPointer` is created, then processing of the
   * remaining tokens continues.
   *
   * @returns A new JSON Pointer that is the concatenation of all tokens or
   * "parts".
   */
  public join(...tokens: string[]): JSONPointer {
    if (!tokens.length) {
      return this;
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let pointer: JSONPointer = this;
    for (const tok of tokens) {
      pointer = pointer._join(tok);
    }
    return pointer;
  }

  /**
   * Return _true_ if this pointer can be resolved against _value_.
   *
   * Note that `JSONPointer.resolve()` can return legitimate falsy values
   * that form part of the target JSON document. This method will return
   * `true` if a falsy value is found.
   */
  public exists(value: JSONValue): boolean {
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
  public parent(): JSONPointer {
    if (!this.tokens.length) {
      return this;
    }

    return new JSONPointer(
      JSONPointer.encode(this.tokens.slice(0, this.tokens.length - 1)),
    );
  }

  // TODO: to (relative pointer)
}
