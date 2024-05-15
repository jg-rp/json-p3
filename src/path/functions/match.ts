import { isString } from "../../types";
import { IRegexpError } from "../errors";
import { LRUCache } from "../lru_cache";
import { FilterFunction, FunctionExpressionType } from "./function";
import { mapRegexp } from "./pattern";
import { check } from "iregexp-check";

export type MatchFilterFunctionOptions = {
  /**
   * The maximum number of regular expressions to cache.
   */
  cacheSize?: number;

  /**
   * If _true_, throw errors from regex checking, construction and matching.
   * The standard and default behavior is to ignore these errors and return
   * _false_.
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
};

export class Match implements FilterFunction {
  readonly argTypes = [
    FunctionExpressionType.ValueType,
    FunctionExpressionType.ValueType,
  ];

  readonly returnType = FunctionExpressionType.LogicalType;

  readonly cacheSize: number;
  readonly throwErrors: boolean;
  readonly iRegexpCheck: boolean;
  #cache: LRUCache<string, RegExp>;

  constructor(readonly options: MatchFilterFunctionOptions = {}) {
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
          return re.test(s);
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
      const re = new RegExp(this.fullMatch(pattern), "u");
      if (this.cacheSize > 0) this.#cache.set(pattern, re);
      return re.test(s);
    } catch (error) {
      if (this.throwErrors) throw error;
      return false;
    }
  }

  protected fullMatch(pattern: string): string {
    const parts: string[] = [];
    const explicitCaret = pattern.startsWith("^");
    const explicitDollar = pattern.endsWith("$");
    if (!explicitCaret && !explicitDollar) parts.push("^(?:");
    parts.push(mapRegexp(pattern));
    if (!explicitCaret && !explicitDollar) parts.push(")$");
    return parts.join("");
  }
}
