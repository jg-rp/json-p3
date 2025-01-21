import { isArray, isObject, isString } from "../types";
import { JSONPathEnvironment } from "./environment";
import { JSONPathRecursionLimitError } from "./errors";
import { JSONPathNode } from "./node";
import { JSONPathSelector, NameSelector } from "./selectors";
import { Token } from "./token";
import {
  type SerializationOptions,
  defaultSerializationOptions,
} from "./types";

/** Base class for all JSONPath segments. Both shorthand and bracketed. */
export abstract class JSONPathSegment {
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly token: Token,
    readonly selectors: JSONPathSelector[],
  ) {}

  /**
   * @param nodes - Nodes matched by preceding segments.
   */
  public abstract resolve(nodes: JSONPathNode[]): JSONPathNode[];

  /**
   * @param nodes - Nodes matched by preceding segments.
   */
  public abstract lazyResolve(
    nodes: Iterable<JSONPathNode>,
  ): Generator<JSONPathNode>;

  /**
   * Return a string representation of this segment.
   */
  public abstract toString(options?: SerializationOptions): string;
}

/** The child selection segment. */
export class ChildSegment extends JSONPathSegment {
  public resolve(nodes: JSONPathNode[]): JSONPathNode[] {
    const rv: JSONPathNode[] = [];
    for (const node of nodes) {
      for (const selector of this.selectors) {
        rv.push(...selector.resolve(node));
      }
    }
    return rv;
  }

  public *lazyResolve(nodes: Iterable<JSONPathNode>): Generator<JSONPathNode> {
    for (const node of nodes) {
      for (const selector of this.selectors) {
        yield* selector.resolve(node);
      }
    }
  }

  public toString(options?: SerializationOptions): string {
    const { form } = { ...defaultSerializationOptions, ...options };

    if (
      form === "pretty" &&
      this.selectors.length === 1 &&
      this.selectors[0] instanceof NameSelector
    ) {
      const shorthand = this.selectors[0].shorthand();
      if (shorthand != null) return `.${shorthand}`;
    }

    return `[${this.selectors.map((s) => s.toString(options)).join(", ")}]`;
  }
}

/** The recursive descent segment. */
export class DescendantSegment extends JSONPathSegment {
  public resolve(nodes: JSONPathNode[]): JSONPathNode[] {
    const rv: JSONPathNode[] = [];

    const visitor = (
      this.environment.nondeterministic
        ? this.nondeterministicVisit
        : this.visit
    ).bind(this);

    for (const node of nodes) {
      for (const _node of visitor(node)) {
        for (const selector of this.selectors) {
          rv.push(...selector.resolve(_node));
        }
      }
    }

    return rv;
  }

  public *lazyResolve(nodes: Iterable<JSONPathNode>): Generator<JSONPathNode> {
    for (const node of nodes) {
      for (const _node of this.visit(node)) {
        for (const selector of this.selectors) {
          yield* selector.resolve(_node);
        }
      }
    }
  }

  public toString(options?: SerializationOptions): string {
    return `..[${this.selectors.map((s) => s.toString(options)).join(", ")}]`;
  }

  private *visit(
    node: JSONPathNode,
    depth: number = 1,
  ): Generator<JSONPathNode> {
    if (depth >= this.environment.maxRecursionDepth) {
      throw new JSONPathRecursionLimitError(
        "recursion limit reached",
        this.token,
      );
    }

    yield node;

    if (isArray(node.value)) {
      for (let i = 0; i < node.value.length; i++) {
        const _node = new JSONPathNode(
          node.value[i],
          node.location.concat(i),
          node.root,
        );
        yield* this.visit(_node, depth + 1);
      }
    } else if (isObject(node.value)) {
      for (const [key, value] of this.environment.entries(node.value)) {
        const _node = new JSONPathNode(
          value,
          node.location.concat(key),
          node.root,
        );
        yield* this.visit(_node, depth + 1);
      }
    }
  }

  private *nondeterministicVisit(
    root: JSONPathNode,
    depth: number = 1,
  ): Generator<JSONPathNode> {
    let queue: Array<[JSONPathNode, number]> = Array.from(
      this.nondeterministicChildren(root),
    ).map((node) => [node, depth]);

    yield root;

    while (queue.length) {
      const [node, _depth] = queue.shift() as [JSONPathNode, number];
      yield node;

      if (_depth >= this.environment.maxRecursionDepth) {
        throw new JSONPathRecursionLimitError(
          "recursion limit reached",
          this.token,
        );
      }

      // Visit child nodes now or queue them for later?
      const visitChildren = Math.random() < 0.5;

      for (const child of this.nondeterministicChildren(node)) {
        if (visitChildren) {
          yield child;

          const grandchildren: Array<[JSONPathNode, number]> = Array.from(
            this.nondeterministicChildren(child),
          ).map((n) => [n, _depth + 2]);

          queue = interleave(queue, grandchildren);
        } else {
          queue.push([child, _depth + 1]);
        }
      }
    }
  }

  private *nondeterministicChildren(
    node: JSONPathNode,
  ): Generator<JSONPathNode> {
    if (isString(node.value)) return;
    if (isArray(node.value)) {
      for (let i = 0; i < node.value.length; i++) {
        yield new JSONPathNode(
          node.value[i],
          node.location.concat(i),
          node.root,
        );
      }
    } else if (isObject(node.value)) {
      for (const [key, value] of this.environment.entries(node.value)) {
        yield new JSONPathNode(value, node.location.concat(key), node.root);
      }
    }
  }
}

/**
 * Randomly interleave elements from two arrays while maintaining relative
 * order of each input array.
 *
 * If _arrayA_ is empty, _arrayB_ is returned, and vice versa.
 */
function interleave<T, U>(arrayA: T[], arrayB: U[]): Array<T | U> {
  if (arrayA.length === 0) {
    return arrayB;
  }

  if (arrayB.length === 0) {
    return arrayA;
  }

  // An array of iterators
  const iterators: Array<Iterator<T> | Iterator<U>> = [];
  const itA = arrayA[Symbol.iterator]();
  const itB = arrayB[Symbol.iterator]();

  for (let i = 0; i < arrayA.length; i++) {
    iterators.push(itA);
  }

  for (let i = 0; i < arrayB.length; i++) {
    iterators.push(itB);
  }

  shuffle(iterators);
  return iterators.map((it) => it.next().value);
}

function shuffle<T>(entries: T[]): T[] {
  for (let i = entries.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [entries[i], entries[j]] = [entries[j], entries[i]];
  }
  return entries;
}
