import type { JSONPathEnvironment } from "./environment.js";

import { hasStringKey, isArray, isPlainObject, type JSONValue } from "../types.js";
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
} from "./ast.js";
import { JSONPathError, JSONPathRecursionError } from "./errors.js";
import { NODES_TYPE } from "./functions.js";
import { NodeList, type InternalNode } from "./nodes.js";
import { Nothing } from "./nothing.js";
import { Resolver } from "./resolver.js";

export type StandardResolverClass = new (
  env: JSONPathEnvironment,
  root: JSONValue,
) => StandardResolver;

export class StandardResolver extends Resolver {
  constructor(
    protected env: JSONPathEnvironment,
    protected root: JSONValue,
  ) {
    super();
  }

  resolve(segments: Segment[]): InternalNode[] {
    let nodes: InternalNode[] = [{ value: this.root, location: [], parent: undefined }];
    for (const segment of segments) {
      nodes = this.resolveSegment(segment, nodes);
    }
    return nodes;
  }

  resolveIter(segments: Segment[]): IterableIterator<InternalNode> {
    let nodes: IterableIterator<InternalNode> = [
      { value: this.root, location: [], parent: undefined },
    ][Symbol.iterator]();

    for (const segment of segments) {
      nodes = this.resolveSegmentIter(segment, nodes);
    }

    return nodes;
  }

