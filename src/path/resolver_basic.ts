import type { JSONPathEnvironment } from "./environment";

import { hasStringKey, isArray, isPlainObject, type JSONLike } from "../types";
import {
  ABSOLUTE_QUERY_EXPRESSION,
  AND_EXPRESSION,
  BOOL_EXPRESSION,
  CHILD_SEGMENT,
  CURRENT_KEY_EXPRESSION,
  DESCENDANT_SEGMENT,
  EQ_EXPRESSION,
  FILTER_SELECTOR,
  FUNCTION_EXPRESSION,
  GE_EXPRESSION,
  GT_EXPRESSION,
  INDEX_SELECTOR,
  KEY_SELECTOR,
  KEYS_FILTER_SELECTOR,
  KEYS_SELECTOR,
  LE_EXPRESSION,
  LT_EXPRESSION,
  NAME_SELECTOR,
  NE_EXPRESSION,
  NOT_EXPRESSION,
  NULL_EXPRESSION,
  NUMBER_EXPRESSION,
  OR_EXPRESSION,
  RELATIVE_QUERY_EXPRESSION,
  SLICE_SELECTOR,
  STRING_EXPRESSION,
  WILDCARD_SELECTOR,
  type Expression,
  type Segment,
  type Selector,
} from "./ast";
import { JSONPathError, JSONPathRecursionError } from "./errors";
import { NODES_TYPE } from "./functions";
import { BasicNodeList } from "./nodes";
import { Nothing } from "./nothing";
import { Resolver } from "./resolver";

export type BasicResolverClass = new (env: JSONPathEnvironment, root: JSONLike) => BasicResolver;

export class BasicResolver extends Resolver {
  constructor(
    protected env: JSONPathEnvironment,
    protected root: JSONLike,
  ) {
    super();
  }

  resolve(segments: Segment[]): JSONLike[] {
    let nodes: JSONLike[] = [this.root];
    for (const segment of segments) {
      nodes = this.resolveSegment(segment, nodes);
    }
    return nodes;
  }

  resolveIter(segments: Segment[]): IterableIterator<JSONLike> {
    let nodes: IterableIterator<JSONLike> = [this.root][Symbol.iterator]();

    for (const segment of segments) {
      nodes = this.resolveSegmentIter(segment, nodes);
    }

    return nodes;
  }

  resolveSegment(segment: Segment, nodes: JSONLike[]): JSONLike[] {
    const result: JSONLike[] = [];

    switch (segment.kind) {
      case CHILD_SEGMENT:
        for (const node of nodes) {
          for (const selector of segment.selectors) {
            for (const newNode of this.resolveSelector(selector, node)) {
              result.push(newNode);
            }
          }
        }
        break;

      case DESCENDANT_SEGMENT:
        for (const node of nodes) {
          for (const descendant of this.visit(node)) {
            for (const selector of segment.selectors) {
              for (const newNode of this.resolveSelector(selector, descendant)) {
                result.push(newNode);
              }
            }
          }
        }
    }

    return result;
  }

  *resolveSegmentIter(segment: Segment, nodes: IterableIterator<JSONLike>): Generator<JSONLike> {
    switch (segment.kind) {
      case CHILD_SEGMENT:
        for (const node of nodes) {
          for (const selector of segment.selectors) {
            for (const newNode of this.resolveSelectorIter(selector, node)) {
              yield newNode;
            }
          }
        }
        break;

      case DESCENDANT_SEGMENT:
        for (const node of nodes) {
          for (const descendant of this.visit(node)) {
            for (const selector of segment.selectors) {
              for (const newNode of this.resolveSelectorIter(selector, descendant)) {
                yield newNode;
              }
            }
          }
        }
    }
  }

  resolveSelector(selector: Selector, value: JSONLike): JSONLike[] {
    const result: JSONLike[] = [];

    switch (selector.kind) {
      case NAME_SELECTOR:
        if (hasStringKey(value, selector.value)) {
          result.push(value[selector.value]);
        }
        break;

      case INDEX_SELECTOR:
        if (isArray(value)) {
          const normIndex = this.normalizeIndex(selector.value, value.length);
          if (normIndex in value) {
            result.push(value[normIndex]);
          }
        }
        break;

      case SLICE_SELECTOR:
        if (isArray(value) && selector.step !== 0) {
          for (const [_i, e] of this.slice(value, selector.start, selector.end, selector.step)) {
            result.push(e);
          }
        }
        break;

      case WILDCARD_SELECTOR:
        if (isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            result.push(value[i]);
          }
        } else if (isPlainObject(value)) {
          for (const v of Object.values(value)) {
            result.push(v);
          }
        }

        break;

      case FILTER_SELECTOR:
        if (isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            if (this.isTruthy(this.evaluateExpression(selector.expression, i, value[i], false))) {
              result.push(value[i]);
            }
          }
        } else if (isPlainObject(value)) {
          for (const [k, v] of Object.entries(value)) {
            if (this.isTruthy(this.evaluateExpression(selector.expression, k, v, false))) {
              result.push(v);
            }
          }
        }
        break;

