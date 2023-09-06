import { JSONPathNodeList } from "../node";
import { Nothing } from "../types";
import { FilterFunction, FunctionExpressionType } from "./function";

export class Value implements FilterFunction {
  readonly argTypes = [FunctionExpressionType.NodesType];
  readonly returnType = FunctionExpressionType.ValueType;

  public call(nodes: JSONPathNodeList): unknown {
    if (nodes.length === 1) return nodes.nodes[0].value;
    return Nothing;
  }
}
