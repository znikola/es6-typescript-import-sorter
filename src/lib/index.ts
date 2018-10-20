'use strict';

import { Util } from '../lib/utils/util';

import { SortingConfig } from './config';

import { groupImports } from './core/group-imports';
import { prepareForWrite } from './core/imports-writer';
import { parse } from './core/regex';
import { sort } from './core/sorting';
import { Import, ImportGroup, ImportFile } from './models/import';

/**
 * Sorts and groups imports based on the provided configuration.
 *
 * If the configuration is not provided, the default one is used.
 *
 * @param config a `SortingConfig` instance.
 */
export function sortImports(config: SortingConfig): ImportFile {
  const imports: Import[] = parse(config);
  const sorted: Import[] = sort(imports, config);
  const grouped: ImportGroup[] = groupImports(sorted, config);
  const { range, text } = prepareForWrite(grouped, imports);

  if (Util.isFalsyObject(range)) {
    return <ImportFile>{};
  }

  return {
    sortedImports: text,
    range
  };
}
