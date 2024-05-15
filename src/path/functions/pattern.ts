// See https://datatracker.ietf.org/doc/html/rfc9485#name-ecmascript-regexps
export function mapRegexp(pattern: string): string {
  let escaped = false;
  let charClass = false;
  const parts: string[] = [];
  for (const ch of pattern) {
    if (escaped) {
      parts.push(ch);
      escaped = false;
      continue;
    }

    switch (ch) {
      case ".":
        if (!charClass) {
          parts.push("(?:(?![\r\n])\\P{Cs}|\\p{Cs}\\p{Cs})");
        } else {
          parts.push(ch);
        }
        break;
      case "\\":
        escaped = true;
        parts.push(ch);
        break;
      case "[":
        charClass = true;
        parts.push(ch);
        break;
      case "]":
        charClass = false;
        parts.push(ch);
        break;
      default:
        parts.push(ch);
        break;
    }
  }
  return parts.join("");
}
