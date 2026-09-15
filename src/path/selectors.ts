import { JSONPathEnvironment } from "./environment";
import { JSONPathIndexError } from "./errors";
import { LogicalExpression } from "./expression";
import { JSONPathNode } from "./node";
import { Token } from "./token";
import {
  type FilterContext,
  type SerializationOptions,
  defaultSerializationOptions,
  hasStringKey,
} from "./types";
import { isArray, isObject, isString, JSONValue } from "../types";
import { toCanonical, toQuoted, toShorthand } from "./serialize";

/**
 * Base class for all JSONPath segments and selectors.
 */
export abstract class JSONPathSelector {
  /**
   * @param token - The token at the start of this selector.
   */
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly token: Token,
  ) {}

  /**
   * @param node - Nodes matched by preceding selectors.
   */
  public abstract resolve(node: JSONPathNode): JSONPathNode[];

  /**
   * @param node - Nodes matched by preceding selectors.
   */
  public abstract lazyResolve(node: JSONPathNode): Generator<JSONPathNode>;

  /**
   * Return a canonical string representation of this selector.
   */
  public abstract toString(options?: SerializationOptions): string;
}

/**
 * Shorthand and quoted name selector.
 */
export class NameSelector extends JSONPathSelector {
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly token: Token,
    readonly name: string,
  ) {
    super(environment, token);
  }

  public resolve(node: JSONPathNode): JSONPathNode[] {
    const rv: JSONPathNode[] = [];
    if (!isArray(node.value) && hasStringKey(node.value, this.name)) {
      rv.push(
        new JSONPathNode(
          node.value[this.name],
          node.location.concat(this.name),
          node.root,
        ),
      );
    }
    return rv;
  }

  public *lazyResolve(node: JSONPathNode): Generator<JSONPathNode> {
    if (!isArray(node.value) && hasStringKey(node.value, this.name)) {
      yield new JSONPathNode(
        node.value[this.name],
        node.location.concat(this.name),
        node.root,
      );
    }
  }

  public toString(options?: SerializationOptions): string {
    const { form } = { ...defaultSerializationOptions, ...options };
    return form === "canonical" ? toCanonical(this.name) : toQuoted(this.name);
  }

  public shorthand(): string | null {
    return toShorthand(this.name);
  }
}

/**
 * Array index selector.
 */
export class IndexSelector extends JSONPathSelector {
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly token: Token,
    readonly index: number,
  ) {
    super(environment, token);
    if (
      index < this.environment.minIntIndex ||
      index > this.environment.maxIntIndex
    ) {
      throw new JSONPathIndexError("index out of range", this.token);
    }
  }

  public resolve(node: JSONPathNode): JSONPathNode[] {
    const rv: JSONPathNode[] = [];
    if (isArray(node.value)) {
      const normIndex = this.normalizedIndex(node.value.length);
      if (normIndex in node.value) {
        rv.push(
          new JSONPathNode(
            node.value[normIndex],
            node.location.concat(normIndex),
            node.root,
          ),
        );
      }
    }
    return rv;
  }

  public *lazyResolve(node: JSONPathNode): Generator<JSONPathNode> {
    if (isArray(node.value)) {
      const normIndex = this.normalizedIndex(node.value.length);
      if (normIndex in node.value) {
        yield new JSONPathNode(
          node.value[normIndex],
          node.location.concat(normIndex),
          node.root,
        );
      }
    }
  }

  public toString(): string {
    return String(this.index);
  }

  private normalizedIndex(length: number): number {
    if (this.index < 0 && length >= Math.abs(this.index))
      return length + this.index;
    return this.index;
  }
}

