import type { JSONLike } from "../types";
import type { JSONPathNode, JSONPathNodeList } from "./nodes";
import type { Parser } from "./parser";
import type { Token } from "./token";

import { Count, Length, Match, Search, Value, type FilterFunction } from "./functions";
import { tokenize } from "./lexer";
import { StandardParser } from "./parser_standard";
import { JSONPathQuery } from "./query";

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
   * The maximum number of nested expressions allowed in a query before a
   * `JSONPathRecursionError` is thrown.
   */
  maxExpressionDepth?: number;

  /**
   * The maximum number of objects and/or arrays the recursive descent selector
   * can visit before a `JSONPathRecursionError` is thrown.
   */
  maxRecursionDepth?: number;

  parser?: ParserClass;
};

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
   * The maximum number of nested expressions allowed in a query before a
   * `JSONPathRecursionError` is thrown.
   */
  readonly maxExpressionDepth: number;

  /**
   * The maximum number of objects and/or arrays the recursive descent selector
   * can visit before a `JSONPathRecursionError` is thrown.
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

  compile(expression: string): JSONPathQuery {
    return new JSONPathQuery(this, new this.parser(this, expression, tokenize(expression)).parse());
  }

  find(expression: string, data: JSONLike): JSONPathNodeList {
    return this.compile(expression).find(data);
  }

  findIter(expression: string, data: JSONLike): IterableIterator<JSONPathNode> {
    return this.compile(expression).findIter(data);
  }

  /**
   * @deprecated Use {@link find} instead.
   */
  query(expression: string, data: JSONLike): JSONPathNodeList {
    return this.compile(expression).query(data);
  }

  /**
   * @deprecated Use {@link findIter} instead.
   */
  lazyQuery(expression: string, data: JSONLike): IterableIterator<JSONPathNode> {
    return this.compile(expression).lazyQuery(data);
  }

  findAll(expression: string, data: JSONLike): JSONLike[] {
    return this.compile(expression).findAll(data);
  }

  findAllIter(expression: string, data: JSONLike): IterableIterator<JSONLike> {
    return this.compile(expression).findAllIter(data);
  }

  findOne(expression: string, data: JSONLike): JSONPathNode | undefined {
    return this.compile(expression).findOne(data);
  }

  /**
   * @deprecated Use {@link findOne} instead.
   */
  match(expression: string, data: JSONLike): JSONPathNode | undefined {
    return this.compile(expression).match(data);
  }

  test(expression: string, data: JSONLike): boolean {
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
