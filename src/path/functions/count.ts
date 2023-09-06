import { JSONPathNodeList } from "../node";
import { FilterFunction, FunctionExpressionType } from "./function";

export class Count implements FilterFunction {
  readonly argTypes = [FunctionExpressionType.NodesType];
  readonly returnType = FunctionExpressionType.ValueType;

  public call(nodes: JSONPathNodeList): number {
    return nodes.length;
  }
}
