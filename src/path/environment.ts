import type { JSONValue } from "../types.js";
import type { JSONPathNode } from "./nodes.js";
import type { Parser } from "./parser.js";
import type { Token } from "./token.js";

import { Count, Length, Match, Search, Value, type FilterFunction } from "./functions.js";
import { tokenize } from "./lexer.js";
import { StandardParser } from "./parser_standard.js";
import { JSONPathQuery } from "./query.js";

export type ParserClass = new (env: JSONPathEnvironment, source: string, tokens: Token[]) => Parser;

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
   * features. Non-standard features are subject to change if conflicting
   * features are included in a future JSONPath standard or draft standard, or
   * an overwhelming consensus amongst the JSONPath community emerges that
   * differs from this implementation.
   */
  strict?: boolean;

  /**
   * The maximum integer allowed when indexing or slicing an array. Defaults to
   * 2**53 -1.
   */
  maxIntIndex?: number;

  /**
   * The minimum integer allowed when indexing or slicing an array. Defaults to
   * -(2**53) -1.
   */
  minIntIndex?: number;

  /**
   * The maximum number of nested expressions allowed in a query before a
   * `JSONPathRecursionError` is thrown.
   */
  maxExpressionDepth?: number;

  /**
   * The maximum number of objects and/or arrays the descendant segment can
   * visit before a `JSONPathRecursionError` is thrown.
   */
  maxRecursionDepth?: number;

  /**
   * The JSONPath parser to use. Currently there's only one parser.
   */
  parser?: ParserClass;
};

export class JSONPathEnvironment {
  /**
   * Indicates if the environment should to be strict about its compliance with
   * JSONPath standards.
   *
   * Defaults to `true`. Setting `strict` to `false` enables the non-standard
   * current key identifier, key selector, keys selector and keys filter
   * selector.
   */
  readonly strict: boolean;

  /**
   * The maximum integer allowed when indexing or slicing an array. Defaults to
   * 2**53 -1.
   */
  readonly maxIntIndex: number;

  /**
   * The minimum integer allowed when indexing or slicing an array. Defaults to
   * -(2**53) -1.
   */
  readonly minIntIndex: number;

  /**
   * The maximum number of nested expressions allowed in a query before a
   * `JSONPathRecursionError` is thrown.
   */
  readonly maxExpressionDepth: number;

  /**
   * The maximum number of objects and/or arrays the descendant segment can
   * visit before a `JSONPathRecursionError` is thrown.
   */
  readonly maxRecursionDepth: number;

  readonly parser: ParserClass;

  public functions: { [key: string]: FilterFunction } = Object.create(null);

  /**
   * @param options - Environment configuration options.
   */
  constructor(options: JSONPathEnvironmentOptions = {}) {
    this.strict = options.strict ?? true;
    this.maxIntIndex = options.maxIntIndex ?? Math.pow(2, 53) - 1;
    this.minIntIndex = options.maxIntIndex ?? -Math.pow(2, 53) + 1;
    this.maxExpressionDepth = options.maxExpressionDepth ?? 30;
    this.maxRecursionDepth = options.maxRecursionDepth ?? 100;
    this.parser = options.parser ?? StandardParser;

    this.setupFilterFunctions();
  }

  /**
   * Compile a JSONPath query expression for later evaluation.
   */
  compile(expression: string): JSONPathQuery {
    return new JSONPathQuery(this, new this.parser(this, expression, tokenize(expression)).parse());
  }

  /**
   * Evaluate JSONPath query _expression_ against _data_ and return an array of matched nodes.
   */
  find(expression: string, data: JSONValue): JSONPathNode[] {
    return this.compile(expression).find(data);
  }

  /**
   * Evaluate JSONPath query _expression_ against _data_ and generate nodes lazily.
   *
   * Note that some queries will require node iterators to be materialized into node lists, so
   * peak memory usage might be higher than expected.
   */
  findIter(expression: string, data: JSONValue): IterableIterator<JSONPathNode> {
    return this.compile(expression).findIter(data);
  }

  /**
   * Evaluate JSONPath query _expression_ against _data_ and return an array of matched nodes.
   *
   * @deprecated Use {@link find} instead.
   */
  query(expression: string, data: JSONValue): JSONPathNode[] {
    return this.compile(expression).query(data);
  }

  /**
   * Evaluate JSONPath query _expression_ against _data_ and generate nodes lazily.
   *
   * @deprecated Use {@link findIter} instead.
   */
  lazyQuery(expression: string, data: JSONValue): IterableIterator<JSONPathNode> {
    return this.compile(expression).lazyQuery(data);
  }

  /**
   * Evaluate JSONPath query _expression_ against _data_ and return an array of values.
   */
  findAll(expression: string, data: JSONValue): JSONValue[] {
    return this.compile(expression).findAll(data);
  }

  /**
   * Evaluate JSONPath query _expression_ against _data_ and generate values lazily.
   *
   * Note that some queries will require internal iterators to be materialized into arrays, so
   * peak memory usage might be higher than expected.
   */
  findAllIter(expression: string, data: JSONValue): IterableIterator<JSONValue> {
    return this.compile(expression).findAllIter(data);
  }

  /**
   * Evaluate JSONPath query _expression_ against _data_ and return the first matching node,
   * or `undefined` if there were no matches.
   */
  findOne(expression: string, data: JSONValue): JSONPathNode | undefined {
    return this.compile(expression).findOne(data);
  }

  /**
   * Evaluate JSONPath query _expression_ against _data_ and return the first matching node,
   * or `undefined` if there were no matches.
   *
   * @deprecated Use {@link findOne} instead.
   */
  match(expression: string, data: JSONValue): JSONPathNode | undefined {
    return this.compile(expression).match(data);
  }

  /**
   * Return `true` if JSONPath query _expression_ matches at least one node in `data`, or
   * `false` otherwise.
   */
  test(expression: string, data: JSONValue): boolean {
    return this.compile(expression).test(data);
  }

  /**
   * A hook for setting up the function register. You are encouraged to
   * override this method in classes extending `JSONPathEnvironment`.
   */
  protected setupFilterFunctions(): void {
    this.functions["count"] = new Count();
    this.functions["length"] = new Length();
    this.functions["match"] = new Match();
    this.functions["search"] = new Search();
    this.functions["value"] = new Value();
  }
}
