import {
  ABSOLUTE_QUERY_EXPRESSION,
  AND_EXPRESSION,
  BOOL_EXPRESSION,
  CHILD_SEGMENT,
  CURRENT_KEY_EXPRESSION,
  DESCENDANT_SEGMENT,
  EQ_EXPRESSION,
  FILTER_SELECTOR,
  FUNCTION_EXPRESSION,
  GE_EXPRESSION,
  GT_EXPRESSION,
  INDEX_SELECTOR,
  KEY_SELECTOR,
  KEYS_FILTER_SELECTOR,
  KEYS_SELECTOR,
  LE_EXPRESSION,
  LT_EXPRESSION,
  NAME_SELECTOR,
  NE_EXPRESSION,
  NOT_EXPRESSION,
  NULL_EXPRESSION,
  NUMBER_EXPRESSION,
  OR_EXPRESSION,
  RELATIVE_QUERY_EXPRESSION,
  SLICE_SELECTOR,
  STRING_EXPRESSION,
  WILDCARD_SELECTOR,
  type Expression,
  type Segment,
  type Selector,
} from "./ast";
import { JSONPathError } from "./errors";

export const RE_IDENT = /^[\p{ID_Start}_]\p{ID_Continue}*$/u;

export function canonicalString(s: string): string {
  return `'${JSON.stringify(s).slice(1, -1).replaceAll('\\"', '"').replaceAll("'", "\\'")}'`;
}

export function shorthandString(s: string): string {
  return s.includes("'") && !s.includes('"') ? JSON.stringify(s) : canonicalString(s);
}

export function canonicalPath(segments: Segment[]): string {
  return "$" + segments.map((s) => serializeSegment(s, false)).join("");
}

export function shorthandPath(segments: Segment[]): string {
  return "$" + segments.map((s) => serializeSegment(s, true)).join("");
}

function serializeSegment(segment: Segment, shorthand: boolean): string {
  switch (segment.kind) {
    case CHILD_SEGMENT:
      if (shorthand && segment.selectors.length === 1) {
        return singleShorthandSelector(segment.selectors[0]!, ".");
      }
      return `[${segment.selectors.map((s) => serializeSelector(s, shorthand)).join(", ")}]`;

    case DESCENDANT_SEGMENT:
      if (shorthand && segment.selectors.length === 1) {
        return singleShorthandSelector(segment.selectors[0]!, "..");
      }
      return `..[${segment.selectors.map((s) => serializeSelector(s, shorthand)).join(", ")}]`;

    default:
      throw new JSONPathError("unreachable");
  }
}

function serializeSelector(selector: Selector, shorthand: boolean): string {
  switch (selector.kind) {
    case NAME_SELECTOR:
      return canonicalString(selector.value);

    case INDEX_SELECTOR:
      return selector.value.toString();

    case SLICE_SELECTOR:
      return `${selector.start || ""}:${selector.end || ""}:${selector.step || "1"}`;

    case WILDCARD_SELECTOR:
      return "*";

    case FILTER_SELECTOR:
      return `?${serializeExpression(selector.expression, PRECEDENCE_LOWEST, shorthand)}`;

    case KEY_SELECTOR:
      return `~${canonicalString(selector.value)}`;

    case KEYS_SELECTOR:
      return "~";

    case KEYS_FILTER_SELECTOR:
      return `~?${serializeExpression(selector.expression, PRECEDENCE_LOWEST, shorthand)}`;

    default:
      throw new JSONPathError("unreachable");
  }
}

function singleShorthandSelector(selector: Selector, prefix: string): string {
  const longhandPrefix = prefix === ".." ? prefix : "";

  switch (selector.kind) {
    case NAME_SELECTOR:
      if (RE_IDENT.test(selector.value)) {
        return prefix + selector.value;
      }

      return `${longhandPrefix}[${shorthandString(selector.value)}]`;

    case INDEX_SELECTOR:
      return `${longhandPrefix}[${selector.value}]`;

    case SLICE_SELECTOR:
      return `${longhandPrefix}[${selector.start || ""}:${selector.end || ""}:${selector.step || "1"}]`;

    case WILDCARD_SELECTOR:
      return prefix + "*";

    case FILTER_SELECTOR:
      return `${longhandPrefix}[?${serializeExpression(selector.expression, PRECEDENCE_LOWEST, true)}]`;

    case KEY_SELECTOR:
      return `${prefix}~${shorthandString(selector.value)}`;

    case KEYS_SELECTOR:
      return `${prefix}~`;

    case KEYS_FILTER_SELECTOR:
      return `${longhandPrefix}[~?${serializeExpression(selector.expression, PRECEDENCE_LOWEST, true)}]`;

    default:
      throw new JSONPathError("unreachable");
  }
}

