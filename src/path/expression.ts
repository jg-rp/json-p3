import { deepEquals } from "../deep_equals";
import { JSONPathTypeError, UndefinedFilterFunctionError } from "./errors";
import { FunctionExpressionType } from "./functions/function";
import { JSONPathNodeList } from "./node";
import { JSONPathQuery } from "./path";
import { Token } from "./token";
import { FilterContext, Nothing, SerializationOptions } from "./types";
import { isNumber, isString } from "../types";
import { toCanonical } from "./serialize";

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
  public abstract toString(options?: SerializationOptions): string;
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
    return toCanonical(this.value);
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

  public toString(options?: SerializationOptions): string {
    return `${this.operator}${this.right.toString(options)}`;
  }
}

const PRECEDENCE_LOGICAL_OR = 4;
const PRECEDENCE_LOGICAL_AND = 5;
const PRECEDENCE_PREFIX = 7;

export class InfixExpression extends FilterExpression {
  readonly logical: boolean;

  constructor(
    readonly token: Token,
    readonly left: FilterExpression,
    readonly operator: string,
    readonly right: FilterExpression,
  ) {
    super(token);
    this.logical = operator === "&&" || operator === "||";
  }

  public evaluate(context: FilterContext): boolean {
    let left = this.left.evaluate(context);
    if (
      !this.logical &&
      left instanceof JSONPathNodeList &&
      left.nodes.length === 1
    )
      left = left.nodes[0].value;

    let right = this.right.evaluate(context);
    if (
      !this.logical &&
      right instanceof JSONPathNodeList &&
      right.nodes.length === 1
    )
      right = right.nodes[0].value;

    if (this.operator === "&&") {
      return isTruthy(left) && isTruthy(right);
    }

    if (this.operator === "||") {
      return isTruthy(left) || isTruthy(right);
    }

    return compare(left, this.operator, right);
  }

  public toString(options?: SerializationOptions): string {
    // Note that `LogicalExpression.toString()` does not call this.
    if (this.logical) {
      return `(${this.left.toString(options)} ${
        this.operator
      } ${this.right.toString(options)})`;
    }
    return `${this.left.toString(options)} ${this.operator} ${this.right.toString(options)}`;
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

  public toString(options?: SerializationOptions): string {
    // Minimize parentheses in logical expressions.
    function _toString(
      expression: FilterExpression,
      parentPrecedence: number,
    ): string {
      let precedence: number;
      let op: string;
      let left: string;
      let right: string;

      if (expression instanceof InfixExpression) {
        if (expression.operator === "&&") {
          precedence = PRECEDENCE_LOGICAL_AND;
          op = "&&";
          left = _toString(expression.left, precedence);
          right = _toString(expression.right, precedence);
        } else if (expression.operator === "||") {
          precedence = PRECEDENCE_LOGICAL_OR;
          op = "||";
          left = _toString(expression.left, precedence);
          right = _toString(expression.right, precedence);
        } else {
          return expression.toString(options);
        }
      } else if (expression instanceof PrefixExpression) {
        const operand = _toString(expression.right, PRECEDENCE_PREFIX);
        const expr = `!${operand}`;
        return parentPrecedence > PRECEDENCE_PREFIX ? `(${expr})` : expr;
      } else {
        return expression.toString(options);
      }

      const expr = `${left} ${op} ${right}`;
      return precedence < parentPrecedence ? `(${expr})` : expr;
    }

    return _toString(this.expression, 0);
  }
}

/**
 * Base class for relative and absolute JSONPath query expressions.
 */
export abstract class FilterQuery extends FilterExpression {
  constructor(
    readonly token: Token,
    readonly path: JSONPathQuery,
  ) {
    super(token);
  }
}

export class RelativeQuery extends FilterQuery {
  public evaluate(context: FilterContext): JSONPathNodeList {
    return context.lazy
      ? new JSONPathNodeList(
          Array.from(this.path.lazyQuery(context.currentValue)),
        )
      : this.path.query(context.currentValue);
  }

  public toString(options?: SerializationOptions): string {
    return `@${this.path.toString(options).slice(1)}`;
  }
}

export class RootQuery extends FilterQuery {
  public evaluate(context: FilterContext): JSONPathNodeList {
    return context.lazy
      ? new JSONPathNodeList(Array.from(this.path.lazyQuery(context.rootValue)))
      : this.path.query(context.rootValue);
  }

  public toString(options?: SerializationOptions): string {
    return this.path.toString(options);
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
          ? this.unpack_node_list(arg)
          : arg,
      );
    return func.call(...args);
  }

  public toString(options?: SerializationOptions): string {
    return `${this.name}(${this.args.map((e) => e.toString(options)).join(", ")})`;
  }

  private unpack_node_list(arg: JSONPathNodeList): unknown {
    switch (arg.length) {
      case 0:
        // If the query results in an empty node list, the argument
        // is the special result Nothing.
        return Nothing;
      case 1:
        // If the query results in a node list consisting of a single
        // node, the argument is the value of the node
        return arg.nodes[0].value;
      default:
        return arg;
    }
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
