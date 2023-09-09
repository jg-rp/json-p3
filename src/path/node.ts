import { JSONValue, isString } from "../types";

/**
 * The pair of a JSON value and its location found in the target JSON value.
 */
export class JSONPathNode {
  /**
   * The normalized path to this node in the target JSON value.
   */
  readonly path: string;

  /**
   * @param value - The JSON value found at _location_.
   * @param location - The parts of a normalized path to _value_.
   * @param root - The target value at the top of the JSON node tree.
   */
  constructor(
    readonly value: JSONValue,
    readonly location: Array<string | number>,
    readonly root: JSONValue,
  ) {
    this.path =
      // eslint-disable-next-line prefer-template
      "$" + location.map((s) => (isString(s) ? `['${s}']` : `[${s}]`)).join("");
  }
}

/**
 *
 */
export class JSONPathNodeList {
  constructor(readonly nodes: JSONPathNode[]) {}

  /**
   * @returns an iterator over nodes in the list.
   */
  [Symbol.iterator](): Iterator<JSONPathNode> {
    return this.nodes[Symbol.iterator]();
  }

  /**
   * @returns `true` if the node list is empty.
   */
  public empty(): boolean {
    return this.nodes.length === 0;
  }

  /**
   * @returns An array containing the values at each node in the list.
   *
   * @see {@link valuesOrSingular} to unpack the array if there is only
   * one node in the list.
   */
  public values(): JSONValue[] {
    return this.nodes.map((node) => node.value);
  }

  /**
   * Like {@link values}, but returns the node's value is there is only one
   * node in the list.
   */
  public valuesOrSingular(): JSONValue {
    if (this.nodes.length === 1) return this.nodes[0].value;
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

  /**
   * @returns An array of normalized path strings for each node in the list.
   *
   * A normalized path contains only property name and index selectors, and
   * always uses bracketed segments, never shorthand selectors.
   */
  public paths(): string[] {
    return this.nodes.map((node) => node.path);
  }

  /**
   * @returns The number of nodes in the node list.
   */
  public get length(): number {
    return this.nodes.length;
  }
}
