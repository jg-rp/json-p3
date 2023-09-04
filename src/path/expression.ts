import { JSONPathTypeError, UndefinedFilterFunctionError } from "./errors";
import { JSONPathNodeList } from "./node";
import { JSONPath } from "./path";
import { Token } from "./token";
import { FilterContext, Nothing, isNumber, isObject, isString } from "./types";

/**
 * Base class for all filter expressions.
 */
export abstract class FilterExpression {
  constructor(readonly token: Token) {}

  /**
   * Evaluate the filter expression in the given context.
   * @param context - Evaluation context.
   */
  public abstract evaluate(context: FilterContext): unknown;

  /**
   * Return a string representation of the expression.
   */
  public abstract toString(): string;
}

export class NullLiteral extends FilterExpression {
  public evaluate(): null {
    return null;
  }

  public toString(): string {
    return "null";
  }
}

export class BooleanLiteral extends FilterExpression {
  constructor(
    readonly token: Token,
    readonly value: boolean,
  ) {
    super(token);
  }

  public evaluate(): boolean {
    return this.value;
  }

  public toString(): string {
    return String(this.value);
  }
}

export class StringLiteral extends FilterExpression {
  constructor(
    readonly token: Token,
    readonly value: string,
  ) {
    super(token);
  }

  public evaluate(): string {
    return this.value;
  }

  public toString(): string {
    return JSON.stringify(this.value);
  }
}

export class NumberLiteral extends FilterExpression {
  constructor(
    readonly token: Token,
    readonly value: number,
  ) {
    super(token);
  }

  public evaluate(): number {
    return this.value;
  }

  public toString(): string {
    return String(this.value);
  }
}

export class PrefixExpression extends FilterExpression {
  constructor(
    readonly token: Token,
    readonly operator: string,
    readonly right: FilterExpression,
  ) {
    super(token);
  }

  public evaluate(context: FilterContext): boolean {
    if (this.operator === "!") {
      const value = this.right.evaluate(context);
      if (value instanceof JSONPathNodeList) return value.nodes.length === 0; // negated existence
      return !isTruthy(value);
    }
    throw new JSONPathTypeError(
      `unknown operator '${this.operator}'`,
      this.token,
    );
  }

  public toString(): string {
    return `${this.operator}${this.right.toString()}`;
  }
}

export class InfixExpression extends FilterExpression {
  constructor(
    readonly token: Token,
    readonly left: FilterExpression,
    readonly operator: string,
    readonly right: FilterExpression,
  ) {
    super(token);
  }

  public evaluate(context: FilterContext): boolean {
    if (this.operator === "&&") {
      return (
        isTruthy(this.left.evaluate(context)) &&
        isTruthy(this.right.evaluate(context))
      );
    }

    if (this.operator === "||") {
      return (
        isTruthy(this.left.evaluate(context)) ||
        isTruthy(this.right.evaluate(context))
      );
    }

    return compare(
      this.left.evaluate(context),
      this.operator,
      this.right.evaluate(context),
    );
  }

  public toString(): string {
    if (this.operator === "&&" || this.operator === "||") {
      return `(${this.left.toString()} ${
        this.operator
      } ${this.right.toString()})`;
    }
    return `${this.left.toString()} ${this.operator} ${this.right.toString()}`;
  }
}

export class LogicalExpression extends FilterExpression {
  constructor(
    readonly token: Token,
    readonly expression: FilterExpression,
  ) {
    super(token);
  }

  public evaluate(context: FilterContext): boolean {
    const value = this.expression.evaluate(context);
    if (value instanceof JSONPathNodeList) return value.nodes.length > 0; // existence
    return isTruthy(value);
  }

  public toString(): string {
    return this.expression.toString();
  }
}

export class RelativeQuery extends FilterExpression {
  constructor(
    readonly token: Token,
    readonly path: JSONPath,
  ) {
    super(token);
  }

