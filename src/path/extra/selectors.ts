import { isArray, isObject, isString } from "../../types";
import { JSONPathEnvironment } from "../environment";
import { LogicalExpression } from "../expression";
import { JSONPathNode } from "../node";
import { JSONPathSelector } from "../selectors";
import { Token } from "../token";
import { FilterContext, KEY_MARK, hasStringKey } from "../types";

export class KeySelector extends JSONPathSelector {
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly token: Token,
    readonly key: string,
  ) {
    super(environment, token);
  }

  public resolve(node: JSONPathNode): JSONPathNode[] {
    const rv: JSONPathNode[] = [];
    if (node.value instanceof String || isArray(node.value)) return rv;
    if (isObject(node.value) && hasStringKey(node.value, this.key)) {
      rv.push(
        new JSONPathNode(
          this.key,
          node.location.concat(`${KEY_MARK}${this.key}`),
          node.root,
        ),
      );
    }
    return rv;
  }

  public *lazyResolve(node: JSONPathNode): Generator<JSONPathNode> {
    if (
      !isString(node.value) &&
      isObject(node.value) &&
      hasStringKey(node.value, this.key)
    ) {
      yield new JSONPathNode(
        this.key,
        node.location.concat(`${KEY_MARK}${this.key}`),
        node.root,
      );
    }
  }

  public toString(): string {
    return `~'${this.key.replaceAll("'", "\\'")}'`;
  }
}

/**
 * Object property name selector or array index selector.
 */
export class KeysSelector extends JSONPathSelector {
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly token: Token,
  ) {
    super(environment, token);
  }

  public resolve(node: JSONPathNode): JSONPathNode[] {
    const rv: JSONPathNode[] = [];
    if (node.value instanceof String || isArray(node.value)) return rv;
    if (isObject(node.value)) {
      for (const [key, _] of this.environment.entries(node.value)) {
        rv.push(
          new JSONPathNode(
            key,
            node.location.concat(`${KEY_MARK}${key}`),
            node.root,
          ),
        );
      }
    }
    return rv;
  }

  public *lazyResolve(node: JSONPathNode): Generator<JSONPathNode> {
    if (isObject(node.value) && !isString(node.value) && !isArray(node.value)) {
      for (const [key, _] of this.environment.entries(node.value)) {
        yield new JSONPathNode(
          key,
          node.location.concat(`${KEY_MARK}${key}`),
          node.root,
        );
      }
    }
  }

  public toString(): string {
    return "~";
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

  public resolve(node: JSONPathNode): JSONPathNode[] {
    const rv: JSONPathNode[] = [];
    if (node.value instanceof String || isArray(node.value)) return rv;
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
              node.location.concat(`${KEY_MARK}${key}`),
              node.root,
            ),
          );
        }
      }
    }
    return rv;
  }

  public *lazyResolve(node: JSONPathNode): Generator<JSONPathNode> {
    if (node.value instanceof String || isArray(node.value)) return;
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
            node.location.concat(`${KEY_MARK}${key}`),
            node.root,
          );
        }
      }
    }
  }

  public toString(): string {
    return `~?${this.expression.toString()}`;
  }
}
