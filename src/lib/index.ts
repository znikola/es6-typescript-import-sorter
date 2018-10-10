'use strict';

import '../polyfills';

import { SortingConfig } from './config/lib-config.model';

export function doIt(config: SortingConfig): void {
  console.log(`config`, config);
}
