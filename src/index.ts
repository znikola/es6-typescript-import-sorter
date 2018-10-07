'use strict';

import { sortImports } from './lib/index';
import { SortingConfig } from './lib/config/lib-config.model';
import { Range } from './lib/models/position';

export function sort(config: SortingConfig): { range: Range; text: string } {
  return sortImports(config);
}
