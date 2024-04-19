import { JSONPathEnvironment } from "./environment";
import { JSONPathIndexError, JSONPathRecursionLimitError } from "./errors";
import { LogicalExpression } from "./expression";
import { JSONPathNode } from "./node";
import { Token } from "./token";
import { FilterContext, hasStringKey } from "./types";
import { isArray, isObject, JSONValue } from "../types";

/**
 * Base class for all JSONPath segments and selectors.
 */
export abstract class JSONPathSelector {
  /**
   * @param token - The token at the start of this selector.
   */
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly token: Token,
  ) {}

  /**
   * @param nodes - Nodes matched by preceding selectors.
   */
  public abstract resolve(nodes: JSONPathNode[]): JSONPathNode[];

  /**
   * @param nodes - Nodes matched by preceding selectors.
   */
  public abstract lazyResolve(
    nodes: Iterable<JSONPathNode>,
  ): Generator<JSONPathNode>;

  /**
   * Return a canonical string representation of this selector.
   */
  public abstract toString(): string;
}

/**
 * Shorthand and quoted name selector.
 */
export class NameSelector extends JSONPathSelector {
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly token: Token,
    readonly name: string,
    readonly shorthand: boolean,
  ) {
    super(environment, token);
  }

  public resolve(nodes: JSONPathNode[]): JSONPathNode[] {
    const rv: JSONPathNode[] = [];
    for (const node of nodes) {
      if (!isArray(node.value) && hasStringKey(node.value, this.name)) {
        rv.push(
          new JSONPathNode(
            node.value[this.name],
            node.location.concat(this.name),
            node.root,
          ),
        );
      }
    }
    return rv;
  }

  public *lazyResolve(nodes: Iterable<JSONPathNode>): Generator<JSONPathNode> {
    for (const node of nodes) {
      if (!isArray(node.value) && hasStringKey(node.value, this.name)) {
        yield new JSONPathNode(
          node.value[this.name],
          node.location.concat(this.name),
          node.root,
        );
      }
    }
  }

  public toString(): string {
    return this.shorthand ? `['${this.name}']` : `'${this.name}'`;
  }
}

/**
 * Array index selector.
 */
export class IndexSelector extends JSONPathSelector {
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly token: Token,
    readonly index: number,
  ) {
    super(environment, token);
    if (
      index < this.environment.minIntIndex ||
      index > this.environment.maxIntIndex
    ) {
      throw new JSONPathIndexError("index out of range", this.token);
    }
  }

  public resolve(nodes: JSONPathNode[]): JSONPathNode[] {
    const rv: JSONPathNode[] = [];
    for (const node of nodes) {
      if (isArray(node.value)) {
        const normIndex = this.normalizedIndex(node.value.length);
        if (normIndex in node.value) {
          rv.push(
            new JSONPathNode(
              node.value[normIndex],
              node.location.concat(normIndex),
              node.root,
            ),
          );
        }
      }
    }
    return rv;
  }

  public *lazyResolve(nodes: Iterable<JSONPathNode>): Generator<JSONPathNode> {
    for (const node of nodes) {
      if (isArray(node.value)) {
        const normIndex = this.normalizedIndex(node.value.length);
        if (normIndex in node.value) {
          yield new JSONPathNode(
            node.value[normIndex],
            node.location.concat(normIndex),
            node.root,
          );
        }
      }
    }
  }

  public toString(): string {
    return String(this.index);
  }

  private normalizedIndex(length: number): number {
    if (this.index < 0 && length >= Math.abs(this.index))
      return length + this.index;
    return this.index;
  }
}

