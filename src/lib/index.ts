'use strict';

import { SortingConfig } from './config';
import { groupImports } from './core/group-imports';
import { write } from './core/imports-writer';
import { parse } from './core/regex';
import { sort } from './core/sorting';
import { Import } from './models/import';
import { ImportGroup } from './models/import-group';
import { Range } from './models/position';

// TODO: change the return type to be a list of files
// TODO: define another name when importing, instead of 'import-sorter'
// TODO: it seems that types/index.d.ts is going to be deleted. move comments to the corresponding files

/**
 * Sorts and groups imports based on the provided configuration.
 *
 * If the configuration is not provided, the default one is used.
 *
 * @param content a content
 * @param config a `SortingConfig` instance
 */
export function sortImports(content: string, _config?: SortingConfig): { range: Range; text: string } {
  const imports: Import[] = parse(content);
  const sorted: Import[] = sort(imports);
  const grouped: ImportGroup[] = groupImports(sorted);
  const result = write(grouped, imports);
  return result;
}
