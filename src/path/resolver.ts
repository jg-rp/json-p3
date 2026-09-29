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
    if (left instanceof InternalNodeList) {
      switch (left.length) {
        case 0:
          left = Nothing;
          break;
        case 1:
          left = left.nodes[0]!.value;
          break;
        default:
          return false;
      }
    } else if (left instanceof BasicNodeList) {
      switch (left.length) {
        case 0:
          left = Nothing;
          break;
        case 1:
          left = left.nodes[0];
          break;
        default:
          return false;
      }
    }

    if (right instanceof InternalNodeList) {
      switch (right.length) {
        case 0:
          right = Nothing;
          break;
        case 1:
          right = right.nodes[0]!.value;
          break;
        default:
          return false;
      }
    } else if (right instanceof BasicNodeList) {
      switch (right.length) {
        case 0:
          right = Nothing;
          break;
        case 1:
          right = right.nodes[0];
          break;
        default:
          return false;
      }
    }

    if (left === Nothing && right === Nothing) {
      return true;
    }

    return deepEquals(left, right);
  }

  lt(left: unknown, right: unknown): boolean {
    if (left instanceof InternalNodeList) {
      switch (left.length) {
        case 1:
          left = left.nodes[0]!.value;
          break;
        default:
          return false;
      }
    } else if (left instanceof BasicNodeList) {
      switch (left.length) {
        case 1:
          left = left.nodes[0];
          break;
        default:
          return false;
      }
    }

    if (right instanceof InternalNodeList) {
      switch (right.length) {
        case 1:
          right = right.nodes[0]!.value;
          break;
        default:
          return false;
      }
    } else if (right instanceof BasicNodeList) {
      switch (right.length) {
        case 1:
          right = right.nodes[0];
          break;
        default:
          return false;
      }
    }

    if ((isString(left) && isString(right)) || (isNumber(left) && isNumber(right)))
      return left < right;
    return false;
  }
}
