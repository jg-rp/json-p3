import { JSONPathTypeError, UndefinedFilterFunctionError } from "./errors";
import {
  FilterExpression,
  FilterExpressionLiteral,
  FunctionExtension,
  InfixExpression,
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
 * JSONPath environment options. The defaults are in compliance with JSONPath
 * standards.
 */
export type JSONPathEnvironmentOptions = {
  /**
   * Indicates if the environment should to be strict about its compliance with
   * JSONPath standards.
   *
   * Defaults to `true`. Setting `strict` to `false` currently has no effect.
   * If/when we add non-standard features, the environment's strictness will
   * control their availability.
   */
  strict?: boolean;

  /**
   * The maximum number allowed when indexing or slicing an array. Defaults to
   * 2**53 -1.
   */
  maxIntIndex?: number;

  /**
   * The minimum number allowed when indexing or slicing an array. Defaults to
   * -(2**53) -1.
   */
  minIntIndex?: number;

  /**
   * The maximum number of objects and/or arrays the recursive descent selector
   * can visit before a `JSONPathRecursionLimitError` is thrown.
   */
  maxRecursionDepth?: number;
};

/**
 *
 */
export class JSONPathEnvironment {
  /**
   * Indicates if the environment should to be strict about its compliance with
   * JSONPath standards.
   *
   * Defaults to `true`. Setting `strict` to `false` currently has no effect.
   * If/when we add non-standard features, the environment's strictness will
   * control their availability.
   */
  readonly strict: boolean;

  /**
   * The maximum number allowed when indexing or slicing an array. Defaults to
   * 2**53 -1.
   */
  readonly maxIntIndex: number;

  /**
   * The minimum number allowed when indexing or slicing an array. Defaults to
   * -(2**53) -1.
   */
  readonly minIntIndex: number;

  /**
   * The maximum number of objects and/or arrays the recursive descent selector
   * can visit before a `JSONPathRecursionLimitError` is thrown.
   */
  readonly maxRecursionDepth: number;

  /**
   * A map of function names to objects implementing the {@link FilterFunction}
   * interface. You are free to set or delete custom filter functions directly.
   */
  public functionRegister: Map<string, FilterFunction> = new Map();

  private parser: Parser;

  /**
   *
   * @param options -
   */
  constructor(options: JSONPathEnvironmentOptions = {}) {
    this.strict = options.strict ?? true;
    this.maxIntIndex = options.maxIntIndex ?? Math.pow(2, 53) - 1;
    this.minIntIndex = options.maxIntIndex ?? -Math.pow(2, 53) - 1;
    this.maxRecursionDepth = options.maxRecursionDepth ?? 50;
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
          if (
            !(arg instanceof JSONPathQuery || arg instanceof InfixExpression)
          ) {
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