  resolveSegment(segment: Segment, nodes: InternalNode[]): InternalNode[] {
    const result: InternalNode[] = [];

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

  *resolveSegmentIter(
    segment: Segment,
    nodes: IterableIterator<InternalNode>,
  ): Generator<InternalNode> {
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

  resolveSelector(selector: Selector, node: InternalNode): InternalNode[] {
    const result: InternalNode[] = [];

    switch (selector.kind) {
      case NAME_SELECTOR:
        if (hasStringKey(node.value, selector.value)) {
          result.push({
            value: node.value[selector.value],
            location: node.location.concat(selector.value),
            parent: node,
          });
        }
        break;

      case INDEX_SELECTOR:
        if (isArray(node.value)) {
          const normIndex = this.normalizeIndex(selector.value, node.value.length);
          if (normIndex in node.value) {
            result.push({
              value: node.value[normIndex],
              location: node.location.concat(normIndex),
              parent: node,
            });
          }
        }
        break;

      case SLICE_SELECTOR:
        if (isArray(node.value) && selector.step !== 0) {
          for (const [i, value] of this.slice(
            node.value,
            selector.start,
            selector.end,
            selector.step,
          )) {
            result.push({
              value: value,
              location: node.location.concat(i),
              parent: node,
            });
          }
        }
        break;

      case WILDCARD_SELECTOR:
        if (isArray(node.value)) {
          for (let i = 0; i < node.value.length; i++) {
            result.push({
              value: node.value[i],
              location: node.location.concat(i),
              parent: node,
            });
          }
        } else if (isPlainObject(node.value)) {
          for (const [key, value] of Object.entries(node.value)) {
            result.push({
              value,
              location: node.location.concat(key),
              parent: node,
            });
          }
        }

        break;

      case FILTER_SELECTOR:
        if (isArray(node.value)) {
          for (let i = 0; i < node.value.length; i++) {
            if (
              this.isTruthy(this.evaluateExpression(selector.expression, i, node.value[i], false))
            ) {
              result.push({
                value: node.value[i],
                location: node.location.concat(i),
                parent: node,
              });
            }
          }
        } else if (isPlainObject(node.value)) {
          for (const [key, value] of Object.entries(node.value)) {
            if (this.isTruthy(this.evaluateExpression(selector.expression, key, value, false))) {
              result.push({
                value,
                location: node.location.concat(key),
                parent: node,
              });
            }
          }
        }
        break;

      case KEY_SELECTOR:
        if (hasStringKey(node.value, selector.value)) {
          result.push({
            value: selector.value,
            location: node.location.concat("~" + selector.value),
            parent: node,
          });
        }
        break;

      case KEYS_SELECTOR:
        if (isPlainObject(node.value)) {
          for (const key of Object.keys(node.value)) {
            result.push({
              value: key,
              location: node.location.concat("~" + key),
              parent: node,
            });
          }
        }
        break;

      case KEYS_FILTER_SELECTOR:
        if (isPlainObject(node.value)) {
          for (const [key, value] of Object.entries(node.value)) {
            if (this.isTruthy(this.evaluateExpression(selector.expression, key, value, false))) {
              result.push({
                value: key,
                location: node.location.concat("~" + key),
                parent: node,
              });
            }
          }
        }
    }

    return result;
  }

  *resolveSelectorIter(selector: Selector, node: InternalNode): Generator<InternalNode> {
    switch (selector.kind) {
      case NAME_SELECTOR:
        if (hasStringKey(node.value, selector.value)) {
          yield {
            value: node.value[selector.value],
            location: node.location.concat(selector.value),
            parent: node,
          };
        }
        break;

      case INDEX_SELECTOR:
        if (isArray(node.value)) {
          const normIndex = this.normalizeIndex(selector.value, node.value.length);
          if (normIndex in node.value) {
            yield {
              value: node.value[normIndex],
              location: node.location.concat(normIndex),
              parent: node,
            };
          }
        }
        break;

      case SLICE_SELECTOR:
        if (isArray(node.value) && selector.step !== 0) {
          for (const [i, value] of this.slice(
            node.value,
            selector.start,
            selector.end,
            selector.step,
          )) {
            yield {
              value: value,
              location: node.location.concat(i),
              parent: node,
            };
          }
        }
        break;

      case WILDCARD_SELECTOR:
        if (isArray(node.value)) {
          for (let i = 0; i < node.value.length; i++) {
            yield {
              value: node.value[i],
              location: node.location.concat(i),
              parent: node,
            };
          }
        } else if (isPlainObject(node.value)) {
          for (const [key, value] of Object.entries(node.value)) {
            yield {
              value,
              location: node.location.concat(key),
              parent: node,
            };
          }
        }

        break;

      case FILTER_SELECTOR:
        if (isArray(node.value)) {
          for (let i = 0; i < node.value.length; i++) {
            if (
              this.isTruthy(this.evaluateExpression(selector.expression, i, node.value[i], true))
            ) {
              yield {
                value: node.value[i],
                location: node.location.concat(i),
                parent: node,
              };
            }
          }
        } else if (isPlainObject(node.value)) {
          for (const [key, value] of Object.entries(node.value)) {
            if (this.isTruthy(this.evaluateExpression(selector.expression, key, value, true))) {
              yield {
                value,
                location: node.location.concat(key),
                parent: node,
              };
            }
          }
        }
        break;

      case KEY_SELECTOR:
        if (hasStringKey(node.value, selector.value)) {
          yield {
            value: selector.value,
            location: node.location.concat("~" + selector.value),
            parent: node,
          };
        }
        break;

      case KEYS_SELECTOR:
        if (isPlainObject(node.value)) {
          for (const key of Object.keys(node.value)) {
            yield {
              value: key,
              location: node.location.concat("~" + key),
              parent: node,
            };
          }
        }
        break;

      case KEYS_FILTER_SELECTOR:
        if (isPlainObject(node.value)) {
          for (const [key, value] of Object.entries(node.value)) {
            if (this.isTruthy(this.evaluateExpression(selector.expression, key, value, true))) {
              yield {
                value: key,
                location: node.location.concat("~" + key),
                parent: node,
              };
            }
          }
        }
    }
  }

  evaluateExpression(
    expr: Expression,
    currentKey: number | string,
    currentValue: JSONValue,
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
          return new NodeList(Array.from(this.resolveIter(expr.segments)));
        }

        return new NodeList(this.resolve(expr.segments));

      case RELATIVE_QUERY_EXPRESSION:
        // oxlint-disable-next-line typescript/no-unsafe-type-assertion
        const resolverClass = this.constructor as StandardResolverClass;

        if (lazy) {
          return new NodeList(
            Array.from(new resolverClass(this.env, currentValue).resolveIter(expr.segments)),
          );
        }

        return new NodeList(new resolverClass(this.env, currentValue).resolve(expr.segments));

      case FUNCTION_EXPRESSION:
        const func = this.env.functions[expr.name];
        const args: unknown[] = expr.arguments.map((arg) => {
          return this.evaluateExpression(arg, currentKey, currentValue, lazy);
        });

        let arg: unknown;

        for (let i = 0; i < args.length; i++) {
          arg = args[i];
          if (arg instanceof NodeList && func?.argTypes[i] !== NODES_TYPE) {
            if (arg.length === 0) {
              args[i] = Nothing;
            } else if (arg.length == 1) {
              args[i] = arg.nodes[0]!.value;
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

  private *visit(node: InternalNode, depth: number = 1): Generator<InternalNode> {
    if (depth >= this.env.maxRecursionDepth) {
      throw new JSONPathRecursionError("recursion limit reached");
    }

    yield node;

    if (isArray(node.value)) {
      for (let i = 0; i < node.value.length; i++) {
        const value = node.value[i];
        if (isArray(value) || isPlainObject(value)) {
          yield* this.visit(
            { value: value, location: node.location.concat(i), parent: node },
            depth + 1,
          );
        }
      }
    } else if (isPlainObject(node.value)) {
      for (const [key, value] of Object.entries(node.value)) {
        if (isArray(value) || isPlainObject(value)) {
          yield* this.visit(
            { value, location: node.location.concat(key), parent: node },
            depth + 1,
          );
        }
      }
    }
  }

  private normalizeIndex(index: number, length: number): number {
    if (index < 0 && length >= Math.abs(index)) return length + index;
    return index;
  }

  private slice(
    arr: JSONValue[],
    start?: number,
    end?: number,
    step?: number,
  ): Array<[number, JSONValue]> {
    const len = arr.length;
    step = step ?? 1;

    if (step === 0 || !len) return [];

    const result: Array<[number, JSONValue]> = [];
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
