import { JSONPathEnvironment } from "./environment";
import { JSONPathNode, JSONPathNodeList } from "./node";
import { IndexSelector, NameSelector } from "./selectors";
import { JSONValue } from "../types";
import { JSONPathSegment, DescendantSegment } from "./segments";

/**
 *
 */
export class JSONPathQuery {
  /**
   *
   * @param environment -
   * @param segments -
   */
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly segments: JSONPathSegment[],
  ) {}

  /**
   *
   * @param value -
   * @returns
   */
  public query(value: JSONValue): JSONPathNodeList {
    let nodes = [new JSONPathNode(value, [], value)];
    for (const segment of this.segments) {
      nodes = segment.resolve(nodes);
    }
    return new JSONPathNodeList(nodes);
  }

  /**
   *
   * @param value -
   * @returns
   */
  public lazyQuery(value: JSONValue): IterableIterator<JSONPathNode> {
    let nodes: IterableIterator<JSONPathNode> = [
      new JSONPathNode(value, [], value),
    ][Symbol.iterator]();
    for (const segment of this.segments) {
      nodes = segment.lazyResolve(nodes);
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
    const it = this.lazyQuery(value);
    const rv = it.next();
    if (rv.done) return undefined;
    return rv.value;
  }

  /**
   *
   */
  public toString(): string {
    return `$${this.segments.map((s) => s.toString()).join("")}`;
  }

  public singularQuery(): boolean {
    for (const segment of this.segments) {
      if (segment instanceof DescendantSegment) return false;

      if (
        segment.selectors.length === 1 &&
        (segment.selectors[0] instanceof NameSelector ||
          segment.selectors[0] instanceof IndexSelector)
      ) {
        continue;
      }
      return false;
    }
    return true;
  }
}
