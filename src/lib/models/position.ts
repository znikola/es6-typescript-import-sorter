'use strict';

export const NEW_LINE = '\n';

export class Range {
  constructor(readonly start: Position, readonly end: Position) {}
}

export class Position {
  constructor(readonly character: number, readonly line: number) {}
}