  public evaluate(context: FilterContext): JSONPathNodeList {
    return this.path.query(context.currentValue);
  }

  public toString(): string {
    return `@${this.path.toString().slice(1)}`;
  }
}

export class RootQuery extends FilterExpression {
  constructor(
    readonly token: Token,
    readonly path: JSONPath,
  ) {
    super(token);
  }

  public evaluate(context: FilterContext): JSONPathNodeList {
    return this.path.query(context.rootValue);
  }

  public toString(): string {
    return this.path.toString();
  }
}

export class FunctionExtension extends FilterExpression {
  constructor(
    readonly token: Token,
    readonly name: string,
    readonly args: FilterExpression[],
  ) {
    super(token);
  }

  public evaluate(context: FilterContext): unknown {
    const func = context.environment.filterRegister.get(this.name);
    if (!func) {
      throw new UndefinedFilterFunctionError(
        `filter function '${this.name}' is undefined`,
        this.token,
      );
    }

    const args = this.args.map((arg) => arg.evaluate(context));
    if (!func.nodeList) return func(...this.unpackNodeLists(args));
    return func(...args);
  }

  public toString(): string {
    return `${this.name}(${this.args.map((e) => e.toString()).join(", ")})`;
  }

  private unpackNodeLists(args: unknown[]): unknown[] {
    return args.map((arg) =>
      arg instanceof JSONPathNodeList ? arg.valuesOrSingular() : arg,
    );
  }
}

/**
 *
 * @param value -
 */
function isTruthy(value: unknown): boolean {
  // TODO: Boolean wrapper objects?
  return typeof value === "boolean" && value === true;
}

/**
 *
 * @param left -
 * @param operator -
 * @param right -
 */
function compare(left: unknown, operator: string, right: unknown): boolean {
  switch (operator) {
    case "==":
      return eq(left, right);
    case "!=":
      return !eq(left, right);
    case "<":
      return lt(left, right);
    case ">":
      return lt(right, left);
    case ">=":
      return lt(right, left) && eq(left, right);
    case "<=":
      return lt(left, right) && eq(left, right);
    default:
      // TODO: throw?
      return false;
  }
}

// eslint-disable-next-line sonarjs/cognitive-complexity
function eq(left: unknown, right: unknown): boolean {
  if (right instanceof JSONPathNodeList) [left, right] = [right, left];
  if (left instanceof JSONPathNodeList) {
    if (right instanceof JSONPathNodeList) {
      if (left.empty() && right.empty()) return true;
      if (left.nodes.length === 1 && right.nodes.length === 1)
        return deepEquals(left.nodes[0].value, right.nodes[0].value);
    }
    if (left.empty()) return right === Nothing;
    if (left.nodes.length === 1) return deepEquals(left.nodes[0].value, right);
    return false;
  }
  if (left === Nothing && right === Nothing) return true;
  return deepEquals(left, right);
}

function lt(left: unknown, right: unknown): boolean {
  if (
    (isString(left) && isString(right)) ||
    (isNumber(left) && isNumber(right))
  )
    return left < right;
  return false;
}

/**
 * Deep equality of JSON-like values.
 *
 * No attempt is made to handle function objects, recursive data
 * structures, NaNs, sparse arrays, primitive wrapper objects....
 *
 * We're not using JSON.stringify because we want objects with the same
 * entries in a different order to compare equal.
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
export function deepEquals(a: unknown, b: unknown): boolean {
  if (a === b) {
    return true;
  }

  if (Array.isArray(a)) {
    if (Array.isArray(b)) {
      if (a.length !== b.length) {
        return false;
      }
      for (let i = 0; i < a.length; i++) {
        if (!deepEquals(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    return false;
  } else if (isObject(a) && isObject(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (const key of keysA) {
      if (!deepEquals(a[key as keyof typeof a], b[key as keyof typeof b])) {
        return false;
      }
    }

    return true;
  }

  return false;
}
