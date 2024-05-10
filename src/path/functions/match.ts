import { LRUCache } from "../lru_cache";
import { FilterFunction, FunctionExpressionType } from "./function";
import { mapRegexp } from "./pattern";

export type MatchFilterFunctionOptions = {
  /**
   * The maximum number of regular expressions to cache.
   */
  cacheSize?: number;

  /**
   * If _true_, throw errors from regex construction and matching.
   * The standard and default behavior is to ignore these errors
   * and return _false_.
   */
  throwErrors?: boolean;
};

export class Match implements FilterFunction {
  readonly argTypes = [
    FunctionExpressionType.ValueType,
    FunctionExpressionType.ValueType,
  ];

  readonly returnType = FunctionExpressionType.LogicalType;

  readonly cacheSize: number;
  readonly throwErrors: boolean;
  #cache: LRUCache<string, RegExp>;

  constructor(readonly options: MatchFilterFunctionOptions = {}) {
    this.cacheSize = options.cacheSize ?? 10;
    this.throwErrors = options.throwErrors ?? false;
    this.#cache = new LRUCache(this.cacheSize);
  }

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
