import { JSONPathEnvironment } from "./environment";
import { LogicalExpression } from "./expression";
import { JSONPathNode, JSONPathNodeList } from "./node";
import { Token } from "./token";
import {
  FilterContext,
  JSONValue,
  hasStringKey,
  isArray,
  isObject,
} from "./types";

/**
 * Base class for all JSONPath selectors.
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
              node.location.concat(String(normIndex)),
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
    // TODO: check numbers are in range
  }

  public resolve(nodes: JSONPathNodeList): JSONPathNodeList {
    const rv: JSONPathNode[] = [];
    for (const node of nodes) {
      if (!isArray(node.value)) continue;

      let index = this.start || 0;
      const step = this.step || 1;

      for (const value of this.slice(node.value, step)) {
        const normIndex = this.normalizedIndex(node.value.length, index);
        rv.push(
          new JSONPathNode(
            value,
            node.location.concat(String(normIndex)),
            node.root,
          ),
        );
        index += step;
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

  private normalizedIndex(length: number, index: number): number {
    if (index < 0 && length >= Math.abs(index)) return length + index;
    return index;
  }

  private slice(array: JSONValue[], step: number): JSONValue[] {
    if (step === 1) return array.slice(this.start, this.stop);
    const sliced: JSONValue[] = [];
    const start = this.normalizedIndex(array.length, this.start || 0);
    const stop = this.normalizedIndex(array.length, this.stop || array.length);
    for (let i = start; i <= stop; i += step) {
      sliced.push(array[i]);
    }
    return sliced;
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
        for (const [i, value] of node.value.entries()) {
          rv.push(
            new JSONPathNode(value, node.location.concat(String(i)), node.root),
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

export class RecursiveDescentSelector extends JSONPathSelector {
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

  private visit(node: JSONPathNode): JSONPathNodeList {
    const rv: JSONPathNode[] = [];
    if (node.value instanceof String) return new JSONPathNodeList(rv);
    if (isArray(node.value)) {
      for (const [i, value] of node.value.entries()) {
        const _node = new JSONPathNode(
          value,
          node.location.concat(String(i)),
          node.root,
        );
        rv.push(_node, ...this.visit(_node));
      }
    } else if (isObject(node.value)) {
      for (const [key, value] of Object.entries(node.value)) {
        const _node = new JSONPathNode(
          value,
          node.location.concat(key),
          node.root,
        );
        rv.push(_node, ...this.visit(_node));
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
        for (const [i, value] of node.value.entries()) {
          const filterContext: FilterContext = {
            environment: this.environment,
            currentValue: value,
            rootValue: node.root,
          };
          if (this.expression.evaluate(filterContext)) {
            rv.push(
              new JSONPathNode(
                value,
                node.location.concat(String(i)),
                node.root,
              ),
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

export type BracketedSelector =
  | FilterSelector
  | IndexSelector
  | NameSelector
  | SliceSelector
  | WildcardSelector;

export class BracketedSelection extends JSONPathSelector {
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly token: Token,
    readonly items: BracketedSelector[],
  ) {
    super(environment, token);
  }

  public resolve(nodes: JSONPathNodeList): JSONPathNodeList {
    const rv: JSONPathNode[] = [];
    for (const item of this.items) {
      rv.push(...item.resolve(nodes));
    }
    return new JSONPathNodeList(rv);
  }

  public toString(): string {
    return `[${this.items.map((itm) => itm.toString()).join(", ")}]`;
  }
}
