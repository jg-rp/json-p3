import type { JSONValue } from "../types.js";
import type { Segment } from "./ast.js";
import type { JSONPathEnvironment } from "./environment.js";

import { JSONPathNode } from "./nodes.js";
import { BasicResolver } from "./resolver_basic.js";
import { StandardResolver } from "./resolver_standard.js";
import { canonicalPath, shorthandPath } from "./serialize.js";

export class JSONPathQuery {
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly segments: Segment[],
  ) {}

  find(data: JSONValue): JSONPathNode[] {
    const nodes = new StandardResolver(this.environment, data).resolve(this.segments);
    return nodes.map((node) => new JSONPathNode(node));
  }

  *findIter(data: JSONValue): IterableIterator<JSONPathNode> {
    const it = new StandardResolver(this.environment, data).resolveIter(this.segments);
    for (const node of it) {
      yield new JSONPathNode(node);
    }
  }

  /**
   * @deprecated Use {@link find} instead.
   */
  query(data: JSONValue): JSONPathNode[] {
    return this.find(data);
  }

  /**
   * @deprecated Use {@link findIter} instead.
   */
  lazyQuery(data: JSONValue): IterableIterator<JSONPathNode> {
    return this.findIter(data);
  }

  findAll(data: JSONValue): JSONValue[] {
    return new BasicResolver(this.environment, data).resolve(this.segments);
  }

  findAllIter(data: JSONValue): IterableIterator<JSONValue> {
    return new BasicResolver(this.environment, data).resolveIter(this.segments);
  }

  findOne(data: JSONValue): JSONPathNode | undefined {
    const it = this.findIter(data);
    const rv = it.next();
    if (rv.done) return undefined;
    return rv.value;
  }

  /**
   * @deprecated Use {@link findOne} instead.
   */
  match(data: JSONValue): JSONPathNode | undefined {
    return this.findOne(data);
  }

  test(data: JSONValue): boolean {
    return this.findOne(data) !== undefined;
  }

  canonicalPath(): string {
    return canonicalPath(this.segments);
  }

  shorthandPath(): string {
    return shorthandPath(this.segments);
  }
}
