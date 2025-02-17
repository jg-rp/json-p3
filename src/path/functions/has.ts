import { check } from "iregexp-check";
import { LRUCache } from "../lru_cache";
import { FilterFunction, FunctionExpressionType } from "./function";
import { isObject, isString } from "../../types";
import { IRegexpError } from "../errors";
import { mapRegexp, fullMatch } from "./pattern";

export type HasFilterFunctionOptions = {
  /**
   * The maximum number of regular expressions to cache. Defaults
   * to 10.
   */
  cacheSize?: number;

  /**
   * If _true_, throw errors from regex construction and matching.
   * The standard and default behavior is to ignore these errors
   * and return _false_.
   */
  throwErrors?: boolean;

  /**
   * If _true_, check that regexp patterns are valid according to I-Regexp.
   * The standard and default behavior is to silently return _false_ if a
   * pattern is invalid.
   *
   * If `iRegexpCheck` is _true_ and `throwErrors` is _true_, an `IRegexpError`
   * will be thrown.
   */
  iRegexpCheck?: boolean;

  /**
   * if _true_, use regex search semantics when testing patterns against
   * property names. Defaults to _true_.
   */
  search?: boolean;
};

/**
 * A function extension that returns `true` if the first argument is an object
 * value and it contains a property matching the second argument.
 */
export class Has implements FilterFunction {
  readonly argTypes = [
    FunctionExpressionType.ValueType,
    FunctionExpressionType.ValueType,
  ];

  readonly returnType = FunctionExpressionType.LogicalType;

  readonly cacheSize: number;
  readonly throwErrors: boolean;
  readonly iRegexpCheck: boolean;
  readonly search: boolean;
  #cache: LRUCache<string, RegExp>;

  constructor(readonly options: HasFilterFunctionOptions = {}) {
    this.cacheSize = options.cacheSize ?? 10;
    this.throwErrors = options.throwErrors ?? false;
    this.iRegexpCheck = options.iRegexpCheck ?? true;
    this.search = options.search ?? true;
    this.#cache = new LRUCache(this.cacheSize);
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  public call(value: unknown, pattern: string): boolean {
    if (this.cacheSize > 0) {
      const re = this.#cache.get(pattern);
      if (re) {
        try {
          if (isObject(value)) {
            return Object.keys(value).some((k) => !!k.match(re));
          }
          return false;
        } catch (error) {
          if (this.throwErrors) throw error;
          return false;
        }
      }
    }

    if (!isString(pattern)) {
      if (this.throwErrors) {
        throw new IRegexpError(
          `match() expected a string pattern, found ${pattern}`,
        );
      }
      return false;
    }

    if (this.iRegexpCheck && !check(pattern)) {
      if (this.throwErrors) {
        throw new IRegexpError(
          `pattern ${pattern} is not a valid I-Regexp pattern`,
        );
      }
      return false;
    }

    try {
      const re = this.search
        ? new RegExp(mapRegexp(pattern), "u")
        : new RegExp(mapRegexp(fullMatch(pattern)), "u");

      if (this.cacheSize > 0) this.#cache.set(pattern, re);

      if (isObject(value)) {
        return Object.keys(value).some((k) => !!k.match(re));
      }

      return false;
    } catch (error) {
      if (this.throwErrors) throw error;
      return false;
    }
  }
}
