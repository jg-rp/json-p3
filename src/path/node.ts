import { JSONValue } from "./types";

/**
 * The pair of a value and its location.
 */
export class JSONPathNode {
  readonly path: string;

  /**
   * @param value - The JSON value found at _location_.
   * @param location - The parts of a normalized path to _value_.
   * @param root - The target value at the top of the JSON node tree.
   */
  constructor(
    readonly value: JSONValue,
    readonly location: string[], // TODO: change to string | number
    readonly root: JSONValue,
  ) {
    this.path = location.map((s) => `[${s}]`).join(""); // XXX:
  }
}

/**
 *
 */
export class JSONPathNodeList {
  constructor(readonly nodes: JSONPathNode[]) {}

  [Symbol.iterator](): Iterator<JSONPathNode> {
    return this.nodes[Symbol.iterator]();
  }

  /**
   *
   * @returns
   */
  public empty(): boolean {
    return this.nodes.length === 0;
  }

  /**
   *
   * @returns
   */
  public values(): JSONValue[] {
    return this.nodes.map((node) => node.value);
  }

  /**
   *
   * @returns
   */
  public valuesOrSingular(): JSONValue {
    if (this.nodes.length === 1) return this.nodes[0].value;
    return this.nodes.map((node) => node.value);
  }

  public get length(): number {
    return this.nodes.length;
  }
}
