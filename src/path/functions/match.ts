import { FilterFunction, FunctionExpressionType } from "./function";

export class Match implements FilterFunction {
  readonly argTypes = [
    FunctionExpressionType.ValueType,
    FunctionExpressionType.ValueType,
  ];

  readonly returnType = FunctionExpressionType.LogicalType;

  public call(s: string, pattern: string): boolean {
    try {
      // TODO: cache re
      const re = new RegExp(this.fullMatch(pattern), "u");
      return re.test(s);
    } catch {
      // TODO: log error
      return false;
    }
  }

  protected fullMatch(pattern: string): string {
    const parts: string[] = [];
    if (!pattern.startsWith("^")) parts.push("^");
    parts.push(pattern);
    if (!pattern.endsWith("$")) parts.push("$");
    return parts.join("");
  }
}
