import { JSONPointer } from "../pointer";
import { isString, type JSONLike } from "../types";
import { canonicalString, RE_IDENT, shorthandString } from "./serialize";

export type InternalNode = {
  value: JSONLike;
  location: Array<string | number>;
  parent: InternalNode | undefined;
};

export class InternalNodeList {
  readonly length: number;

  constructor(readonly nodes: InternalNode[]) {
    this.length = nodes.length;
  }
}

export class BasicNodeList {
  readonly length: number;

  constructor(readonly nodes: JSONLike[]) {
    this.length = nodes.length;
  }
}

export class JSONPathNode {
  readonly value: JSONLike;
  readonly location: Array<string | number>;
  private parent: InternalNode | undefined;

  constructor(node: InternalNode) {
    this.value = node.value;
    this.location = node.location;
    this.parent = node.parent;
  }

  normalizedPath(): string {
    let normalized: string = "$";
    let part: string | number;

    for (let i = 0; i < this.location.length; i++) {
      part = this.location[i]!;
      if (isString(part)) {
        if (part.startsWith("~")) {
          normalized += `[~${canonicalString(part.slice(1))}]`;
        } else {
          normalized += `[${canonicalString(part)}]`;
        }
      } else {
        normalized += `[${part}]`;
      }
    }

    return normalized;
  }

  shorthandPath(): string {
    let path: string = "$";
    let part: string | number;

    for (let i = 0; i < this.location.length; i++) {
      part = this.location[i]!;
      if (isString(part)) {
        if (part.startsWith("~")) {
          part = part.slice(1);
          path += RE_IDENT.test(part) ? `.~${part}` : `[~${shorthandString(part)}]`;
        } else {
          path += RE_IDENT.test(part) ? `.${part}` : `[${shorthandString(part)}]`;
        }
      } else {
        path += `[${part}]`;
      }
    }

    return path;
  }

  parentNode(): JSONPathNode | undefined {
    return this.parent ? new JSONPathNode(this.parent) : undefined;
  }

  /**
   * Return this node's location as a {@link JSONPointer}.
   */
  toPointer(): JSONPointer {
    return new JSONPointer(this.location.map(String));
  }
}

export class JSONPathNodeList {
  readonly length: number;

  constructor(readonly nodes: JSONPathNode[]) {
    this.length = nodes.length;
  }

  /**
   * @returns an iterator over nodes in the list.
   */
  [Symbol.iterator](): Iterator<JSONPathNode> {
    return this.nodes[Symbol.iterator]();
  }

  /**
   * @returns An array containing the values at each node in the list.
   */
  public values(): JSONLike[] {
    return this.nodes.map((node) => node.value);
  }

  /**
   * @returns An array of locations for each node in the node list.
   *
   * A location is an array of property names and array indices that were
   * required to reach the node's value in the target JSON value.
   */
  public locations(): Array<Array<string | number>> {
    return this.nodes.map((node) => node.location);
  }

  public entries(): Array<[string, JSONLike]> {
    return this.nodes.map((node) => [node.normalizedPath(), node.value]);
  }

  /**
   * @returns An array of normalized path strings for each node in the list.
   *
   * A normalized path contains only property name and index selectors, and
   * always uses bracketed segments, never shorthand selectors.
   */
  public normalizedPaths(): string[] {
    return this.nodes.map((node) => node.normalizedPath());
  }

  public shorthandPaths(): string[] {
    return this.nodes.map((node) => node.shorthandPath());
  }

  /**
   * @returns An array of {@link JSONPointer} instances, one for each node
   * in the list.
   */
  pointers(): JSONPointer[] {
    return this.nodes.map((node) => node.toPointer());
  }
}
