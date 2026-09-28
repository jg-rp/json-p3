import { deepEquals } from "../deep_equals";
import { isNumber, isString } from "../types";
import { BasicNodeList, InternalNodeList } from "./nodes";
import { Nothing } from "./nothing";

export abstract class Resolver {
  isTruthy(value: unknown): boolean {
    if (value instanceof InternalNodeList || value instanceof BasicNodeList) {
      return value.length > 0;
    }

    if (value === Nothing) {
      return false;
    }

    return !(typeof value === "boolean" && !value);
  }

  eq(left: unknown, right: unknown): boolean {
    if (left === Nothing && right === Nothing) {
      return true;
    }

    if (
      left instanceof InternalNodeList ||
      right instanceof InternalNodeList ||
      left instanceof BasicNodeList ||
      right instanceof BasicNodeList
    ) {
      return false;
    }

    return deepEquals(left, right);
  }

  lt(left: unknown, right: unknown): boolean {
    if ((isString(left) && isString(right)) || (isNumber(left) && isNumber(right)))
      return left < right;
    return false;
  }
}
