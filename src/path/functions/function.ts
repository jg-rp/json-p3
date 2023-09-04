import { FilterExpression } from "../expression";
import { Token } from "../token";

/**
 * A JSONPath filter function definition.
 */
export type FilterFunction = {
  /**
   * A function with unknown number and type of arguments.
   */
  (...args: unknown[]): unknown;

  /**
   * An optional compile-time argument validation function.
   * @param args - Function arguments.
   * @param token - The token that starts the function call.
   * @returns An array of arguments, possibly the input arguments passed through.
   */
  validate?: (args: FilterExpression[], token: Token) => FilterExpression[];
  nodeList?: boolean;
};
