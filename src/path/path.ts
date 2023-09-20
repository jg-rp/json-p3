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
   * Return a {@link JSONPathNode} instance for the first object found in
   * _value_ matching this query.
   *
   * @param value - JSON-like data to which this query will be applied.
   * @returns The first node in _value_ matching this query, or `undefined` if
   * there are no matches.
   */
  public match(value: JSONValue): JSONPathNode | undefined {
    return this.query(value).nodes.at(0);
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
