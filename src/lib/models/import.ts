'use strict';

import { Position } from './position';

export enum Type {
  LIBRARY = 1,
  BACKWARDS,
  CURRENT,
  FORWARD
}

export interface Import {
  statement: string;
  from: string;
  type: Type | null;
  startPosition: Position;
  endPosition: Position;
}
