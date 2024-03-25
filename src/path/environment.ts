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
import { JSONPathNode, JSONPathNodeList } from "./node";
import { Parser } from "./parse";
import { JSONPath } from "./path";
import { Token, TokenStream } from "./token";
import { JSONValue } from "../types";
import { CurrentKey } from "./extra/expression";

/**
 * JSONPath environment options. The defaults are in compliance with JSONPath
 * standards.
 */
export type JSONPathEnvironmentOptions = {
  /**
   * Indicates if the environment should to be strict about its compliance with
   * RFC 9535.
   *
   * Defaults to `true`. Setting `strict` to `false` enables non-standard
   * features. Non-standard features are subject to change if:
   *
   * - conflicting features are included in a future JSONPath standard or a
   *   draft standard.
   * - an overwhelming consensus amongst the JSONPath community emerges for
   *   conflicting features
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

  /**
   * If `true`, enable nondeterministic ordering when iterating JSON object data.
   *
   * This is mainly useful for validating the JSONPath Compliance Test Suite.
   */
  nondeterministic?: boolean;

  /**
   * The pattern to use for the non-standard _keys selector_.
   *
   * The lexer expects the sticky bit to be set. Defaults to `/~/y`.
   */
  keysPattern?: RegExp;
};

/**
 * A configuration object from which JSONPath queries can be evaluated.
 *
 * An environment is where you'd register custom function extensions or set
 * the maximum recursion depth limit, for example.
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
   * If `true`, enable nondeterministic ordering when iterating JSON object data.
   */
  readonly nondeterministic: boolean;

  /**
   * The pattern to use for the non-standard _keys selector_.
   */
  readonly keysPattern: RegExp;

  /**
   * A map of function names to objects implementing the {@link FilterFunction}
   * interface. You are free to set or delete custom filter functions directly.
   */
  public functionRegister: Map<string, FilterFunction> = new Map();

  private parser: Parser;

  /**
   * @param options - Environment configuration options.
   */
  constructor(options: JSONPathEnvironmentOptions = {}) {
    this.strict = options.strict ?? true;
    this.maxIntIndex = options.maxIntIndex ?? Math.pow(2, 53) - 1;
    this.minIntIndex = options.maxIntIndex ?? -Math.pow(2, 53) - 1;
    this.maxRecursionDepth = options.maxRecursionDepth ?? 50;
    this.nondeterministic = options.nondeterministic ?? false;
    this.keysPattern = options.keysPattern ?? /~/y;

    this.parser = new Parser(this);
    this.setupFilterFunctions();
  }

  /**
   * @param path - A JSONPath query to parse.
   * @returns A new {@link JSONPath} object, bound to this environment.
   */
  public compile(path: string): JSONPath {
    return new JSONPath(
      this,
      this.parser.parse(new TokenStream(tokenize(this, path))),
    );
  }

  /**
   *
   * @param path - A JSONPath query to parse and evaluate against _value_.
   * @param value - Data to which _path_ will be applied.
   * @returns The {@link JSONPathNodeList} resulting from applying _path_
   * to _value_.
   */
  public query(path: string, value: JSONValue): JSONPathNodeList {
    return this.compile(path).query(value);
  }

  /**
   * A lazy version of {@link query} which is faster and more memory
   * efficient when querying some large datasets.
   *
   * @param path - A JSONPath query to parse and evaluate against _value_.
   * @param value - Data to which _path_ will be applied.
   * @returns A sequence of {@link JSONPathNode} objects resulting from
   * applying _path_ to _value_.
   */
  public lazyQuery(
    path: string,
    value: JSONValue,
  ): IterableIterator<JSONPathNode> {
    return this.compile(path).lazyQuery(value);
  }

  /**
   * Return a {@link JSONPathNode} instance for the first object found in
   * _value_ matching _path_.
   *
   * @param path - A JSONPath query.
   * @param value - JSON-like data to which the query _path_ will be applied.
   * @returns The first node in _value_ matching  _path_, or `undefined` if
   * there are no matches.
   */
  public match(path: string, value: JSONValue): JSONPathNode | undefined {
    return this.compile(path).match(value);
  }

  /**
   * A hook for setting up the function register. You are encouraged to
   * override this method in classes extending `JSONPathEnvironment`.
   */
  protected setupFilterFunctions(): void {
    this.functionRegister.set("count", new CountFilterFunction());
    this.functionRegister.set("length", new LengthFilterFunction());
    this.functionRegister.set("search", new SearchFilterFunction());
    this.functionRegister.set("match", new MatchFilterFunction());
    this.functionRegister.set("value", new ValueFilterFunction());
  }

  /**
   * Check the well-typedness of a function's arguments at compile-time.
   *
   * This method is called by the {@link Parser} when parsing function calls.
   * It is expected to throw a {@link JSONPathTypeError} if the function's
   * parameters are not well-typed.
   *
   * Override this if you want to deviate from the JSONPath Spec's function
   * extension type system.
   *
   * @param token - The {@link Token} starting the function call. `Token.value`
   * will contain the name of the function.
   * @param args - One {@link FilterExpression} for each argument.
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
              arg instanceof CurrentKey ||
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

  /**
   * Return an array of key/values of the enumerable properties in _obj_.
   *
   * If you want to introduce some nondeterminism to iterating JSON-like
   * objects, do it here. The wildcard selector, descendent segment and
   * filter selector all use `this.environment.entries`.
   *
   * @param obj - A JSON-like object.
   */
  public entries(obj: {
    [key: string]: JSONValue;
  }): Array<[string, JSONValue]> {
    function shuffle(entries: Array<[string, JSONValue]>) {
      for (let i = entries.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [entries[i], entries[j]] = [entries[j], entries[i]];
      }
      return entries;
    }

    if (this.nondeterministic) {
      return shuffle(Object.entries(obj));
    }

    return Object.entries(obj);
  }
}
