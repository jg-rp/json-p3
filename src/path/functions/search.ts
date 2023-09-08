import { LRUCache } from "../lru_cache";
import { FilterFunction, FunctionExpressionType } from "./function";

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
};

export class Search implements FilterFunction {
  readonly argTypes = [
    FunctionExpressionType.ValueType,
    FunctionExpressionType.ValueType,
  ];

  readonly returnType = FunctionExpressionType.LogicalType;

  readonly cacheSize: number;
  readonly throwErrors: boolean;
  #cache: LRUCache<string, RegExp>;

  constructor(readonly options: SearchFilterFunctionOptions = {}) {
    this.cacheSize = options.cacheSize ?? 10;
    this.throwErrors = options.throwErrors ?? false;
    this.#cache = new LRUCache(this.cacheSize);
  }

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

    try {
      const re = new RegExp(pattern, "u");
      if (this.cacheSize > 0) this.#cache.set(pattern, re);
      return !!s.match(re);
    } catch (error) {
      if (this.throwErrors) throw error;
      return false;
    }
  }
}
