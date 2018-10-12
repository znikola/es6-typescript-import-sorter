'use strict';

import { Import, ImportGroup, Type } from '../models/import';
import { SortingConfig } from '../config/lib-config.model';

export function groupImports(imports: Import[], _config: SortingConfig): ImportGroup[] {
  const libraries = imports.filter((i: Import) => i.type === Type.LIBRARY);
  const backwards = imports.filter((i: Import) => i.type === Type.BACKWARDS);
  const current = imports.filter((i: Import) => i.type === Type.CURRENT);
  const forward = imports.filter((i: Import) => i.type === Type.FORWARD);

  const groups: ImportGroup[] = [
    { imports: [...libraries] },
    { imports: [...backwards] },
    { imports: [...current] },
    { imports: [...forward] }
  ];

  return groups.filter((group: ImportGroup) => group.imports && group.imports.length > 0);
}
