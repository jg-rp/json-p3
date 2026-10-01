import type { OpObject } from "../patch";

import { JSONPointer } from "../pointer";
import { isString, type JSONValue } from "../types";
import { canonicalString, RE_IDENT, shorthandString } from "./serialize";

/**
 * A light weight transient node used during JSONPath evaluation.
 */
export type InternalNode = {
  value: JSONValue;
  location: Array<string | number>;
  parent: InternalNode | undefined;
};

export class NodeList {
  readonly length: number;

  constructor(readonly nodes: InternalNode[]) {
    this.length = nodes.length;
  }
}

export class BasicNodeList {
  readonly length: number;

  constructor(readonly nodes: JSONValue[]) {
    this.length = nodes.length;
  }
}

/**
 * A JSON value and its location within a JSON document.
 */
export class JSONPathNode {
  readonly value: JSONValue;
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

  /**
   * Return this node's parent, or `undefined` if this node is the document root.
   */
  parentNode(): JSONPathNode | undefined {
    return this.parent ? new JSONPathNode(this.parent) : undefined;
  }

  /**
   * A JSON Pointer derived from this node's location.
   */
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

  /**
   * Return a JSON Pointer _add_ operation with the path set to this node.
   */
  addOp(value: JSONValue): OpObject {
    return { op: "add", path: this.toPointer().toString(), value };
  }

  /**
   * Return a JSON Pointer _remove_ operation with the path set to this node.
   */
  removeOp(): OpObject {
    return { op: "remove", path: this.toPointer().toString() };
  }

  /**
   * Return a JSON Pointer _replace_ operation with the path set to this node.
   */
  replaceOp(value: JSONValue): OpObject {
    return { op: "replace", path: this.toPointer().toString(), value };
  }

  /**
   * Return a JSON Pointer _move_ operation with _from_ set to this node.
   */
  moveOp(to: JSONPointer): OpObject {
    return { op: "move", from: this.toPointer().toString(), path: to.toString() };
  }

  /**
   * Return a JSON Pointer _copy_ operation with _from_ set to this node.
   */
  copyOp(to: JSONPointer): OpObject {
    return { op: "copy", from: this.toPointer().toString(), path: to.toString() };
  }

  /**
   * Return a JSON Pointer _test_ operation with the path set to this node.
   */
  testOp(value: JSONValue): OpObject {
    return { op: "test", path: this.toPointer().toString(), value };
  }
}
