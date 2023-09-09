import { JSONPathTypeError, UndefinedFilterFunctionError } from "./errors";
import {
  BooleanLiteral,
  FilterExpression,
  FilterExpressionLiteral,
  JSONPathQuery,
} from "./expression";
import { Count as CountFilterFunction } from "./functions/count";
import { FilterFunction, FunctionExpressionType } from "./functions/function";
import { Length as LengthFilterFunction } from "./functions/length";
import { Match as MatchFilterFunction } from "./functions/match";
import { Search as SearchFilterFunction } from "./functions/search";
import { Value as ValueFilterFunction } from "./functions/value";
import { tokenize } from "./lex";
import { JSONPathNodeList } from "./node";
import { Parser } from "./parse";
import { JSONPath } from "./path";
import { Token, TokenStream } from "./token";
import { JSONValue } from "../types";

/**
 *
 */
export type JSONPathEnvironmentOptions = {
  /**
   *
   */
  strict: boolean;

  /**
   *
   */
  maxIntIndex: number;

  /**
   *
   */
  minIntIndex: number;
};

export const defaultOptions: JSONPathEnvironmentOptions = {
  strict: true,
  maxIntIndex: Math.pow(2, 53) - 1,
  minIntIndex: -Math.pow(2, 53) - 1,
};

/**
 *
 */
export class JSONPathEnvironment {
  /**
   *
   */
  public filterRegister: Map<string, FilterFunction> = new Map();

  private parser: Parser;

  /**
   *
   * @param options -
   */
  constructor(readonly options: JSONPathEnvironmentOptions = defaultOptions) {
    this.parser = new Parser(this);
    this.setupFilterFunctions();
  }

  /**
   *
   * @param path -
   * @returns
   */
  public compile(path: string): JSONPath {
    return new JSONPath(
      this,
      this.parser.parse(new TokenStream(tokenize(path))),
    );
  }

  /**
   *
   * @param path -
   * @param value -
   * @returns
   */
  public query(path: string, value: JSONValue): JSONPathNodeList {
    return this.compile(path).query(value);
  }

  protected setupFilterFunctions(): void {
    this.filterRegister.set("count", new CountFilterFunction());
    this.filterRegister.set("length", new LengthFilterFunction());
    this.filterRegister.set("search", new SearchFilterFunction());
    this.filterRegister.set("match", new MatchFilterFunction());
    this.filterRegister.set("value", new ValueFilterFunction());
  }

  /**
   *
   * @param token -
   * @param args -
   */
  // eslint-disable-next-line sonarjs/cognitive-complexity
  public checkWellTypedness(
    token: Token,
    args: FilterExpression[],
  ): FilterExpression[] {
    const func = this.filterRegister.get(token.value);
    if (!func) {
      throw new UndefinedFilterFunctionError(
        `no such function '${token.value}'`,
        token,
      );
    }

    // Correct number of arguments
    if (args.length !== func.argTypes.length) {
      throw new JSONPathTypeError(
        `${token.value}() takes ${func.argTypes.length} argument${
          func.argTypes.length === 1 ? "" : "s"
        }, ${args.length} given`,
        token,
      );
    }

    // Argument types
    for (const [typ, arg, idx] of func.argTypes.map(
      (t, i): [FunctionExpressionType, FilterExpression, number] => [
        t,
        args[i],
        i,
      ],
    )) {
      switch (typ) {
        case FunctionExpressionType.ValueType:
          if (
            !(
              arg instanceof FilterExpressionLiteral ||
              (arg instanceof JSONPathQuery && arg.path.singularQuery())
            )
          ) {
            throw new JSONPathTypeError(
              `${token.value}() argument ${idx} must be of ValueType`,
              arg.token,
            );
          }
          break;
        case FunctionExpressionType.LogicalType:
          if (!(arg instanceof BooleanLiteral)) {
            throw new JSONPathTypeError(
              `${token.value}() argument ${idx} must be of LogicalType`,
              arg.token,
            );
          }
          break;
        case FunctionExpressionType.NodesType:
          if (!(arg instanceof JSONPathQuery)) {
            throw new JSONPathTypeError(
              `${token.value}() argument ${idx} must be of NodesType`,
              arg.token,
            );
          }
      }
    }

    return args;
  }
}
