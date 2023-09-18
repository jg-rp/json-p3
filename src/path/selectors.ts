import { JSONPathEnvironment } from "./environment";
import { JSONPathIndexError, JSONPathRecursionLimitError } from "./errors";
import { LogicalExpression } from "./expression";
import { JSONPathNode, JSONPathNodeList } from "./node";
import { Token } from "./token";
import { FilterContext, hasStringKey } from "./types";
import { isArray, isObject, JSONValue } from "../types";

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
   * @param nodes - Nodes matched by preceding selectors.
   */
  public abstract resolve(nodes: JSONPathNodeList): JSONPathNodeList;

  /**
   * Return a canonical string representation of this selector.
   */
  public abstract toString(): string;
}

/**
 * Shorthand and quoted name selector.
 */
export class NameSelector extends JSONPathSelector {
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly token: Token,
    readonly name: string,
    readonly shorthand: boolean,
  ) {
    super(environment, token);
  }

  public resolve(nodes: JSONPathNodeList): JSONPathNodeList {
    const rv: JSONPathNode[] = [];
    for (const node of nodes) {
      if (hasStringKey(node.value, this.name)) {
        rv.push(
          new JSONPathNode(
            node.value[this.name],
            node.location.concat(this.name),
            node.root,
          ),
        );
      }
    }
    return new JSONPathNodeList(rv);
  }

  public toString(): string {
    return this.shorthand ? `['${this.name}']` : `'${this.name}'`;
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

  public resolve(nodes: JSONPathNodeList): JSONPathNodeList {
    const rv: JSONPathNode[] = [];
    for (const node of nodes) {
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
    }
    return new JSONPathNodeList(rv);
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

  public resolve(nodes: JSONPathNodeList): JSONPathNodeList {
    const rv: JSONPathNode[] = [];
    for (const node of nodes) {
      if (!isArray(node.value)) continue;

      for (const [i, value] of this.slice(
        node.value,
        this.start,
        this.stop,
        this.step,
      )) {
        rv.push(new JSONPathNode(value, node.location.concat(i), node.root));
      }
    }
    return new JSONPathNodeList(rv);
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

  // eslint-disable-next-line sonarjs/cognitive-complexity
  private slice(
    arr: JSONValue[],
    start?: number,
    stop?: number,
    step?: number,
  ): Array<[number, JSONValue]> {
    if (!arr.length) return [];

    // Handle negative start and stop values
    if (start === undefined || start === null) {
      start = step && step < 0 ? arr.length - 1 : 0;
    } else if (start < 0) {
      start = Math.max(arr.length + start, 0);
    } else {
      start = Math.min(start, arr.length - 1);
    }

    if (stop === undefined || stop === null) {
      stop = step && step < 0 ? -1 : arr.length;
    } else if (stop < 0) {
      stop = Math.max(arr.length + stop, -1);
    } else {
      stop = Math.min(stop, arr.length);
    }

    // Handle step value
    if (step === 0) {
      return [];
    }
    if (!step) {
      step = 1;
    }

    // Perform the slice
    const slicedArray: Array<[number, JSONValue]> = [];
    if (step > 0) {
      for (let i = start; i < stop; i += step) {
        slicedArray.push([i, arr[i]]);
      }
    } else {
      for (let i = start; i > stop; i += step) {
        slicedArray.push([i, arr[i]]);
      }
    }

    return slicedArray;
  }
}

export class WildcardSelector extends JSONPathSelector {
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly token: Token,
    readonly shorthand: boolean = false,
  ) {
    super(environment, token);
  }

  public resolve(nodes: JSONPathNodeList): JSONPathNodeList {
    const rv: JSONPathNode[] = [];
    for (const node of nodes) {
      if (node.value instanceof String) continue;
      if (isArray(node.value)) {
        for (let i = 0; i < node.value.length; i++) {
          rv.push(
            new JSONPathNode(node.value[i], node.location.concat(i), node.root),
          );
        }
      } else if (isObject(node.value)) {
        for (const [key, value] of Object.entries(node.value)) {
          rv.push(
            new JSONPathNode(value, node.location.concat(key), node.root),
          );
        }
      }
    }
    return new JSONPathNodeList(rv);
  }

  public toString(): string {
    return this.shorthand ? "[*]" : "*";
  }
}

export class RecursiveDescentSegment extends JSONPathSelector {
  public resolve(nodes: JSONPathNodeList): JSONPathNodeList {
    const rv: JSONPathNode[] = [];
    for (const node of nodes) {
      rv.push(node, ...this.visit(node));
    }
    return new JSONPathNodeList(rv);
  }

  public toString(): string {
    return "..";
  }

  private visit(node: JSONPathNode, depth: number = 1): JSONPathNodeList {
    if (depth >= this.environment.maxRecursionDepth) {
      throw new JSONPathRecursionLimitError(
        "recursion limit reached",
        this.token,
      );
    }
    const rv: JSONPathNode[] = [];
    if (node.value instanceof String) return new JSONPathNodeList(rv);
    if (isArray(node.value)) {
      for (let i = 0; i < node.value.length; i++) {
        const _node = new JSONPathNode(
          node.value[i],
          node.location.concat(i),
          node.root,
        );
        rv.push(_node, ...this.visit(_node, depth + 1));
      }
    } else if (isObject(node.value)) {
      for (const [key, value] of Object.entries(node.value)) {
        const _node = new JSONPathNode(
          value,
          node.location.concat(key),
          node.root,
        );
        rv.push(_node, ...this.visit(_node, depth + 1));
      }
    }
    return new JSONPathNodeList(rv);
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

  // eslint-disable-next-line sonarjs/cognitive-complexity
  public resolve(nodes: JSONPathNodeList): JSONPathNodeList {
    const rv: JSONPathNode[] = [];
    for (const node of nodes) {
      if (node.value instanceof String) continue;
      if (isArray(node.value)) {
        for (let i = 0; i < node.value.length; i++) {
          const value = node.value[i];
          const filterContext: FilterContext = {
            environment: this.environment,
            currentValue: value,
            rootValue: node.root,
          };
          if (this.expression.evaluate(filterContext)) {
            rv.push(
              new JSONPathNode(value, node.location.concat(i), node.root),
            );
          }
        }
      } else if (isObject(node.value)) {
        for (const [key, value] of Object.entries(node.value)) {
          const filterContext: FilterContext = {
            environment: this.environment,
            currentValue: value,
            rootValue: node.root,
          };
          if (this.expression.evaluate(filterContext)) {
            rv.push(
              new JSONPathNode(value, node.location.concat(key), node.root),
            );
          }
        }
      }
    }
    return new JSONPathNodeList(rv);
  }

  public toString(): string {
    return `?${this.expression.toString()}`;
  }
}

export type BracketedSegment =
  | FilterSelector
  | IndexSelector
  | NameSelector
  | SliceSelector
  | WildcardSelector;

export class BracketedSelection extends JSONPathSelector {
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly token: Token,
    readonly items: BracketedSegment[],
  ) {
    super(environment, token);
  }

  public resolve(nodes: JSONPathNodeList): JSONPathNodeList {
    const rv: JSONPathNode[] = [];
    for (const node of nodes) {
      for (const item of this.items) {
        rv.push(...item.resolve(new JSONPathNodeList([node])));
      }
    }

    return new JSONPathNodeList(rv);
  }

  public toString(): string {
    return `[${this.items.map((itm) => itm.toString()).join(", ")}]`;
  }
}
