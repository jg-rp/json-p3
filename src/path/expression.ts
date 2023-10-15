import { deepEquals } from "../deep_equals";
import { JSONPathTypeError, UndefinedFilterFunctionError } from "./errors";
import { FunctionExpressionType } from "./functions/function";
import { JSONPathNodeList } from "./node";
import { JSONPath } from "./path";
import { Token } from "./token";
import { FilterContext, Nothing } from "./types";
import { isNumber, isString } from "../types";

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

/**
 * Base class for JSONPath ValueType literals.
 */
export abstract class FilterExpressionLiteral extends FilterExpression {}

export class NullLiteral extends FilterExpressionLiteral {
  public evaluate(): null {
    return null;
  }

  public toString(): string {
    return "null";
  }
}

export class BooleanLiteral extends FilterExpressionLiteral {
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

export class StringLiteral extends FilterExpressionLiteral {
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

export class NumberLiteral extends FilterExpressionLiteral {
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
    let left = this.left.evaluate(context);
    if (left instanceof JSONPathNodeList && left.nodes.length === 1)
      left = left.nodes[0].value;

    let right = this.right.evaluate(context);
    if (right instanceof JSONPathNodeList && right.nodes.length === 1)
      right = right.nodes[0].value;

    if (this.operator === "&&") {
      return isTruthy(left) && isTruthy(right);
    }

    if (this.operator === "||") {
      return isTruthy(left) || isTruthy(right);
    }

    return compare(left, this.operator, right);
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

/**
 * Base class for relative and absolute JSONPath query expressions.
 */
export abstract class JSONPathQuery extends FilterExpression {
  constructor(
    readonly token: Token,
    readonly path: JSONPath,
  ) {
    super(token);
  }
}

export class RelativeQuery extends JSONPathQuery {
  public evaluate(context: FilterContext): JSONPathNodeList {
    return this.path.query(context.currentValue); // TODO: lazy query?
  }

  public toString(): string {
    return `@${this.path.toString().slice(1)}`;
  }
}

export class RootQuery extends JSONPathQuery {
  public evaluate(context: FilterContext): JSONPathNodeList {
    return this.path.query(context.rootValue); // TODO: lazy query?
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
    const func = context.environment.functionRegister.get(this.name);
    if (!func) {
      throw new UndefinedFilterFunctionError(
        `filter function '${this.name}' is undefined`,
        this.token,
      );
    }

    const args = this.args
      .map((arg) => arg.evaluate(context))
      .map((arg, idx) =>
        func.argTypes[idx] !== FunctionExpressionType.NodesType &&
        arg instanceof JSONPathNodeList
          ? arg.valuesOrSingular()
          : arg,
      );
    return func.call(...args);
  }

  public toString(): string {
    return `${this.name}(${this.args.map((e) => e.toString()).join(", ")})`;
  }
}

/**
 *
 * @param value -
 */
function isTruthy(value: unknown): boolean {
  if (value instanceof JSONPathNodeList && value.empty()) return false;
  return !(typeof value === "boolean" && value === false);
}

export function compare(
  left: unknown,
  operator: string,
  right: unknown,
): boolean {
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
      return lt(right, left) || eq(left, right);
    case "<=":
      return lt(left, right) || eq(left, right);
    default:
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