export class SliceSelector extends JSONPathSelector {
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly token: Token,
    readonly start?: number,
    readonly stop?: number,
    readonly step?: number,
  ) {
    super(environment, token);
    this.checkRange(start, stop, step);
  }

  public resolve(nodes: JSONPathNode[]): JSONPathNode[] {
    const rv: JSONPathNode[] = [];
    for (const node of nodes) {
      if (!isArray(node.value)) continue;

      for (const [i, value] of this.slice(
        node.value,
        this.start,
        this.stop,
        this.step,
      )) {
        rv.push(new JSONPathNode(value, node.location.concat(i), node.root));
      }
    }
    return rv;
  }

  public *lazyResolve(nodes: Iterable<JSONPathNode>): Generator<JSONPathNode> {
    for (const node of nodes) {
      if (!isArray(node.value)) continue;

      for (const [i, value] of this.slice(
        node.value,
        this.start,
        this.stop,
        this.step,
      )) {
        yield new JSONPathNode(value, node.location.concat(i), node.root);
      }
    }
  }

  public toString(): string {
    const start = this.start ? this.start : "";
    const stop = this.stop ? this.stop : "";
    const step = this.step ? this.step : "1";
    return `${start}:${stop}:${step}`;
  }

  private checkRange(...indices: Array<number | undefined>): void {
    for (const index of indices) {
      if (
        index !== undefined &&
        (index < this.environment.minIntIndex ||
          index > this.environment.maxIntIndex)
      ) {
        throw new JSONPathIndexError("index out of range", this.token);
      }
    }
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  private slice(
    arr: JSONValue[],
    start?: number,
    stop?: number,
    step?: number,
  ): Array<[number, JSONValue]> {
    if (!arr.length) return [];

    // Handle negative start and stop values
    if (start === undefined || start === null) {
      start = step && step < 0 ? arr.length - 1 : 0;
    } else if (start < 0) {
      start = Math.max(arr.length + start, 0);
    } else {
      start = Math.min(start, arr.length - 1);
    }

    if (stop === undefined || stop === null) {
      stop = step && step < 0 ? -1 : arr.length;
    } else if (stop < 0) {
      stop = Math.max(arr.length + stop, -1);
    } else {
      stop = Math.min(stop, arr.length);
    }

    // Handle step value
    if (step === 0) {
      return [];
    }
    if (!step) {
      step = 1;
    }

    // Perform the slice
    const slicedArray: Array<[number, JSONValue]> = [];
    if (step > 0) {
      for (let i = start; i < stop; i += step) {
        slicedArray.push([i, arr[i]]);
      }
    } else {
      for (let i = start; i > stop; i += step) {
        slicedArray.push([i, arr[i]]);
      }
    }

    return slicedArray;
  }
}

