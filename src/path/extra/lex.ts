/** A lexer that accepts additional, non-standard tokens. */
import { JSONPathLexerError, JSONPathSyntaxError } from "../errors";
import { Token, TokenKind } from "../token";

// These regular expressions are to be used with Lexer.acceptMatchRun(),
// which expects the sticky flag to be set.
const exponentPattern = /e[+-]?\d+/y;
const functionNamePattern = /[a-z][a-z_0-9]*/y;
const indexPattern = /-?\d+/y;
const intPattern = /-?[0-9]+/y;
const namePattern = /[\u0080-\uFFFFa-zA-Z_][\u0080-\uFFFFa-zA-Z0-9_-]*/y;
const keysPattern = /~/y;
const whitespace = new Set([" ", "\n", "\t", "\r"]);

/**
 * JSONPath lexical scanner.
 *
 * Lexer state is shared between this class and the current state function. A
 * new _Lexer_ instance is automatically created every time a path is tokenized.
 *
 * Use {@link tokenize} to get an array of {@link Token}'s for a JSONPath query.
 */
class Lexer {
  /**
   * Filter nesting level.
   */
  public filterLevel: number = 0;

  /**
   * A running count of parentheses for each, possibly nested, function call.
   *
   * If the stack is empty, we are not in a function call. Remember that
   * function arguments can use arbitrarily nested in parentheses.
   */
  public parenStack: number[] = [];

  /** Tokens resulting from tokenizing a JSONPath query. */
  public tokens: Token[] = [];

  #start: number = 0;
  #pos: number = 0;

  /**
   * @param path - A JSONPath query.
   */
  constructor(readonly path: string) {}

  public get pos(): number {
    return this.#pos;
  }

  public get start(): number {
    return this.#start;
  }

  public run(): void {
    let state: StateFn | null = lexRoot;
    while (state) {
      state = state(this);
    }
  }

