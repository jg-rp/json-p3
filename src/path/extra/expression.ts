import { FilterExpression } from "../expression";
import { FilterContext, Nothing } from "../types";

export class CurrentKey extends FilterExpression {
  public evaluate(context: FilterContext): string | number | typeof Nothing {
    return context.currentKey ?? Nothing;
  }

  public toString(): string {
    return "#";
  }
}