export class SliceSelector extends JSONPathSelector {
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly token: Token,
    readonly start?: number,
    readonly stop?: number,
    readonly step?: number,
  ) {
    super(environment, token);
    this.checkRange(start, stop, step);
  }

  public resolve(node: JSONPathNode): JSONPathNode[] {
    const rv: JSONPathNode[] = [];
    if (!isArray(node.value)) return rv;

    for (const [i, value] of this.slice(
      node.value,
      this.start,
      this.stop,
      this.step,
    )) {
      rv.push(new JSONPathNode(value, node.location.concat(i), node.root));
    }

    return rv;
  }

  public *lazyResolve(node: JSONPathNode): Generator<JSONPathNode> {
    if (isArray(node.value)) {
      for (const [i, value] of this.lazySlice(
        node.value,
        this.start,
        this.stop,
        this.step,
      )) {
        yield new JSONPathNode(value, node.location.concat(i), node.root);
      }
    }
  }

  public toString(): string {
    const start = this.start ? this.start : "";
    const stop = this.stop ? this.stop : "";
    const step = this.step ? this.step : "1";
    return `${start}:${stop}:${step}`;
  }

  private checkRange(...indices: Array<number | undefined>): void {
    for (const index of indices) {
      if (
        index !== undefined &&
        (index < this.environment.minIntIndex ||
          index > this.environment.maxIntIndex)
      ) {
        throw new JSONPathIndexError("index out of range", this.token);
      }
    }
  }

  private slice(
    arr: JSONValue[],
    start?: number,
    stop?: number,
    step?: number,
  ): Array<[number, JSONValue]> {
    const len = arr.length;
    step = step ?? 1;

    if (step === 0 || !len) return [];

    const result: Array<[number, JSONValue]> = [];
    let i: number;

    if (step > 0) {
      i = this.normalizeIndex(start, 0, len, step);
      const stop_ = this.normalizeIndex(stop, len, len, step);
      for (; i < stop_; i += step) {
        result.push([i, arr[i]]);
      }
    } else {
      i = this.normalizeIndex(start, len - 1, len, step);
      const stop_ = this.normalizeIndex(stop, -1, len, step);
      for (; i > stop_; i += step) {
        result.push([i, arr[i]]);
      }
    }

    return result;
  }

  private *lazySlice(
    arr: JSONValue[],
    start?: number,
    stop?: number,
    step?: number,
  ): Generator<[number, JSONValue]> {
    const len = arr.length;
    step = step ?? 1;

    if (step === 0 || !len) return [];

    let i: number;

    if (step > 0) {
      i = this.normalizeIndex(start, 0, len, step);
      const stop_ = this.normalizeIndex(stop, len, len, step);
      for (; i < stop_; i += step) {
        yield [i, arr[i]];
      }
    } else {
      i = this.normalizeIndex(start, len - 1, len, step);
      const stop_ = this.normalizeIndex(stop, -1, len, step);
      for (; i > stop_; i += step) {
        yield [i, arr[i]];
      }
    }
  }

  private normalizeIndex(
    n: number | undefined,
    defaultValue: number,
    len: number,
    step: number,
  ): number {
    if (n === undefined) return defaultValue;
    if (n < 0) return step < 0 ? Math.max(n + len, -1) : Math.max(n + len, 0);
    return step < 0 ? Math.min(n, len - 1) : Math.min(n, len);
  }
}

export class WildcardSelector extends JSONPathSelector {
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly token: Token,
  ) {
    super(environment, token);
  }

  public resolve(node: JSONPathNode): JSONPathNode[] {
    const rv: JSONPathNode[] = [];
    if (node.value instanceof String) return rv;
    if (isArray(node.value)) {
      for (let i = 0; i < node.value.length; i++) {
        rv.push(
          new JSONPathNode(node.value[i], node.location.concat(i), node.root),
        );
      }
    } else if (isObject(node.value)) {
      for (const [key, value] of this.environment.entries(node.value)) {
        rv.push(new JSONPathNode(value, node.location.concat(key), node.root));
      }
    }
    return rv;
  }

  public *lazyResolve(node: JSONPathNode): Generator<JSONPathNode> {
    if (isArray(node.value)) {
      for (let i = 0; i < node.value.length; i++) {
        yield new JSONPathNode(
          node.value[i],
          node.location.concat(i),
          node.root,
        );
      }
    } else if (isObject(node.value) && !isString(node.value)) {
      for (const [key, value] of this.environment.entries(node.value)) {
        yield new JSONPathNode(value, node.location.concat(key), node.root);
      }
    }
  }

  public toString(): string {
    return "*";
  }
}

export class FilterSelector extends JSONPathSelector {
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly token: Token,
    readonly expression: LogicalExpression,
  ) {
    super(environment, token);
  }

  public resolve(node: JSONPathNode): JSONPathNode[] {
    const rv: JSONPathNode[] = [];
    if (node.value instanceof String) return rv;
    if (isArray(node.value)) {
      for (let i = 0; i < node.value.length; i++) {
        const value = node.value[i];
        const filterContext: FilterContext = {
          environment: this.environment,
          currentValue: value,
          rootValue: node.root,
          currentKey: i,
        };
        if (this.expression.evaluate(filterContext)) {
          rv.push(new JSONPathNode(value, node.location.concat(i), node.root));
        }
      }
    } else if (isObject(node.value)) {
      for (const [key, value] of this.environment.entries(node.value)) {
        const filterContext: FilterContext = {
          environment: this.environment,
          currentValue: value,
          rootValue: node.root,
          currentKey: key,
        };
        if (this.expression.evaluate(filterContext)) {
          rv.push(
            new JSONPathNode(value, node.location.concat(key), node.root),
          );
        }
      }
    }
    return rv;
  }

  public *lazyResolve(node: JSONPathNode): Generator<JSONPathNode> {
    if (isArray(node.value)) {
      for (let i = 0; i < node.value.length; i++) {
        const value = node.value[i];
        const filterContext: FilterContext = {
          environment: this.environment,
          currentValue: value,
          rootValue: node.root,
          lazy: true,
          currentKey: i,
        };
        if (this.expression.evaluate(filterContext)) {
          yield new JSONPathNode(value, node.location.concat(i), node.root);
        }
      }
    } else if (isObject(node.value) && !isString(node.value)) {
      for (const [key, value] of this.environment.entries(node.value)) {
        const filterContext: FilterContext = {
          environment: this.environment,
          currentValue: value,
          rootValue: node.root,
          lazy: true,
          currentKey: key,
        };
        if (this.expression.evaluate(filterContext)) {
          yield new JSONPathNode(value, node.location.concat(key), node.root);
        }
      }
    }
  }

  public toString(options?: SerializationOptions): string {
    return `?${this.expression.toString(options)}`;
  }
}