const PRECEDENCE_LOWEST = 1;
const PRECEDENCE_LOGICAL_OR = 4;
const PRECEDENCE_LOGICAL_AND = 5;
const PRECEDENCE_PREFIX = 7;

function serializeExpression(
  expression: Expression,
  precedence: number,
  shorthand: boolean,
): string {
  let left: string;
  let right: string;

  switch (expression.kind) {
    case AND_EXPRESSION:
      left = serializeExpression(expression.left, PRECEDENCE_LOGICAL_AND, shorthand);
      right = serializeExpression(expression.right, PRECEDENCE_LOGICAL_AND, shorthand);
      return precedence >= PRECEDENCE_LOGICAL_AND ? `(${left} && ${right})` : `${left} && ${right}`;

    case OR_EXPRESSION:
      left = serializeExpression(expression.left, PRECEDENCE_LOGICAL_OR, shorthand);
      right = serializeExpression(expression.right, PRECEDENCE_LOGICAL_OR, shorthand);
      return precedence >= PRECEDENCE_LOGICAL_OR ? `(${left} || ${right})` : `${left} || ${right}`;

    case NOT_EXPRESSION:
      right = serializeExpression(expression.right, PRECEDENCE_PREFIX, shorthand);
      return precedence > PRECEDENCE_PREFIX ? `(!${right})` : `!${right}`;

    case NULL_EXPRESSION:
      return "null";

    case BOOL_EXPRESSION:
    case NUMBER_EXPRESSION:
      return expression.value.toString();

    case STRING_EXPRESSION:
      return shorthand ? shorthandString(expression.value) : canonicalString(expression.value);

    case EQ_EXPRESSION:
      left = serializeExpression(expression.left, PRECEDENCE_LOWEST, shorthand);
      right = serializeExpression(expression.right, PRECEDENCE_LOWEST, shorthand);
      return `${left} == ${right}`;

    case NE_EXPRESSION:
      left = serializeExpression(expression.left, PRECEDENCE_LOWEST, shorthand);
      right = serializeExpression(expression.right, PRECEDENCE_LOWEST, shorthand);
      return `${left} != ${right}`;

    case LT_EXPRESSION:
      left = serializeExpression(expression.left, PRECEDENCE_LOWEST, shorthand);
      right = serializeExpression(expression.right, PRECEDENCE_LOWEST, shorthand);
      return `${left} < ${right}`;

    case LE_EXPRESSION:
      left = serializeExpression(expression.left, PRECEDENCE_LOWEST, shorthand);
      right = serializeExpression(expression.right, PRECEDENCE_LOWEST, shorthand);
      return `${left} <= ${right}`;

    case GT_EXPRESSION:
      left = serializeExpression(expression.left, PRECEDENCE_LOWEST, shorthand);
      right = serializeExpression(expression.right, PRECEDENCE_LOWEST, shorthand);
      return `${left} > ${right}`;

    case GE_EXPRESSION:
      left = serializeExpression(expression.left, PRECEDENCE_LOWEST, shorthand);
      right = serializeExpression(expression.right, PRECEDENCE_LOWEST, shorthand);
      return `${left} >= ${right}`;

    case ABSOLUTE_QUERY_EXPRESSION:
      return "$" + expression.segments.map((s) => serializeSegment(s, shorthand)).join("");

    case RELATIVE_QUERY_EXPRESSION:
      return "@" + expression.segments.map((s) => serializeSegment(s, shorthand)).join("");

    case FUNCTION_EXPRESSION:
      const args = expression.arguments.map((arg) =>
        serializeExpression(arg, PRECEDENCE_LOWEST, shorthand),
      );
      return `${expression.name}(${args.join(", ")})`;

    case CURRENT_KEY_EXPRESSION:
      return "#";

    default:
      throw new JSONPathError("unreachable");
  }
}
