import { JSONPointer } from "../pointer";
import { JSONValue, isString } from "../types";
import { toCanonical, toQuoted, toShorthand } from "./serialize";
import {
  type SerializationOptions,
  defaultSerializationOptions,
  KEY_MARK,
} from "./types";

/**
 * The pair of a JSON value and its location found in the target JSON value.
 */
export class JSONPathNode {
  /**
   * @param value - The JSON value found at _location_.
   * @param location - The parts of a normalized path to _value_.
   * @param root - The target value at the top of the JSON node tree.
   */
  constructor(
    readonly value: JSONValue,
    readonly location: Array<string | number>,
    readonly root: JSONValue,
  ) {}

  /**
   * @deprecated Use {@link getPath} with `options.form` set to `canonical` instead.
   */
  public get path(): string {
    return this.getPath({ form: "canonical" });
  }

  /**
   * Get the path to this node in the target JSON value.
   *
   * Given that the path refers to the singular current node, the returned path
   * will always be a normalized path if `options.form` is set to `canonical`,
   * following section 2.7 of RFC 9535.
   */
  public getPath(options?: SerializationOptions): string {
    const opts = { ...defaultSerializationOptions, ...options };

    return (
      // eslint-disable-next-line prefer-template
      "$" +
      this.location
        .map((s) => (isString(s) ? this.decodeNameLocation(s, opts) : `[${s}]`))
        .join("")
    );
  }

  /**
   * Return this node's location as a {@link JSONPointer}.
   */
  public toPointer(): JSONPointer {
    if (!this.location.length) {
      return new JSONPointer("");
    }
    return new JSONPointer(JSONPointer.encode(this.location.map(String)));
  }

  private decodeNameLocation(
    name: string,
    options: SerializationOptions,
  ): string {
    const normalized = options.form === "canonical";
    const serialize = normalized ? toCanonical : toQuoted;
    const hasKeyMark = name.startsWith(KEY_MARK);
    if (hasKeyMark) name = name.slice(1);
    const shorthand = toShorthand(name);

    if (hasKeyMark) {
      return normalized || shorthand == null
        ? `[~${serialize(name)}]`
        : `.~${shorthand}`;
    }

    return normalized || shorthand == null
      ? `[${serialize(name)}]`
      : `.${shorthand}`;
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
  public paths(options?: SerializationOptions): string[] {
    return this.nodes.map((node) => node.getPath(options));
  }

  /**
   * @returns An array of {@link JSONPointer} instances, one for each node
   * in the list.
   */
  public pointers(): JSONPointer[] {
    return this.nodes.map((node) => node.toPointer());
  }

  /**
   * @returns The number of nodes in the node list.
   */
  public get length(): number {
    return this.nodes.length;
  }
}
