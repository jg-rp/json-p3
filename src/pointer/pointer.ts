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

/**
 * A JSON-like value.
 */
export type JSONValue =
  | string
  | number
  | null
  | undefined
  | boolean
  | JSONValue[]
  | { [key: string]: JSONValue };

export type MaybeJSONValue = JSONValue | typeof UNDEFINED;

/**
 * A type predicate for the Array object.
 */
function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * A type predicate for object.
 */
function isObject(value: unknown): value is object {
  const _type = typeof value;
  return (value !== null && _type === "object") || _type === "function"
    ? true
    : false;
}

/**
 * Identify a single value in JSON-like data, as per RFC 6901.
 */
export class JSONPointer {
  #pointer: string;
  #tokens: string[];

  /**
   *
   * @param pointer - A string representation of a JSON Pointer.
   */
  constructor(pointer: string) {
    this.#tokens = this.parse(pointer);
    this.#pointer = this.encode(this.#tokens);
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
      return this.#tokens.reduce(this.getItem.bind(this), value);
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

  /**
   *
   * @param value -
   * @returns
   */
  public resolveWithParent(value: JSONValue): [MaybeJSONValue, MaybeJSONValue] {
    if (!this.#tokens.length) return [UNDEFINED, this.resolve(value)];

    const parent = this.#tokens
      .slice(0, this.#tokens.length - 1)
      .reduce(this.getItem.bind(this), value);

    try {
      return [
        parent,
        this.getItem(
          parent,
          this.#tokens[this.#tokens.length - 1],
          this.#tokens.length - 1,
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
          `index out of range ("${this.encode(
            this.#tokens.slice(0, idx + 1),
          )}")`,
        );
      }
    } else if (isObject(val)) {
      if (Object.hasOwn(val, token)) {
        return val[token];
      } else {
        throw new JSONPointerKeyError(
          `no such property ("${this.encode(this.#tokens.slice(0, idx + 1))}")`,
        );
      }
    }
    throw new JSONPointerTypeError(
      `found primitive value, expected an object ("${this.encode(
        this.#tokens.slice(0, idx + 1),
      )}")`,
    );
  }

  protected encode(tokens: string[]) {
    if (!tokens.length) return "";
    return (
      // eslint-disable-next-line prefer-template
      "/" +
      tokens
        .map((token) => token.replaceAll("~", "~0").replaceAll("/", "~1"))
        .join("/")
    );
  }
}
