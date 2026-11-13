const UNICODE_CATEGORIES = new Set([
  "L",
  "M",
  "N",
  "P",
  "S",
  "Z",
  "C",
  "Lu",
  "Ll",
  "Lt",
  "Lm",
  "Lo",
  "Mn",
  "Mc",
  "Me",
  "Nd",
  "Nl",
  "No",
  "Pc",
  "Pd",
  "Ps",
  "Pe",
  "Pi",
  "Pf",
  "Po",
  "Sm",
  "Sc",
  "Sk",
  "So",
  "Zs",
  "Zl",
  "Zp",
  "Cc",
  "Cf",
  "Cn",
  "Co",
  "Cs",
]);

const SINGLE_CHAR_ESCAPES = new Set("()*+-.?[\\]^nrt{|}");

/**
 * Return `true` if _pattern_ conforms to RFC 9485, or `false` otherwise.
 */
export function checkIRegexp(pattern: string): boolean {
  const length = pattern.length;
  let byte: number;
  let pos = 0;
  let depth = 0;
  let expectAtom = true;

  while (pos < length) {
    byte = pattern.charCodeAt(pos);

    switch (byte) {
      case 40: // (
        depth += 1;
        pos += 1;
        expectAtom = true;
        break;
      case 41: // )
        if (depth === 0) {
          return false;
        }

        depth -= 1;
        pos += 1;
        expectAtom = false;
        break;
      case 124: // |
        pos += 1;
        expectAtom = true;
        break;
      case 42: // *
      case 43: // +
      case 63: // ?
        if (expectAtom) {
          return false;
        }

        pos += 1;
        expectAtom = true;
        break;
      case 123: // {
        if (expectAtom) {
          return false;
        }

        pos = checkRangeQuantifier(pattern, pos + 1, length);
        if (pos === -1) {
          return false;
        }

        expectAtom = true;
        break;
      case 91: // [
        pos = checkCharClass(pattern, pos + 1, length);
        if (pos === -1) {
          return false;
        }

        expectAtom = false;
        break;
      case 92: // \
        pos = checkEscapeSequence(pattern, pos + 1, length);
        if (pos === -1) {
          return false;
        }

        expectAtom = false;
        break;
      case 93: // ]
      case 125: // }
        return false;
      default:
        pos += 1;
        expectAtom = false;
    }
  }

  return depth === 0;
}

function checkCharClass(pattern: string, pos: number, length: number): number {
  if (pos >= length) {
    return -1;
  }

  if (pattern.charCodeAt(pos) === 94) {
    // ^
    pos += 1;
  }

  let ch: number;
  let isCCChar: boolean;
  let hasItem = false;

  if (pos < length && pattern.charCodeAt(pos) === 45) {
    // -
    hasItem = true;
    pos += 1;
  }

  while (pos < length) {
    ch = pattern.charCodeAt(pos);

    if (ch === 93) {
      // ]
      return hasItem ? pos + 1 : -1;
    }

    // -]
    if (ch === 45 && pos + 1 < length && pattern.charCodeAt(pos + 1) === 93) {
      return pos + 2;
    }

    [pos, isCCChar] = parseCCAtom(pattern, pos, length);
    if (pos === -1) {
      return -1;
    }

    hasItem = true;

    // -
    if (isCCChar && pos < length && pattern.charCodeAt(pos) === 45) {
      // ]
      if (pos + 1 < length && pattern.charCodeAt(pos + 1) === 93) {
        return pos + 2; // trailing '-'
      }

      pos += 1; // -
      [pos, isCCChar] = parseCCAtom(pattern, pos, length);
      if (pos === -1 || !isCCChar) {
        return -1;
      }
    }
  }

  return -1;
}

