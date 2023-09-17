import { JSONPathTypeError, UndefinedFilterFunctionError } from "./errors";
import {
  BooleanLiteral,
  FilterExpression,
  FilterExpressionLiteral,
  FunctionExtension,
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
  public functionRegister: Map<string, FilterFunction> = new Map();

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
    this.functionRegister.set("count", new CountFilterFunction());
    this.functionRegister.set("length", new LengthFilterFunction());
    this.functionRegister.set("search", new SearchFilterFunction());
    this.functionRegister.set("match", new MatchFilterFunction());
    this.functionRegister.set("value", new ValueFilterFunction());
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
    const func = this.functionRegister.get(token.value);
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
              (arg instanceof JSONPathQuery && arg.path.singularQuery()) ||
              (arg instanceof FunctionExtension &&
                this.functionRegister.get(arg.name)?.returnType ===
                  FunctionExpressionType.ValueType)
            )
          ) {
            throw new JSONPathTypeError(
              `${token.value}() argument ${idx} must be of ValueType`,
              arg.token,
            );
          }
          break;
        case FunctionExpressionType.LogicalType:
          // XXX: BooleanLiteral != LogicalType
          // LogicalType can be returned by a function or the result of a test/
          // comparison expression.
          if (!(arg instanceof BooleanLiteral)) {
            throw new JSONPathTypeError(
              `${token.value}() argument ${idx} must be of LogicalType`,
              arg.token,
            );
          }
          break;
        case FunctionExpressionType.NodesType:
          if (
            !(
              arg instanceof JSONPathQuery ||
              (arg instanceof FunctionExtension &&
                this.functionRegister.get(arg.name)?.returnType ===
                  FunctionExpressionType.NodesType)
            )
          ) {
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
