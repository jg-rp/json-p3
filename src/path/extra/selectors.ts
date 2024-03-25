import { isArray, isObject } from "../../types";
import { JSONPathEnvironment } from "../environment";
import { JSONPathNode } from "../node";
import { JSONPathSelector } from "../selectors";
import { Token } from "../token";

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
      if (node.value instanceof String) continue;
      if (isArray(node.value)) {
        for (let i = 0; i < node.value.length; i++) {
          rv.push(
            new JSONPathNode(i, node.location.concat(`[~][${i}]`), node.root),
          );
        }
      } else if (isObject(node.value)) {
        let i = 0;
        for (const [key, _] of this.environment.entries(node.value)) {
          rv.push(
            new JSONPathNode(key, node.location.concat(`[~][${i}]`), node.root),
          );
          i++;
        }
      }
    }
    return rv;
  }

  public *lazyResolve(nodes: Iterable<JSONPathNode>): Generator<JSONPathNode> {
    for (const node of nodes) {
      if (node.value instanceof String) continue;
      if (isArray(node.value)) {
        for (let i = 0; i < node.value.length; i++) {
          yield new JSONPathNode(
            i,
            node.location.concat(`[~][${i}]`),
            node.root,
          );
        }
      } else if (isObject(node.value)) {
        let i = 0;
        for (const [key, _] of this.environment.entries(node.value)) {
          yield new JSONPathNode(
            key,
            node.location.concat(`[~][${i}]`),
            node.root,
          );
          i++;
        }
      }
    }
  }

  public toString(): string {
    return this.shorthand ? "[~]" : "~";
  }
}
