const DELIMITER = "|";

export function makeCompositeKey(...parts: ReadonlyArray<string>): string {
  return parts.join(DELIMITER);
}

export function splitCompositeKey(key: string): Array<string> {
  return key.split(DELIMITER);
}
