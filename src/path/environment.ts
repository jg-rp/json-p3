import { UndefinedFilterFunctionError } from "./errors";
import { FilterExpression } from "./expression";
import { FilterFunction } from "./functions/function";
import { tokenize } from "./lex";
import { JSONPathNodeList } from "./node";
import { Parser } from "./parse";
import { JSONPath } from "./path";
import { Token, TokenStream } from "./token";
import { JSONValue } from "./types";

/**
 *
 */
export type JSONPathEnvironmentOptions = {
  /**
   *
   */
  strict: boolean;
};

export const defaultOptions: JSONPathEnvironmentOptions = {
  strict: true,
};

/**
 *
 */
export class JSONPathEnvironment {
  /**
   *
   */
  readonly filterRegister: Map<string, FilterFunction> = new Map();

  private parser: Parser;

  /**
   *
   * @param options -
   */
  constructor(readonly options: JSONPathEnvironmentOptions = defaultOptions) {
    this.parser = new Parser(this);
  }

  public compile(path: string): JSONPath {
    return new JSONPath(
      this,
      Array.from(this.parser.parse(new TokenStream(tokenize(path)))),
    );
  }

  public query(path: string, value: JSONValue): JSONPathNodeList {
    return this.compile(path).query(value);
  }

  /**
   *
   * @param token -
   * @param args -
   */
  public validateFunctionCall(
    token: Token,
    args: FilterExpression[],
  ): FilterExpression[] {
    const func = this.filterRegister.get(token.value);
    if (!func) {
      throw new UndefinedFilterFunctionError(
        `filter function '${token.value}' is undefined`,
        token,
      );
    }

    if (func.validate) return func.validate(args, token);
    return args;
  }
}
