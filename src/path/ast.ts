import type { Token } from "./token";

export type Segment = ChildSegment | DescendantSegment;

export const CHILD_SEGMENT = 1 as const;
export const DESCENDANT_SEGMENT = 2 as const;

export type ChildSegment = {
  kind: 1;
  token: Token;
  selectors: Selector[];
};

export type DescendantSegment = {
  kind: 2;
  token: Token;
  selectors: Selector[];
};

export type Selector =
  | FilterSelector
  | IndexSelector
  | KeySelector
  | KeysFilterSelector
  | KeysSelector
  | NameSelector
  | SliceSelector
  | WildcardSelector;

export const FILTER_SELECTOR = 3 as const;
export const INDEX_SELECTOR = 4 as const;
export const KEY_SELECTOR = 5 as const;
export const KEYS_FILTER_SELECTOR = 6 as const;
export const KEYS_SELECTOR = 7 as const;
export const NAME_SELECTOR = 8 as const;
export const SLICE_SELECTOR = 9 as const;
export const WILDCARD_SELECTOR = 10 as const;

export type FilterSelector = {
  kind: 3;
  token: Token;
  expression: Expression;
};

export type IndexSelector = {
  kind: 4;
  token: Token;
  value: number;
};

export type KeySelector = {
  kind: 5;
  token: Token;
  value: string;
};

export type KeysFilterSelector = {
  kind: 6;
  token: Token;
  expression: Expression;
};

export type KeysSelector = {
  kind: 7;
  token: Token;
};

export type NameSelector = {
  kind: 8;
  token: Token;
  value: string;
};

export type SliceSelector = {
  kind: 9;
  token: Token;
  start: number | undefined;
  end: number | undefined;
  step: number | undefined;
};

export type WildcardSelector = {
  kind: 10;
  token: Token;
};

export type Expression =
  | AbsoluteQueryExpression
  | AndExpression
  | BoolExpression
  | CurrentKeyExpression
  | EqExpression
  | NumberExpression
  | FunctionExpression
  | GeExpression
  | GtExpression
  | LeExpression
  | LtExpression
  | NeExpression
  | NotExpression
  | NullExpression
  | OrExpression
  | RelativeQueryExpression
  | StringExpression;

export const ABSOLUTE_QUERY_EXPRESSION = 11 as const;
export const AND_EXPRESSION = 12 as const;
export const BOOL_EXPRESSION = 13 as const;
export const CURRENT_KEY_EXPRESSION = 14 as const;
export const EQ_EXPRESSION = 15 as const;
export const NUMBER_EXPRESSION = 16 as const;
export const FUNCTION_EXPRESSION = 17 as const;
export const GE_EXPRESSION = 18 as const;
export const GT_EXPRESSION = 19 as const;
export const LE_EXPRESSION = 20 as const;
export const LT_EXPRESSION = 21 as const;
export const NE_EXPRESSION = 22 as const;
export const NOT_EXPRESSION = 23 as const;
export const NULL_EXPRESSION = 24 as const;
export const OR_EXPRESSION = 25 as const;
export const RELATIVE_QUERY_EXPRESSION = 26 as const;
export const STRING_EXPRESSION = 27 as const;

export type AbsoluteQueryExpression = {
  kind: 11;
  token: Token;
  segments: Segment[];
};

export type AndExpression = {
  kind: 12;
  token: Token;
  left: Expression;
  right: Expression;
};

export type BoolExpression = {
  kind: 13;
  token: Token;
  value: boolean;
};

export type CurrentKeyExpression = {
  kind: 14;
  token: Token;
};

export type EqExpression = {
  kind: 15;
  token: Token;
  left: Expression;
  right: Expression;
};

export type NumberExpression = {
  kind: 16;
  token: Token;
  value: number;
};

export type FunctionExpression = {
  kind: 17;
  token: Token;
  name: string;
  arguments: Expression[];
};

export type GeExpression = {
  kind: 18;
  token: Token;
  left: Expression;
  right: Expression;
};

export type GtExpression = {
  kind: 19;
  token: Token;
  left: Expression;
  right: Expression;
};

export type LeExpression = {
  kind: 20;
  token: Token;
  left: Expression;
  right: Expression;
};

export type LtExpression = {
  kind: 21;
  token: Token;
  left: Expression;
  right: Expression;
};

export type NeExpression = {
  kind: 22;
  token: Token;
  left: Expression;
  right: Expression;
};

export type NotExpression = {
  kind: 23;
  token: Token;
  right: Expression;
};

export type NullExpression = {
  kind: 24;
  token: Token;
};

export type OrExpression = {
  kind: 25;
  token: Token;
  left: Expression;
  right: Expression;
};

export type RelativeQueryExpression = {
  kind: 26;
  token: Token;
  segments: Segment[];
};

export type StringExpression = {
  kind: 27;
  token: Token;
  value: string;
};
