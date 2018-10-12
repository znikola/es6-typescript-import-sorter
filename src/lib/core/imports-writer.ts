'use strict';

import { Import, ImportGroup } from '../models/import';
import { Range, NEW_LINE } from '../models/position';
import { validArray } from '../utils/validation';

export function prepareForWrite(importGroups: ImportGroup[], oldImports: Import[]): { range: Range; text: string } {
  if (!validArray(importGroups) || !validArray(oldImports)) {
    return { range: <Range>{}, text: '' };
  }

  const text = convertImportsToText(importGroups);

  const startPositionToReplace = oldImports[0].startPosition;
  const endPositionToReplace = oldImports[oldImports.length - 1].endPosition;

  return {
    range: new Range(startPositionToReplace, endPositionToReplace),
    text
  };
}

function convertImportsToText(importGroups: ImportGroup[]): string {
  let importText = '';
  for (let i = 0; i < importGroups.length; i++) {
    const group = importGroups[i];
    if (i !== 0) {
      importText += NEW_LINE;
    }

    for (let newImport of group.imports) {
      importText += newImport.statement;
      importText += NEW_LINE;
    }
  }

  return removeLastNewLine(importText);
}

function removeLastNewLine(importText: string): string {
  return importText.slice(0, -1);
}
