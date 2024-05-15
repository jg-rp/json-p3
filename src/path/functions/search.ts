import { check } from "iregexp-check";
import { LRUCache } from "../lru_cache";
import { FilterFunction, FunctionExpressionType } from "./function";
import { mapRegexp } from "./pattern";
import { IRegexpError } from "../errors";
import { isString } from "../../types";

export type SearchFilterFunctionOptions = {
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
   * If `iRegexpCheck` is _true_ and `throwErrors` is _true_, a `IRegexpError`
   * will be thrown.
   */
  iRegexpCheck?: boolean;
};

export class Search implements FilterFunction {
  readonly argTypes = [
    FunctionExpressionType.ValueType,
    FunctionExpressionType.ValueType,
  ];

  readonly returnType = FunctionExpressionType.LogicalType;

  readonly cacheSize: number;
  readonly throwErrors: boolean;
  readonly iRegexpCheck: boolean;
  #cache: LRUCache<string, RegExp>;

  constructor(readonly options: SearchFilterFunctionOptions = {}) {
    this.cacheSize = options.cacheSize ?? 10;
    this.throwErrors = options.throwErrors ?? false;
    this.iRegexpCheck = options.iRegexpCheck ?? true;
    this.#cache = new LRUCache(this.cacheSize);
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  public call(s: string, pattern: string): boolean {
    if (this.cacheSize > 0) {
      const re = this.#cache.get(pattern);
      if (re) {
        try {
          return !!s.match(re);
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
      const re = new RegExp(mapRegexp(pattern), "u");
      if (this.cacheSize > 0) this.#cache.set(pattern, re);
      return !!s.match(re);
    } catch (error) {
      if (this.throwErrors) throw error;
      return false;
    }
  }
}
