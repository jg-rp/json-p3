import { getTokenValue, type Token } from "./token";

export interface Diagnostic {
  span: Token;
  source: string;
}

export function formatDetailedMessage(err: DiagnosticError): string {
  const d = err.diagnostic;
  const lines = splitLines(d.source);
  const [line, column] = lineCol(d.span.start, lines);
  const currentLine = lines[line - 1] ?? "";
  const value = getTokenValue(d.span, d.source);

  const pad = " ".repeat(String(line).length);
  const pointer = " ".repeat(column) + "^".repeat(Math.max(value.length, 1));
  const location = `${d.source}:${line}:${column}`;

  let out = "";

  out += `${err.label}: ${err.message}\n`;
  out += `${pad} -> ${location}\n`;
  out += `${pad} |\n`;
  out += `${line} | ${currentLine}\n`;
  out += `${pad} | ${pointer} ${err.message}\n`;

  return out;
}

export function splitLines(source: string): string[] {
  const lines = source.split(/(?<=\n)/);
  if (lines[lines.length - 1] === "") {
    lines.pop();
  }
  return lines;
}

export function lineCol(index: number, lines: string[]): [number, number] {
  if (lines.length === 0) return [1, 1];

  let cumulativeLength = 0;
  let targetLineIndex = -1;

  for (const [i, line] of lines.entries()) {
    cumulativeLength += line.length;
    if (index < cumulativeLength) {
      targetLineIndex = i;
      break;
    }
  }

  if (targetLineIndex === -1) return [lines.length, (lines[lines.length - 1] ?? " ").length];

  const lineNumber = targetLineIndex + 1;
  const line = lines[targetLineIndex] || "";
  const columnNumber = index - (cumulativeLength - line.length);
  return [lineNumber, columnNumber];
}

export class JSONPathError extends Error {
  constructor(override message: string) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class DiagnosticError extends JSONPathError {
  constructor(
    message: string,
    readonly diagnostic: Diagnostic,
  ) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace?.(this, new.target);
    this.stack = undefined;
  }

  render(): string {
    return formatDetailedMessage(this);
  }

  get label(): string {
    return "error";
  }
}

export class DetailedJSONPathError extends DiagnosticError {
  constructor(
    message: string,
    readonly span: Token,
    readonly source: string,
  ) {
    super(message, { span, source });
  }
}

export class JSONPathSyntaxError extends DetailedJSONPathError {
  override get label(): string {
    return "syntax error";
  }
}

export class JSONPathNameError extends DetailedJSONPathError {
  override get label(): string {
    return "name error";
  }
}

export class JSONPathTypeError extends DetailedJSONPathError {
  override get label(): string {
    return "type error";
  }
}

export class JSONPathRecursionError extends JSONPathError {}
