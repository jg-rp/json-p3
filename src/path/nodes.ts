import type { OpObject } from "../patch";

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
  private ptr?: JSONPointer;

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

  get pointer(): JSONPointer {
    if (!this.ptr) {
      this.ptr = new JSONPointer(this.location.map(String));
    }
    return this.ptr;
  }

  /**
   * Return this node's location as a {@link JSONPointer}.
   */
  toPointer(): JSONPointer {
    return new JSONPointer(this.location.map(String));
  }

  addOp(value: JSONLike): OpObject {
    return { op: "add", path: this.toPointer().toString(), value };
  }

  removeOp(): OpObject {
    return { op: "remove", path: this.toPointer().toString() };
  }

  replaceOp(value: JSONLike): OpObject {
    return { op: "replace", path: this.toPointer().toString(), value };
  }

  moveOp(to: JSONPointer): OpObject {
    return { op: "move", from: this.toPointer().toString(), path: to.toString() };
  }

  copyOp(to: JSONPointer): OpObject {
    return { op: "copy", from: this.toPointer().toString(), path: to.toString() };
  }

  testOp(value: JSONLike): OpObject {
    return { op: "test", path: this.toPointer().toString(), value };
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

  map<U>(callback: (value: JSONPathNode, index: number, array: JSONPathNode[]) => U): U[] {
    return this.nodes.map(callback);
  }

  /**
   * @returns An array containing the values at each node in the list.
   */
  values(): JSONLike[] {
    return this.nodes.map((node) => node.value);
  }

  /**
   * @returns An array of locations for each node in the node list.
   *
   * A location is an array of property names and array indices that were
   * required to reach the node's value in the target JSON value.
   */
  locations(): Array<Array<string | number>> {
    return this.nodes.map((node) => node.location);
  }

  entries(): Array<[string, JSONLike]> {
    return this.nodes.map((node) => [node.normalizedPath(), node.value]);
  }

  /**
   * @returns An array of normalized path strings for each node in the list.
   *
   * A normalized path contains only property name and index selectors, and
   * always uses bracketed segments, never shorthand selectors.
   */
  normalizedPaths(): string[] {
    return this.nodes.map((node) => node.normalizedPath());
  }

  shorthandPaths(): string[] {
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