function parseCCAtom(pattern: string, pos: number, length: number): [number, boolean] {
  if (pos >= length) {
    return [-1, false];
  }

  const ch = pattern.charCodeAt(pos);

  switch (ch) {
    case 92: // \
      if (pos + 1 >= length) {
        return [-1, false];
      }

      const esc = pattern.charAt(pos + 1);

      if (SINGLE_CHAR_ESCAPES.has(esc)) {
        return [pos + 2, true];
      }

      if (esc === "p" || esc === "P") {
        if (pos + 2 >= length || pattern.charCodeAt(pos + 2) !== 123) {
          return [-1, false];
        }

        const rBrace = pattern.indexOf("}", pos + 3);
        if (rBrace === -1) {
          return [-1, false];
        }

        if (!UNICODE_CATEGORIES.has(pattern.slice(pos + 3, rBrace))) {
          return [-1, false];
        }

        return [rBrace + 1, false];
      }

      return [-1, false];
    case 45: // -
    case 91: // [
    case 93: // ]
      // Unescaped '-', '[', and ']' are excluded from CCchar
      return [-1, false];
    default:
      return [pos + 1, true];
  }
}

function checkEscapeSequence(pattern: string, pos: number, length: number): number {
  if (pos >= length) {
    return -1;
  }

  const esc = pattern.charAt(pos);

  if (SINGLE_CHAR_ESCAPES.has(esc)) {
    return pos + 1;
  }

  if (esc === "p" || esc === "P") {
    pos += 1;

    // {
    if (pos >= length || pattern.charCodeAt(pos) !== 123) {
      return -1;
    }

    pos += 1;

    const rBrace = pattern.indexOf("}", pos);
    if (rBrace === -1) {
      return -1;
    }

    if (!UNICODE_CATEGORIES.has(pattern.slice(pos, rBrace))) {
      return -1;
    }

    return rBrace + 1;
  }

  return -1;
}

function checkRangeQuantifier(pattern: string, pos: number, length: number): number {
  let initialDigits = false;
  let commaFound = false;
  let byte: number;

  while (pos < length) {
    byte = pattern.charCodeAt(pos);

    switch (byte) {
      case 48: // 0
      case 49: // 1
      case 50: // 2
      case 51: // 3
      case 52: // 4
      case 53: // 5
      case 54: // 6
      case 55: // 7
      case 56: // 8
      case 57: // 9
        if (!commaFound) {
          initialDigits = true;
        }

        pos += 1;
        break;
      case 44: // ,
        if (commaFound || !initialDigits) {
          return -1;
        }

        commaFound = true;
        pos += 1;
        break;
      case 125: // }
        if (!initialDigits) {
          return -1;
        }
        return pos + 1;
      default:
        return -1;
    }
  }

  return -1;
}

/**
 * Map an I-Regexp pattern to ECMAScript pattern.
 */
export function mapIRegexp(
  pattern: string,
  options: { escapeAnchors?: boolean; wrap?: boolean } = {},
): string {
  const escapeAnchors = options.escapeAnchors ?? true;
  const containsAnchors = !escapeAnchors && (pattern.startsWith("^") || pattern.endsWith("$"));
  const wrap = (options.wrap ?? true) && !containsAnchors;

  const result: string[] = wrap ? ["^(?:"] : [];
  let escaped = false;
  let inCharClass = false;

  for (const ch of pattern) {
    if (escaped) {
      result.push(ch);
      escaped = false;
      continue;
    }

    switch (ch) {
      case ".":
        if (!inCharClass) {
          result.push("[^\\n\\r]");
        } else {
          result.push(ch);
        }
        break;
      case "\\":
        escaped = true;
        result.push(ch);
        break;
      case "[":
        inCharClass = true;
        result.push(ch);
        break;
      case "]":
        inCharClass = false;
        result.push(ch);
        break;
      case "^":
      case "$":
        if (escapeAnchors && !inCharClass) {
          result.push("\\");
        }
        result.push(ch);
        break;
      default:
        result.push(ch);
        break;
    }
  }

  if (wrap) {
    result.push(")$");
  }

  return result.join("");
}
