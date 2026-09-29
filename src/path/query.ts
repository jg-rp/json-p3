import type { JSONLike } from "../types";
import type { Segment } from "./ast";
import type { JSONPathEnvironment } from "./environment";

import { JSONPathNode } from "./nodes";
import { BasicResolver } from "./resolver_basic";
import { StandardResolver } from "./resolver_standard";
import { canonicalPath, shorthandPath } from "./serialize";

export class JSONPathQuery {
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly segments: Segment[],
  ) {}

  find(data: JSONLike): JSONPathNode[] {
    const nodes = new StandardResolver(this.environment, data).resolve(this.segments);
    return nodes.map((node) => new JSONPathNode(node));
  }

  *findIter(data: JSONLike): IterableIterator<JSONPathNode> {
    const it = new StandardResolver(this.environment, data).resolveIter(this.segments);
    for (const node of it) {
      yield new JSONPathNode(node);
    }
  }

  /**
   * @deprecated Use {@link find} instead.
   */
  query(data: JSONLike): JSONPathNode[] {
    return this.find(data);
  }

  /**
   * @deprecated Use {@link findIter} instead.
   */
  lazyQuery(data: JSONLike): IterableIterator<JSONPathNode> {
    return this.findIter(data);
  }

  findAll(data: JSONLike): JSONLike[] {
    return new BasicResolver(this.environment, data).resolve(this.segments);
  }

  findAllIter(data: JSONLike): IterableIterator<JSONLike> {
    return new BasicResolver(this.environment, data).resolveIter(this.segments);
  }

  findOne(data: JSONLike): JSONPathNode | undefined {
    const it = this.findIter(data);
    const rv = it.next();
    if (rv.done) return undefined;
    return rv.value;
  }

  /**
   * @deprecated Use {@link findOne} instead.
   */
  match(data: JSONLike): JSONPathNode | undefined {
    return this.findOne(data);
  }

  test(data: JSONLike): boolean {
    return this.findOne(data) !== undefined;
  }

  canonicalPath(): string {
    return canonicalPath(this.segments);
  }

  shorthandPath(): string {
    return shorthandPath(this.segments);
  }
}
