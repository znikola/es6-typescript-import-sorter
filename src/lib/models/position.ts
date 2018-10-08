'use strict';

export const NEW_LINE = '\n';

/**
 * Models a range starting from a position and ending with a position
 */
export class Range {
  /**
   * Initialize a new `Range` with the given params.
   *
   * @param start a starting `Position`
   * @param end an ending `Position`
   */
  constructor(readonly start: Position, readonly end: Position) {}
}

/**
 * Models a position of an import in a file.
 */
export class Position {
  /**
   * Initialize a new `Position` with the given params.
   *
   * @param line a zero-based line in a file
   * @param character a zero-based character position in a line
   */
  constructor(readonly line: number, readonly character: number) {}
}
