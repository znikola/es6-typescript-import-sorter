'use strict';

import { SortingConfig } from '../config/lib-config.model';
import { Import, ImportGroup, Type } from '../models/import';

export function groupImports(imports: Import[], _config: SortingConfig): ImportGroup[] {
  const libraries = imports.filter((i: Import) => i.type === Type.LIBRARY);
  const libraryGroups = groupLibraries(libraries);

  const backwards = imports.filter((i: Import) => i.type === Type.BACKWARDS);
  const current = imports.filter((i: Import) => i.type === Type.CURRENT);
  const forward = imports.filter((i: Import) => i.type === Type.FORWARD);

  const groups: ImportGroup[] = [
    ...libraryGroups,
    { imports: [...backwards] },
    { imports: [...current] },
    { imports: [...forward] }
  ];

  return groups.filter((group: ImportGroup) => group.imports && group.imports.length > 0);
}

function groupLibraries(libraries: Import[]): ImportGroup[] {
  if (!libraries || libraries.length === 0) {
    return [];
  }
  let groups: ImportGroup[] = [{ imports: [] }];

  let previous: Import = <Import>{};
  for (const current of libraries) {
    if (Object.keys(previous).length > 0) {
      const previousRootFromChunk = getRootFrom(previous.from);
      const currentRootFromChunk = getRootFrom(current.from);

      if (previousRootFromChunk !== currentRootFromChunk) {
        groups = [
          ...groups,
          {
            imports: [current]
          }
        ];
      } else {
        groups = addToCurrent(groups, current);
      }
    } else {
      groups = addToCurrent(groups, current);
    }
    previous = current;
  }

  return groups;
}

function getRootFrom(from: string): string {
  return from.split('/')[0];
}

function addToCurrent(groups: ImportGroup[], toAdd: Import): ImportGroup[] {
  let lastGroup = groups[groups.length - 1];
  lastGroup = {
    ...lastGroup,
    imports: [...lastGroup.imports, toAdd]
  };
  const exceptLast = groups.slice(0, groups.length - 1);
  return [...exceptLast, lastGroup];
}
