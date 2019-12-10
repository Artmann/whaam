import '../array';

function greatestCommonDivisor(a: number, b: number): number {
  if (a === 0) {
    return b;
  }

  return greatestCommonDivisor(b % a, a);
}

function findGreatestCommonDivisor(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }

  return values.reduce((result, value) => {
    result = greatestCommonDivisor(result, value);

    return result;
  }, values[0])
}

/**
 * Returns the tab character and the tab size used in a text.
 */
export function getIndentation(text: string): { tabCharacter: string; tabSize: number } {
  const tabCharacter = text.includes('\t') ? '\t' : ' ';

  const lines = text.split(/\r\n|\r|\n/);

  const indentationLengths = lines
    .map(line => line.split('').takeWhile(char => char === tabCharacter).length);

  const tabSize = findGreatestCommonDivisor(indentationLengths);

  return {
    tabCharacter,
    tabSize
  };
}