export class WildcardSelector extends JSONPathSelector {
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly token: Token,
    readonly shorthand: boolean = false,
  ) {
    super(environment, token);
  }

  public resolve(nodes: JSONPathNode[]): JSONPathNode[] {
    const rv: JSONPathNode[] = [];
    for (const node of nodes) {
      if (node.value instanceof String) continue;
      if (isArray(node.value)) {
        for (let i = 0; i < node.value.length; i++) {
          rv.push(
            new JSONPathNode(node.value[i], node.location.concat(i), node.root),
          );
        }
      } else if (isObject(node.value)) {
        for (const [key, value] of this.environment.entries(node.value)) {
          rv.push(
            new JSONPathNode(value, node.location.concat(key), node.root),
          );
        }
      }
    }
    return rv;
  }

  public *lazyResolve(nodes: Iterable<JSONPathNode>): Generator<JSONPathNode> {
    for (const node of nodes) {
      if (node.value instanceof String) continue;
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

  public toString(): string {
    return this.shorthand ? "[*]" : "*";
  }
}

export class RecursiveDescentSegment extends JSONPathSelector {
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly token: Token,
    readonly selector: JSONPathSelector,
  ) {
    super(environment, token);
  }

  public resolve(nodes: JSONPathNode[]): JSONPathNode[] {
    const rv: JSONPathNode[] = [];

    if (this.environment.nondeterministic) {
      for (const root of nodes) {
        for (const node of this.nondeterministicVisitor(root)) {
          rv.push(node);
        }
      }
    } else {
      for (const node of nodes) {
        rv.push(node);
        for (const _node of this.visitor(node)) {
          rv.push(_node);
        }
      }
    }

    // console.log(JSON.stringify(rv.map((n: any) => n.value)));
    return this.selector.resolve(rv);
  }

  public *lazyResolve(nodes: Iterable<JSONPathNode>): Generator<JSONPathNode> {
    yield* this.selector.lazyResolve(this._lazyResolve(nodes));
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  protected *_lazyResolve(
    nodes: Iterable<JSONPathNode>,
  ): Generator<JSONPathNode> {
    for (const _node of nodes) {
      const stack: Array<{ node: JSONPathNode; depth: number }> = [
        { node: _node, depth: 0 },
      ];

      yield _node;

      while (stack.length) {
        const { node: currentNode, depth } = stack.pop() as {
          node: JSONPathNode;
          depth: number;
        };

        if (depth >= this.environment.maxRecursionDepth) {
          throw new JSONPathRecursionLimitError(
            "recursion limit reached",
            this.token,
          );
        }

        if (currentNode.value instanceof String) continue;

        if (isArray(currentNode.value)) {
          for (let i = 0; i < currentNode.value.length; i++) {
            const __node = new JSONPathNode(
              currentNode.value[i],
              currentNode.location.concat(i),
              currentNode.root,
            );

            yield __node;

            if (isObject(__node.value)) {
              stack.push({ node: __node, depth: depth + 1 });
            }
          }
        } else if (isObject(currentNode.value)) {
          for (const [key, value] of this.environment.entries(
            currentNode.value,
          )) {
            const __node = new JSONPathNode(
              value,
              currentNode.location.concat(key),
              currentNode.root,
            );

            yield __node;

            if (isObject(__node.value)) {
              stack.push({ node: __node, depth: depth + 1 });
            }
          }
        }
      }
    }
  }

  public toString(): string {
    return `..${this.selector.toString()}`;
  }

  private visitor(node: JSONPathNode, depth: number = 1): JSONPathNode[] {
    if (depth >= this.environment.maxRecursionDepth) {
      throw new JSONPathRecursionLimitError(
        "recursion limit reached",
        this.token,
      );
    }
    const rv: JSONPathNode[] = [];
    if (node.value instanceof String) return rv;
    if (isArray(node.value)) {
      for (let i = 0; i < node.value.length; i++) {
        const _node = new JSONPathNode(
          node.value[i],
          node.location.concat(i),
          node.root,
        );
        rv.push(_node);
        for (const __node of this.visitor(_node, depth + 1)) {
          rv.push(__node);
        }
      }
    } else if (isObject(node.value)) {
      for (const [key, value] of this.environment.entries(node.value)) {
        const _node = new JSONPathNode(
          value,
          node.location.concat(key),
          node.root,
        );
        rv.push(_node);
        for (const __node of this.visitor(_node, depth + 1)) {
          rv.push(__node);
        }
      }
    }

    return rv;
  }

  protected nondeterministicVisitor(
    root: JSONPathNode,
    depth: number = 1,
  ): JSONPathNode[] {
    const rv: JSONPathNode[] = [root];
    let queue: Array<[JSONPathNode, number]> = this.nondeterministicChildren(
      root,
    ).map((node) => [node, depth]);

    while (queue.length) {
      const [node, _depth] = queue.shift() as [JSONPathNode, number];
      rv.push(node);

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
          rv.push(child);

          const grandchildren: Array<[JSONPathNode, number]> =
            this.nondeterministicChildren(child).map((n) => [n, _depth + 2]);

          queue = interleave(queue, grandchildren);
        } else {
          queue.push([child, _depth + 1]);
        }
      }
    }

    return rv;
  }

  protected nondeterministicChildren(node: JSONPathNode): JSONPathNode[] {
    const _rv: JSONPathNode[] = [];
    if (node.value instanceof String) return _rv;
    if (isArray(node.value)) {
      for (let i = 0; i < node.value.length; i++) {
        _rv.push(
          new JSONPathNode(node.value[i], node.location.concat(i), node.root),
        );
      }
    } else if (isObject(node.value)) {
      for (const [key, value] of this.environment.entries(node.value)) {
        _rv.push(new JSONPathNode(value, node.location.concat(key), node.root));
      }
    }

    return _rv;
  }
}

