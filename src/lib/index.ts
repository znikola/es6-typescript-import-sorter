'use strict';

import '../polyfills';

import { SortingConfig } from './config/lib-config.model';
import { groupImports } from './core/group-imports';
import { write } from './core/imports-writer';
import { parse } from './core/regex';
import { sort } from './core/sorting';
import { Import } from './models/import';
import { ImportGroup } from './models/import-group';
import { Range } from './models/position';
import { FileUtils } from './utils/file-utils';

// TODO: there's a duplicate index.ts in the /src folder. Get rid of one
// TODO: change the return type to be a list of files

export function sortImports(config: SortingConfig): { range: Range; text: string } {
  const path = config.files ? config.files[0] : '';
  const fileContent = FileUtils.readFile(path);

  const imports: Import[] = parse(fileContent);
  const sorted: Import[] = sort(imports);
  const grouped: ImportGroup[] = groupImports(sorted);
  return write(grouped, imports);
}
