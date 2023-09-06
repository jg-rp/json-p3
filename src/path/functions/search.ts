import { FilterFunction, FunctionExpressionType } from "./function";

export class Search implements FilterFunction {
  readonly argTypes = [
    FunctionExpressionType.ValueType,
    FunctionExpressionType.ValueType,
  ];

  readonly returnType = FunctionExpressionType.LogicalType;

  public call(s: string, pattern: string): boolean {
    try {
      // TODO: cache re
      const re = new RegExp(pattern, "u");
      return !!s.match(re);
    } catch {
      // TODO: log error
      return false;
    }
  }
}