      case KEY_SELECTOR:
        if (hasStringKey(value, selector.value)) {
          result.push(selector.value);
        }
        break;

      case KEYS_SELECTOR:
        if (isPlainObject(value)) {
          for (const k of Object.keys(value)) {
            result.push(k);
          }
        }
        break;

      case KEYS_FILTER_SELECTOR:
        if (isPlainObject(value)) {
          for (const [k, v] of Object.entries(value)) {
            if (this.isTruthy(this.evaluateExpression(selector.expression, k, v, false))) {
              result.push(k);
            }
          }
        }
    }

    return result;
  }

  *resolveSelectorIter(selector: Selector, value: JSONLike): Generator<JSONLike> {
    switch (selector.kind) {
      case NAME_SELECTOR:
        if (hasStringKey(value, selector.value)) {
          yield value[selector.value];
        }
        break;

      case INDEX_SELECTOR:
        if (isArray(value)) {
          const normIndex = this.normalizeIndex(selector.value, value.length);
          if (normIndex in value) {
            yield value[normIndex];
          }
        }
        break;

      case SLICE_SELECTOR:
        if (isArray(value) && selector.step !== 0) {
          for (const [_i, v] of this.slice(value, selector.start, selector.end, selector.step)) {
            yield v;
          }
        }
        break;

      case WILDCARD_SELECTOR:
        if (isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            yield value[i];
          }
        } else if (isPlainObject(value)) {
          for (const v of Object.values(value)) {
            yield v;
          }
        }

        break;

      case FILTER_SELECTOR:
        if (isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            if (this.isTruthy(this.evaluateExpression(selector.expression, i, value[i], false))) {
              yield value[i];
            }
          }
        } else if (isPlainObject(value)) {
          for (const [k, v] of Object.entries(value)) {
            if (this.isTruthy(this.evaluateExpression(selector.expression, k, v, false))) {
              yield v;
            }
          }
        }
        break;

      case KEY_SELECTOR:
        if (hasStringKey(value, selector.value)) {
          yield selector.value;
        }
        break;

      case KEYS_SELECTOR:
        if (isPlainObject(value)) {
          for (const [k, _v] of Object.entries(value)) {
            yield k;
          }
        }
        break;

      case KEYS_FILTER_SELECTOR:
        if (isPlainObject(value)) {
          for (const [k, v] of Object.entries(value)) {
            if (this.isTruthy(this.evaluateExpression(selector.expression, k, v, false))) {
              yield k;
            }
          }
        }
    }
  }

  evaluateExpression(
    expr: Expression,
    currentKey: number | string,
    currentValue: JSONLike,
    lazy: boolean,
  ): unknown {
    let left: unknown;
    let right: unknown;

    switch (expr.kind) {
      case NULL_EXPRESSION:
        return null;

      case BOOL_EXPRESSION:
      case STRING_EXPRESSION:
      case NUMBER_EXPRESSION:
        return expr.value;

      case NOT_EXPRESSION:
        return !this.isTruthy(this.evaluateExpression(expr.right, currentKey, currentValue, lazy));

      case AND_EXPRESSION:
        return (
          this.isTruthy(this.evaluateExpression(expr.left, currentKey, currentValue, lazy)) &&
          this.isTruthy(this.evaluateExpression(expr.right, currentKey, currentValue, lazy))
        );

      case OR_EXPRESSION:
        return (
          this.isTruthy(this.evaluateExpression(expr.left, currentKey, currentValue, lazy)) ||
          this.isTruthy(this.evaluateExpression(expr.right, currentKey, currentValue, lazy))
        );

      case EQ_EXPRESSION:
        return this.eq(
          this.evaluateExpression(expr.left, currentKey, currentValue, lazy),
          this.evaluateExpression(expr.right, currentKey, currentValue, lazy),
        );

      case NE_EXPRESSION:
        return !this.eq(
          this.evaluateExpression(expr.left, currentKey, currentValue, lazy),
          this.evaluateExpression(expr.right, currentKey, currentValue, lazy),
        );

      case LT_EXPRESSION:
        return this.lt(
          this.evaluateExpression(expr.left, currentKey, currentValue, lazy),
          this.evaluateExpression(expr.right, currentKey, currentValue, lazy),
        );

      case LE_EXPRESSION:
        left = this.evaluateExpression(expr.left, currentKey, currentValue, lazy);
        right = this.evaluateExpression(expr.right, currentKey, currentValue, lazy);
        return this.lt(left, right) || this.eq(left, right);

      case GT_EXPRESSION:
        return this.lt(
          this.evaluateExpression(expr.right, currentKey, currentValue, lazy),
          this.evaluateExpression(expr.left, currentKey, currentValue, lazy),
        );

      case GE_EXPRESSION:
        left = this.evaluateExpression(expr.left, currentKey, currentValue, lazy);
        right = this.evaluateExpression(expr.right, currentKey, currentValue, lazy);
        return this.lt(right, left) || this.eq(left, right);

      case ABSOLUTE_QUERY_EXPRESSION:
        if (lazy) {
          return new BasicNodeList(Array.from(this.resolveIter(expr.segments)));
        }

        return new BasicNodeList(this.resolve(expr.segments));

      case RELATIVE_QUERY_EXPRESSION:
        // oxlint-disable-next-line typescript/no-unsafe-type-assertion
        const resolverClass = this.constructor as BasicResolverClass;

        if (lazy) {
          return new BasicNodeList(
            Array.from(new resolverClass(this.env, currentValue).resolveIter(expr.segments)),
          );
        }

        return new BasicNodeList(new resolverClass(this.env, currentValue).resolve(expr.segments));

      case FUNCTION_EXPRESSION:
        const func = this.env.functions[expr.name];
        const args: unknown[] = expr.arguments.map((arg) => {
          return this.evaluateExpression(arg, currentKey, currentValue, lazy);
        });

        let arg: unknown;

        for (let i = 0; i < args.length; i++) {
          arg = args[i];
          if (arg instanceof BasicNodeList && func?.argTypes[i] !== NODES_TYPE) {
            if (arg.length === 0) {
              args[i] = Nothing;
            } else if (arg.length == 1) {
              args[i] = arg.nodes[0];
            }
          }
        }

        return func?.call(...args);

      case CURRENT_KEY_EXPRESSION:
        return currentKey;

      default:
        throw new JSONPathError("unreachable");
    }
  }

  private *visit(node: JSONLike, depth: number = 1): Generator<JSONLike> {
    if (depth >= this.env.maxRecursionDepth) {
      throw new JSONPathRecursionError("recursion limit reached");
    }

    yield node;

    if (isArray(node)) {
      for (let i = 0; i < node.length; i++) {
        const value = node[i];
        if (isArray(value) || isPlainObject(value)) {
          yield* this.visit(value, depth + 1);
        }
      }
    } else if (isPlainObject(node)) {
      for (const [_key, value] of Object.entries(node)) {
        if (isArray(value) || isPlainObject(value)) {
          yield* this.visit(value, depth + 1);
        }
      }
    }
  }

  private normalizeIndex(index: number, length: number): number {
    if (index < 0 && length >= Math.abs(index)) return length + index;
    return index;
  }

  private slice(
    arr: JSONLike[],
    start?: number,
    end?: number,
    step?: number,
  ): Array<[number, JSONLike]> {
    const len = arr.length;
    step = step ?? 1;

    if (step === 0 || !len) return [];

    const result: Array<[number, JSONLike]> = [];
    let i: number;

    if (step > 0) {
      i = this.normalizeSliceIndex(start, 0, len, step);
      const normalizedEnd = this.normalizeSliceIndex(end, len, len, step);
      for (; i < normalizedEnd; i += step) {
        result.push([i, arr[i]]);
      }
    } else {
      i = this.normalizeSliceIndex(start, len - 1, len, step);
      const normalizedEnd = this.normalizeSliceIndex(end, -1, len, step);
      for (; i > normalizedEnd; i += step) {
        result.push([i, arr[i]]);
      }
    }

    return result;
  }

  private normalizeSliceIndex(
    n: number | undefined,
    defaultValue: number,
    length: number,
    step: number,
  ): number {
    if (n === undefined) return defaultValue;
    if (n < 0) return step < 0 ? Math.max(n + length, -1) : Math.max(n + length, 0);
    return step < 0 ? Math.min(n, length - 1) : Math.min(n, length);
  }
}
