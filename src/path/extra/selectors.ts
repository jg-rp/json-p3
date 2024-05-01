import { isArray, isObject } from "../../types";
import { JSONPathEnvironment } from "../environment";
import { LogicalExpression } from "../expression";
import { JSONPathNode } from "../node";
import { JSONPathSelector } from "../selectors";
import { Token } from "../token";
import { FilterContext, hasStringKey } from "../types";

const KEY_MARKER = "\x02";

export class KeySelector extends JSONPathSelector {
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly token: Token,
    readonly key: string,
    readonly shorthand: boolean = false,
  ) {
    super(environment, token);
  }

  public resolve(nodes: JSONPathNode[]): JSONPathNode[] {
    const rv: JSONPathNode[] = [];
    for (const node of nodes) {
      if (node.value instanceof String || isArray(node.value)) continue;
      if (isObject(node.value) && hasStringKey(node.value, this.key)) {
        rv.push(
          new JSONPathNode(
            this.key,
            node.location.concat(`${KEY_MARKER}${this.key}`),
            node.root,
          ),
        );
      }
    }
    return rv;
  }

  public *lazyResolve(nodes: Iterable<JSONPathNode>): Generator<JSONPathNode> {
    for (const node of nodes) {
      if (node.value instanceof String || isArray(node.value)) continue;
      if (isObject(node.value) && hasStringKey(node.value, this.key)) {
        yield new JSONPathNode(
          this.key,
          node.location.concat(`${KEY_MARKER}${this.key}`),
          node.root,
        );
      }
    }
  }

  public toString(): string {
    return this.shorthand
      ? `[~'${this.key.replaceAll("'", "\\'")}']`
      : `~'${this.key.replaceAll("'", "\\'")}'`;
  }
}

/**
 * Object property name selector or array index selector.
 */
export class KeysSelector extends JSONPathSelector {
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly token: Token,
    readonly shorthand: boolean = false,
  ) {
    super(environment, token);
  }

  public resolve(nodes: JSONPathNode[]): JSONPathNode[] {
    const rv: JSONPathNode[] = [];
    for (const node of nodes) {
      if (node.value instanceof String || isArray(node.value)) continue;
      if (isObject(node.value)) {
        for (const [key, _] of this.environment.entries(node.value)) {
          rv.push(
            new JSONPathNode(
              key,
              node.location.concat(`${KEY_MARKER}${key}`),
              node.root,
            ),
          );
        }
      }
    }
    return rv;
  }

  public *lazyResolve(nodes: Iterable<JSONPathNode>): Generator<JSONPathNode> {
    for (const node of nodes) {
      if (node.value instanceof String || isArray(node.value)) continue;
      if (isObject(node.value)) {
        for (const [key, _] of this.environment.entries(node.value)) {
          yield new JSONPathNode(
            key,
            node.location.concat(`${KEY_MARKER}${key}`),
            node.root,
          );
        }
      }
    }
  }

  public toString(): string {
    return this.shorthand ? "[~]" : "~";
  }
}

export class KeysFilterSelector extends JSONPathSelector {
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly token: Token,
    readonly expression: LogicalExpression,
  ) {
    super(environment, token);
  }

  public resolve(nodes: JSONPathNode[]): JSONPathNode[] {
    const rv: JSONPathNode[] = [];
    for (const node of nodes) {
      if (node.value instanceof String || isArray(node.value)) continue;
      if (isObject(node.value)) {
        for (const [key, value] of this.environment.entries(node.value)) {
          const filterContext: FilterContext = {
            environment: this.environment,
            currentValue: value,
            rootValue: node.root,
            currentKey: key,
          };
          if (this.expression.evaluate(filterContext)) {
            rv.push(
              new JSONPathNode(
                key,
                node.location.concat(`${KEY_MARKER}${key}`),
                node.root,
              ),
            );
          }
        }
      }
    }
    return rv;
  }

  public *lazyResolve(nodes: Iterable<JSONPathNode>): Generator<JSONPathNode> {
    for (const node of nodes) {
      if (node.value instanceof String || isArray(node.value)) continue;
      if (isObject(node.value)) {
        for (const [key, value] of this.environment.entries(node.value)) {
          const filterContext: FilterContext = {
            environment: this.environment,
            currentValue: value,
            rootValue: node.root,
            lazy: true,
            currentKey: key,
          };
          if (this.expression.evaluate(filterContext)) {
            yield new JSONPathNode(
              key,
              node.location.concat(`${KEY_MARKER}${key}`),
              node.root,
            );
          }
        }
      }
    }
  }

  public toString(): string {
    return `~?${this.expression.toString()}`;
  }
}