  public emit(t: TokenKind): void {
    this.tokens.push(
      new Token(
        t,
        this.path.slice(this.#start, this.#pos),
        this.#start,
        this.path,
      ),
    );
    this.#start = this.#pos;
  }

  public next(): string {
    if (this.#pos >= this.path.length) return "";
    const s = this.path[this.#pos];
    this.#pos += 1;
    return s;
  }

  public ignore(): void {
    this.#start = this.#pos;
  }

  public backup(): void {
    if (this.#pos <= this.#start) {
      const msg = "can't backup beyond start";
      throw new JSONPathLexerError(
        msg,
        new Token(TokenKind.ERROR, msg, this.#pos, this.path),
      );
    }
    this.#pos -= 1;
  }

  public peek(): string {
    const ch = this.next();
    if (ch) this.backup();
    return ch;
  }

  public accept(valid: Set<string>): boolean {
    const ch = this.next();
    if (valid.has(ch)) return true;
    if (ch) this.backup();
    return false;
  }

  public acceptMatch(pattern: RegExp): boolean {
    const ch = this.next();
    if (pattern.test(ch)) return true;
    if (ch) this.backup();
    return false;
  }

  public acceptRun(valid: Set<string>): boolean {
    let found = false;
    let ch = this.next();
    while (valid.has(ch)) {
      ch = this.next();
      found = true;
    }
    if (ch) this.backup();
    return found;
  }

  public acceptMatchRun(pattern: RegExp): boolean {
    pattern.lastIndex = this.#pos;
    const match = pattern.exec(this.path);
    pattern.lastIndex = 0;
    if (match) {
      this.#pos += match[0].length;
      return true;
    }
    return false;
  }

  public ignoreWhitespace(): boolean {
    if (this.#pos !== this.#start) {
      const msg = `must emit or ignore before consuming whitespace ('${this.path.slice(
        this.#start,
        this.#pos,
      )}':${this.pos})`;

      throw new JSONPathLexerError(
        msg,
        new Token(TokenKind.ERROR, msg, this.pos, this.path),
      );
    }
    if (this.acceptRun(whitespace)) {
      this.ignore();
      return true;
    }
    return false;
  }

  public error(msg: string): void {
    this.tokens.push(new Token(TokenKind.ERROR, msg, this.#pos, this.path));
  }
}

type StateFn = (l: Lexer) => StateFn | null;

/**
 * Return a lexer for _path_ and an array to be populated with Tokens.
 *
 * `lexer.run()` must be called to populate the returned tokens array.
 *
 * You probably want to use {@link tokenize} instead of _lex_. This function
 * is mostly for internal use, where we want to test the state of the returned
 * _lexer_ after tokens have been populated.
 *
 * @param path - A JSONPath query.
 * @returns A two-tuple containing a lexer for _path_ and an array to populate
 * with tokens.
 */
export function lex(path: string): [Lexer, Token[]] {
  const lexer = new Lexer(path);
  return [lexer, lexer.tokens];
}

/**
 * Scan _path_ and return an array of tokens to be parsed by the parser.
 * @param path - A JSONPath query.
 * @returns Tokens to be parsed by the parser.
 */
export function tokenize(path: string): Token[] {
  const [lexer, tokens] = lex(path);
  lexer.run();
  if (tokens.length && tokens[tokens.length - 1].kind === TokenKind.ERROR) {
    throw new JSONPathSyntaxError(
      tokens[tokens.length - 1].value,
      tokens[tokens.length - 1],
    );
  }
  return tokens;
}

function lexRoot(l: Lexer): StateFn | null {
  const ch = l.next();
  if (ch !== "$") {
    l.backup();
    l.error(`expected '$', found '${ch}'`);
    return null;
  }
  l.emit(TokenKind.ROOT);
  return lexSegment;
}

function lexSegment(l: Lexer): StateFn | null {
  if (l.ignoreWhitespace() && !l.peek()) {
    l.error("trailing whitespace");
  }
  const ch = l.next();
  switch (ch) {
    case "":
      l.emit(TokenKind.EOF);
      return null;
    case ".":
      if (l.peek() === ".") {
        l.next();
        l.emit(TokenKind.DDOT);
        return lexDescendantSelection;
      }
      return lexDotSelector;
    case "[":
      l.emit(TokenKind.LBRACKET);
      return lexInsideBracketedSelection;
    default:
      l.backup();
      if (l.filterLevel) return lexInsideFilter;
      l.error(`expected '.', '..' or a bracketed selection, found '${ch}'`);
      return null;
  }
}

/**
 * Similar to _lexSegment_, but ..
 *   - no leading whitespace
 *   - no extra dot before a property name
 *   - there must be a selector, so EOF would be an error
 * @param l -
 * @returns -
 */
function lexDescendantSelection(l: Lexer): StateFn | null {
  const ch = l.next();
  switch (ch) {
    case "":
      l.error("bald descendant segment");
      return null;
    case "*":
      l.emit(TokenKind.WILD);
      return lexSegment;
    case "[":
      l.emit(TokenKind.LBRACKET);
      return lexInsideBracketedSelection;
    default:
      l.backup();
      if (l.acceptMatchRun(namePattern)) {
        l.emit(TokenKind.NAME);
        return lexSegment;
      }

      if (l.acceptMatchRun(keysPattern)) {
        l.emit(TokenKind.KEYS);
        return lexSegment;
      }

      l.error(`unexpected descendent selection token '${ch}'`);
      return null;
  }
}

function lexDotSelector(l: Lexer): StateFn | null {
  l.ignore();

  if (l.ignoreWhitespace()) {
    l.error("unexpected whitespace after dot");
    return null;
  }

  const ch = l.next();
  if (ch === "*") {
    l.emit(TokenKind.WILD);
    return lexSegment;
  }

  l.backup();

  if (l.acceptMatchRun(keysPattern)) {
    l.emit(TokenKind.KEYS);
    return lexSegment;
  }

  if (l.acceptMatchRun(namePattern)) {
    l.emit(TokenKind.NAME);
    return lexSegment;
  }

  l.error(`unexpected shorthand selector '${ch}'`);
  return null;
}

function lexInsideBracketedSelection(l: Lexer): StateFn | null {
  for (;;) {
    l.ignoreWhitespace();
    const ch = l.next();
    switch (ch) {
      case "]":
        l.emit(TokenKind.RBRACKET);
        if (l.filterLevel) return lexInsideFilter;
        return lexSegment;
      case "":
        l.error("unclosed bracketed selection");
        return null;
      case "*":
        l.emit(TokenKind.WILD);
        continue;
      case "?":
        l.emit(TokenKind.FILTER);
        l.filterLevel += 1;
        return lexInsideFilter;
      case ",":
        l.emit(TokenKind.COMMA);
        continue;
      case ":":
        l.emit(TokenKind.COLON);
        continue;
      case "'":
        return lexSingleQuoteStringInsideBracketSelection;
      case '"':
        return lexDoubleQuoteStringInsideBracketSelection;
      default:
        l.backup();

        if (l.acceptMatchRun(indexPattern)) {
          l.emit(TokenKind.INDEX);
          continue;
        }

        if (l.acceptMatchRun(keysPattern)) {
          l.emit(TokenKind.KEYS);
          continue;
        }

        l.error(`unexpected token '${ch}' in bracketed selection`);
        return null;
    }
  }
}

// eslint-disable-next-line sonarjs/cognitive-complexity
function lexInsideFilter(l: Lexer): StateFn | null {
  for (;;) {
    l.ignoreWhitespace();
    const ch = l.next();
    switch (ch) {
      case "":
        l.error("unclosed bracketed selection");
        return null;
      case "]":
        l.filterLevel -= 1;
        if (l.parenStack.length === 1) {
          l.error("unbalanced parentheses");
          return null;
        }
        l.backup();
        return lexInsideBracketedSelection;
      case ",":
        l.emit(TokenKind.COMMA);
        // If we have unbalanced parens, we are inside a function call and a
        // comma separates arguments. Otherwise a comma separates selectors.
        if (l.parenStack.length) continue;
        l.filterLevel -= 1;
        return lexInsideBracketedSelection;
      case "'":
        return lexSingleQuoteStringInsideFilterExpression;
      case '"':
        return lexDoubleQuoteStringInsideFilterExpression;
      case "(":
        l.emit(TokenKind.LPAREN);
        // Are we in a function call? If so, a function argument contains parens.
        if (l.parenStack.length) l.parenStack[l.parenStack.length - 1] += 1;
        continue;
      case ")":
        l.emit(TokenKind.RPAREN);
        // Are we closing a function call or a parenthesized expression?
        if (l.parenStack.length) {
          if (l.parenStack[l.parenStack.length - 1] === 1) {
            l.parenStack.pop();
          } else {
            l.parenStack[l.parenStack.length - 1] -= 1;
          }
        }
        continue;
      case "$":
        l.emit(TokenKind.ROOT);
        return lexSegment;
      case "@":
        l.emit(TokenKind.CURRENT);
        return lexSegment;
      case "#":
        l.emit(TokenKind.KEY);
        return lexSegment;
      case ".":
        l.backup();
        return lexSegment;
      case "!":
        if (l.peek() === "=") {
          l.next();
          l.emit(TokenKind.NE);
        } else {
          l.emit(TokenKind.NOT);
        }
        continue;
      case "=":
        if (l.peek() === "=") {
          l.next();
          l.emit(TokenKind.EQ);
          continue;
        } else {
          l.backup();
          l.error(`unexpected filter selector token '${ch}'`);
          return null;
        }
      case "<":
        if (l.peek() === "=") {
          l.next();
          l.emit(TokenKind.LE);
        } else {
          l.emit(TokenKind.LT);
        }
        continue;
      case ">":
        if (l.peek() === "=") {
          l.next();
          l.emit(TokenKind.GE);
        } else {
          l.emit(TokenKind.GT);
        }
        continue;
      default:
        l.backup();

        // numbers
        if (l.acceptMatchRun(intPattern)) {
          if (l.peek() === ".") {
            // A float.
            l.next();
            if (!l.acceptMatchRun(intPattern)) {
              // Need at least one digit after a decimal place.
              l.error("a fractional digit is required after a decimal point");
              return null;
            }
          }
          l.acceptMatchRun(exponentPattern);
          l.emit(TokenKind.NUMBER);
          continue;
        }

        if (l.acceptMatchRun(/&&/y)) {
          l.emit(TokenKind.AND);
          continue;
        }

        if (l.acceptMatchRun(/\|\|/y)) {
          l.emit(TokenKind.OR);
          continue;
        }

        if (l.acceptMatchRun(/true/y)) {
          l.emit(TokenKind.TRUE);
          continue;
        }
        if (l.acceptMatchRun(/false/y)) {
          l.emit(TokenKind.FALSE);
          continue;
        }

        if (l.acceptMatchRun(/null/y)) {
          l.emit(TokenKind.NULL);
          continue;
        }

        // functions
        if (l.acceptMatchRun(functionNamePattern) && l.peek() === "(") {
          // Keep track of parentheses for this function call.
          l.parenStack.push(1);
          l.emit(TokenKind.FUNCTION);
          l.next();
          l.ignore();
          continue;
        }
    }

    l.error(`unexpected filter selector token '${ch}'`);
    return null;
  }
}

/**
 * Return a state function tokenizing string literals using _quote_ and
 * returning control to _state_.
 * @param quote - One of `'` or `"`.
 * @param state - The state function to return control to.
 * @returns String tokenizing state function.
 */
function makeLexString(quote: string, state: StateFn): StateFn {
  // eslint-disable-next-line sonarjs/cognitive-complexity
  function _lexString(l: Lexer): StateFn | null {
    l.ignore();

    if (l.peek() === quote) {
      // empty string
      l.emit(
        quote === "'"
          ? TokenKind.SINGLE_QUOTE_STRING
          : TokenKind.DOUBLE_QUOTE_STRING,
      );
      l.next();
      l.ignore();
      return state;
    }

    for (;;) {
      const la = l.path.slice(l.pos, l.pos + 2);
      const ch = l.next();
      if (la === "\\\\" || la === `\\${quote}`) {
        l.next();
        continue;
      } else if (ch === "\\" && !la.match(/\\[bfnrtu/]/)) {
        l.error(`invalid escape`);
        return null;
      }

      if (!ch) {
        l.error(`unclosed string starting at index ${l.start}`);
        return null;
      }

      if (ch === quote) {
        l.backup();
        l.emit(
          quote === "'"
            ? TokenKind.SINGLE_QUOTE_STRING
            : TokenKind.DOUBLE_QUOTE_STRING,
        );
        l.next();
        l.ignore();
        return state;
      }
    }
  }
  return _lexString;
}

const lexSingleQuoteStringInsideBracketSelection = makeLexString(
  "'",
  lexInsideBracketedSelection,
);

const lexDoubleQuoteStringInsideBracketSelection = makeLexString(
  '"',
  lexInsideBracketedSelection,
);

const lexSingleQuoteStringInsideFilterExpression = makeLexString(
  "'",
  lexInsideFilter,
);

const lexDoubleQuoteStringInsideFilterExpression = makeLexString(
  '"',
  lexInsideFilter,
);
