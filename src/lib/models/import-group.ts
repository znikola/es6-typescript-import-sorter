'use strict';

import { Import } from './import';
import { Position } from './position';

/**
 * An import group
 */
export interface ImportGroup {
  /** all the imports from the same group */
  imports: Import[];
  /** a position of a blank line */
  blankLinePostion: Position;
}
