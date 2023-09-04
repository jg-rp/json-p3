import { JSONPathEnvironment } from "./environment";
import { JSONPathNode, JSONPathNodeList } from "./node";
import { JSONPathSelector } from "./selectors";
import { JSONValue } from "./types";

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
    let nodes = new JSONPathNodeList([new JSONPathNode(value, ["$"], value)]);
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
}
