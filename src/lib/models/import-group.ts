'use strict';

import { Import } from './import';
import { Position } from './position';

export interface ImportGroup {
  imports: Import[];
  blankLinePostion: Position;
}
