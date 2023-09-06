import { FilterFunction, FunctionExpressionType } from "./function";
import { Nothing, isArray, isObject, isString } from "../types";

export class Length implements FilterFunction {
  readonly argTypes = [FunctionExpressionType.ValueType];
  readonly returnType = FunctionExpressionType.ValueType;

  public call(value: unknown): number | typeof Nothing {
    if (isArray(value) || isString(value)) return value.length;
    if (isObject(value)) return Object.keys(value).length;
    return Nothing;
  }
}
