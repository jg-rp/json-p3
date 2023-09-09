import { JSONPathEnvironment } from "./environment";
import { JSONPathNode, JSONPathNodeList } from "./node";
import {
  BracketedSelection,
  IndexSelector,
  JSONPathSelector,
  NameSelector,
} from "./selectors";
import { JSONValue } from "../types";

/**
 *
 */
export class JSONPath {
  /**
   *
   * @param environment -
   * @param selectors -
   */
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly selectors: JSONPathSelector[],
  ) {}

  /**
   *
   * @param value -
   * @returns
   */
  public query(value: JSONValue): JSONPathNodeList {
    let nodes = new JSONPathNodeList([new JSONPathNode(value, [], value)]);
    for (const selector of this.selectors) {
      nodes = selector.resolve(nodes);
    }
    return nodes;
  }

  /**
   *
   */
  public toString(): string {
    return `$${this.selectors.map((s) => s.toString()).join("")}`;
  }

  public singularQuery(): boolean {
    for (const selector of this.selectors) {
      if (selector instanceof NameSelector) continue;
      if (
        selector instanceof BracketedSelection &&
        selector.items.length === 1 &&
        (selector.items[0] instanceof NameSelector ||
          selector.items[0] instanceof IndexSelector)
      )
        continue;
      return false;
    }
    return true;
  }
}
