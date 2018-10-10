'use strict';

import { doIt } from './lib/index';
import { SortingConfig } from './lib/config/lib-config.model';

export function sort(config: SortingConfig): void {
  doIt(config);
}
