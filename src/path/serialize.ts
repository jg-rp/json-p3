/**
 * An identifier that is allowed in both JS and JSONPath.
 * JSONPath identifiers are generally much more permissive than JS ones, but
 * they don't allow the character "$", so we take the intersection of the two
 * when deciding whether to use dot shorthand for canonical serialization of
 * simple names.
 */
const SHORTHAND_COMPATIBLE_IDENTIFIER = /^[\p{ID_Start}_]\p{ID_Continue}*$/u;

/** Usable in a quoted path. */
export function toQuoted(name: string): string {
  return name.includes("'") && !name.includes('"')
    ? JSON.stringify(name)
    : toCanonical(name);
}

/** Usable in a normalized path. */
export function toCanonical(name: string): string {
  return `'${JSON.stringify(name).slice(1, -1).replaceAll('\\"', '"').replaceAll("'", "\\'")}'`;
}

/** Usable in a shorthand path. */
export function toShorthand(name: string): string | null {
  return SHORTHAND_COMPATIBLE_IDENTIFIER.test(name) ? name : null;
}