export class FilterSelector extends JSONPathSelector {
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly token: Token,
    readonly expression: LogicalExpression,
  ) {
    super(environment, token);
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  public resolve(nodes: JSONPathNode[]): JSONPathNode[] {
    const rv: JSONPathNode[] = [];
    for (const node of nodes) {
      if (node.value instanceof String) continue;
      if (isArray(node.value)) {
        for (let i = 0; i < node.value.length; i++) {
          const value = node.value[i];
          const filterContext: FilterContext = {
            environment: this.environment,
            currentValue: value,
            rootValue: node.root,
            currentKey: i,
          };
          if (this.expression.evaluate(filterContext)) {
            rv.push(
              new JSONPathNode(value, node.location.concat(i), node.root),
            );
          }
        }
      } else if (isObject(node.value)) {
        for (const [key, value] of this.environment.entries(node.value)) {
          const filterContext: FilterContext = {
            environment: this.environment,
            currentValue: value,
            rootValue: node.root,
            currentKey: key,
          };
          if (this.expression.evaluate(filterContext)) {
            rv.push(
              new JSONPathNode(value, node.location.concat(key), node.root),
            );
          }
        }
      }
    }
    return rv;
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  public *lazyResolve(nodes: Iterable<JSONPathNode>): Generator<JSONPathNode> {
    for (const node of nodes) {
      if (node.value instanceof String) continue;
      if (isArray(node.value)) {
        for (let i = 0; i < node.value.length; i++) {
          const value = node.value[i];
          const filterContext: FilterContext = {
            environment: this.environment,
            currentValue: value,
            rootValue: node.root,
            lazy: true,
            currentKey: i,
          };
          if (this.expression.evaluate(filterContext)) {
            yield new JSONPathNode(value, node.location.concat(i), node.root);
          }
        }
      } else if (isObject(node.value)) {
        for (const [key, value] of this.environment.entries(node.value)) {
          const filterContext: FilterContext = {
            environment: this.environment,
            currentValue: value,
            rootValue: node.root,
            lazy: true,
            currentKey: key,
          };
          if (this.expression.evaluate(filterContext)) {
            yield new JSONPathNode(value, node.location.concat(key), node.root);
          }
        }
      }
    }
  }

  public toString(): string {
    return `?${this.expression.toString()}`;
  }
}

export type BracketedSegment =
  | FilterSelector
  | IndexSelector
  | NameSelector
  | SliceSelector
  | WildcardSelector;

export class BracketedSelection extends JSONPathSelector {
  constructor(
    readonly environment: JSONPathEnvironment,
    readonly token: Token,
    readonly items: BracketedSegment[],
  ) {
    super(environment, token);
  }

  public resolve(nodes: JSONPathNode[]): JSONPathNode[] {
    const rv: JSONPathNode[] = [];
    for (const node of nodes) {
      for (const item of this.items) {
        for (const _node of item.resolve([node])) {
          rv.push(_node);
        }
      }
    }

    return rv;
  }

  public *lazyResolve(nodes: Iterable<JSONPathNode>): Generator<JSONPathNode> {
    for (const node of nodes) {
      for (const item of this.items) {
        yield* item.lazyResolve([node]);
      }
    }
  }

  public toString(): string {
    return `[${this.items.map((itm) => itm.toString()).join(", ")}]`;
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
