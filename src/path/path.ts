import { JSONPathEnvironment } from "./environment";
import { JSONPathNode, JSONPathNodeList } from "./node";
import { IndexSelector, NameSelector } from "./selectors";
import { JSONValue } from "../types";
import { JSONPathSegment, DescendantSegment } from "./segments";
import { SerializationOptions } from "./types";

/**
 * A compiled JSONPath query ready to be applied to different data repeatedly.
 */
export class JSONPathQuery {
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly segments: JSONPathSegment[],
  ) {}

  /**
   * Apply this JSONPath query to _value_.
   * @param value - A JSON-like object to apply this query to.
   * @returns Nodes matched by applying this query to _value_.
   */
  public query(value: JSONValue): JSONPathNodeList {
    let nodes = [new JSONPathNode(value, [], value)];
    for (const segment of this.segments) {
      nodes = segment.resolve(nodes);
    }
    return new JSONPathNodeList(nodes);
  }

  /**
   * Apply this JSONPath query to _value_.
   * @param value - A JSON-like object to apply this query to.
   * @returns An iterator over nodes matched by applying this query to _value_.
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
   * Return a string representation of this query.
   */
  public toString(options?: SerializationOptions): string {
    return `$${this.segments.map((s) => s.toString(options)).join("")}`;
  }

  /**
   * Return `true` if this query is a _singular query_, or `false` otherwise.
   */
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
