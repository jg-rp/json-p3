import { isArray, isPlainObject, isString } from "../types.js";
import { JSONPathError } from "./errors.js";
import { checkIRegexp, mapIRegexp } from "./iregexp.js";
import { LRUCache } from "./lru_cache.js";
import { BasicNodeList, NodeList } from "./nodes.js";
import { Nothing } from "./nothing.js";

export const LOGICAL_TYPE = 1 as const;
export const NODES_TYPE = 2 as const;
export const VALUE_TYPE = 3 as const;

export type ExpressionType = 1 | 2 | 3;

/**
 * A JSONPath filter function definition.
 */
export interface FilterFunction {
  /**
   * Argument types expected by the filter function.
   */
  argTypes: ExpressionType[];

  /**
   * The type of the value returned by the filter function.
   */
  returnType: ExpressionType;

  /**
   * A function with unknown number and type of arguments.
   */
  call(...args: unknown[]): unknown;
}

export class Count implements FilterFunction {
  readonly argTypes = [NODES_TYPE];
  readonly returnType = VALUE_TYPE;

  public call(nodes: NodeList | BasicNodeList): number {
    return nodes.length;
  }
}

export class Length implements FilterFunction {
  readonly argTypes = [VALUE_TYPE];
  readonly returnType = VALUE_TYPE;

  public call(value: unknown): number | typeof Nothing {
    if (isArray(value) || isString(value)) return value.length;
    if (isPlainObject(value)) return Object.keys(value).length;
    return Nothing;
  }
}

export type RegexFunctionOptions = {
  cacheCapacity?: number;
  throwErrors?: boolean;
  iRegexpCheck?: boolean;
  escapeAnchors?: boolean;
};

export abstract class CachingRegexFunction<T> implements FilterFunction {
  readonly argTypes = [VALUE_TYPE, VALUE_TYPE];
  readonly returnType = LOGICAL_TYPE;

  readonly cacheCapacity: number;
  readonly throwErrors: boolean;
  readonly iRegexpCheck: boolean;
  readonly escapeAnchors: boolean;

  private cache: LRUCache<string, RegExp | null>;

  constructor(options: RegexFunctionOptions = {}) {
    this.cacheCapacity = options.cacheCapacity ?? 300;
    this.throwErrors = options.throwErrors ?? false;
    this.iRegexpCheck = options.iRegexpCheck ?? true;
    this.escapeAnchors = options.escapeAnchors ?? false;
    this.cache = new LRUCache(this.cacheCapacity);
  }

  public call(str: T, pattern: string): boolean {
    if (!isString(pattern)) {
      return this.debugOrFalse("pattern is not a string");
    }

    let re = this.cache.get(pattern);

    if (re === null) {
      return this.debugOrFalse("invalid pattern from cache");
    }

    if (re === undefined) {
      if (this.iRegexpCheck && !checkIRegexp(pattern)) {
        this.cache.set(pattern, null);
        return this.debugOrFalse("I-Regexp check failed");
      }

      try {
        re = this.compile(pattern);
        this.cache.set(pattern, re);
      } catch (error) {
        this.cache.set(pattern, null);
        // oxlint-disable-next-line typescript/no-unsafe-type-assertion
        return this.debugOrFalse((error as SyntaxError).toString());
      }
    }

    return this.go(re, str);
  }

  abstract compile(pattern: string): RegExp;

  abstract go(re: RegExp, str: T): boolean;

  protected debugOrFalse(message: string): boolean {
    if (this.throwErrors) {
      throw new JSONPathError(`${this.constructor.name}: ${message}`);
    }
    return false;
  }
}

export class Match extends CachingRegexFunction<string> {
  override compile(pattern: string): RegExp {
    return new RegExp(mapIRegexp(pattern, { escapeAnchors: this.escapeAnchors, wrap: true }), "u");
  }

  override go(re: RegExp, str: string): boolean {
    if (!isString(str)) {
      return this.debugOrFalse("value is not a string");
    }

    return re.test(str);
  }
}

export class Search extends CachingRegexFunction<string> {
  override compile(pattern: string): RegExp {
    return new RegExp(mapIRegexp(pattern, { escapeAnchors: this.escapeAnchors, wrap: false }), "u");
  }

  override go(re: RegExp, str: string): boolean {
    if (!isString(str)) {
      return this.debugOrFalse("value is not a string");
    }

    return !!str.match(re);
  }
}

export class Value implements FilterFunction {
  readonly argTypes = [NODES_TYPE];
  readonly returnType = VALUE_TYPE;

  public call(nodes: NodeList | BasicNodeList): unknown {
    if (nodes.length === 1) {
      return nodes instanceof BasicNodeList ? nodes.nodes[0] : nodes.nodes[0]!.value;
    }
    return Nothing;
  }
}

export type HasFilterFunctionOptions = RegexFunctionOptions & {
  search?: boolean;
};

export class Has extends CachingRegexFunction<unknown> {
  readonly search: boolean;

  constructor(options: HasFilterFunctionOptions = {}) {
    super(options);
    this.search = options.search ?? true;
  }

  override compile(pattern: string): RegExp {
    return new RegExp(
      mapIRegexp(pattern, { escapeAnchors: this.escapeAnchors, wrap: !this.search }),
      "u",
    );
  }

  override go(re: RegExp, value: unknown): boolean {
    if (isPlainObject(value)) {
      return Object.keys(value).some((k) => !!k.match(re));
    }

    return false;
  }
}
