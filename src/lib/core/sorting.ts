'use strict';

import { SortingConfig } from '../config/lib-config.model';
import { Import, Type } from '../models/import';
import { ImportUtils, FOLDER_PATH } from '../utils/import-util';
import { validArray, validString } from '../utils/validation';

/** used for Array.sort */
const FIRST_AFTER_SECOND = 1;
/** used for Array.sort */
const FIRST_BEFORE_SECOND = -1;
/** used for Array.sort */
const FIRST_EQUALS_SECOND = 0;
/** this has the same value as FIRST_EQUALS_SECOND, but it brings more semantic when reading the algorithm */
const INVALID_OR_ERROR = 0;

const FOLDER_PATH_REGEX = new RegExp(FOLDER_PATH, 'g');

export function sort(imports: Import[], _config: SortingConfig): Import[] {
  if (!validArray(imports)) {
    return [];
  }

  let { backwardsImports, forwardImports, currentImports, libraries } = filterImports(imports);

  backwardsImports = backwardsImports.sort((i1, i2) => {
    const first = i1.from;
    const second = i2.from;
    return handleBackwardsPath(first, second);
  });

  forwardImports = forwardImports.sort((i1, i2) => {
    const first = i1.from;
    const second = i2.from;
    return handleForwardPath(first, second);
  });

  currentImports = currentImports.sort((i1, i2) => {
    const first = i1.from;
    const second = i2.from;
    return handleCurrentPath(first, second);
  });

  libraries = libraries.sort((i1, i2) => {
    const first = i1.from;
    const second = i2.from;

    return handleLibraries(first, second);
  });

  return [...libraries, ...backwardsImports, ...currentImports, ...forwardImports];
}

function filterImports(
  imports: Import[]
): { backwardsImports: Import[]; forwardImports: Import[]; currentImports: Import[]; libraries: Import[] } {
  let backwardsImports: Import[] = [];
  let forwardImports: Import[] = [];
  let currentImports: Import[] = [];
  let libraries: Import[] = [];

  imports.forEach((anImport: Import) => {
    const type = anImport.type;

    if (type === Type.LIBRARY) {
      libraries.push(anImport);
    } else {
      if (type === Type.CURRENT) {
        currentImports.push(anImport);
      } else if (type === Type.FORWARD) {
        forwardImports.push(anImport);
      } else if (type === Type.BACKWARDS) {
        backwardsImports.push(anImport);
      }
    }
  });

  return {
    backwardsImports,
    forwardImports,
    currentImports,
    libraries
  };
}

function handleLibraries(first: string, second: string): number {
  if (!validString(first) || !validString(second)) {
    return INVALID_OR_ERROR;
  }

  if (ImportUtils.isLibrary(first) && !ImportUtils.isLibrary(second)) {
    return FIRST_BEFORE_SECOND;
  }

  if (!ImportUtils.isLibrary(first) && ImportUtils.isLibrary(second)) {
    return FIRST_AFTER_SECOND;
  }

  // if 'first' and/or 'second' start with '@', sort them before the rest
  if (ImportUtils.startsWithAT(first) || ImportUtils.startsWithAT(second)) {
    if (ImportUtils.startsWithAT(first) && ImportUtils.startsWithAT(second)) {
      return sortAT(first, second);
    }

    if (ImportUtils.startsWithAT(first)) {
      return FIRST_BEFORE_SECOND;
    }

    if (ImportUtils.startsWithAT(second)) {
      return FIRST_AFTER_SECOND;
    }

    // fallback, we should never get here.
    return FIRST_EQUALS_SECOND;
  }

  // at this point we know that 'first' and 'second' are libraries that DON'T start with '@'
  return sortLibraries(first, second);
}

function sortAT(first: string, second: string): number {
  if (!validString(first) || !validString(second)) {
    return INVALID_OR_ERROR;
  }

  if (first.charAt(1) < second.charAt(1)) {
    return FIRST_BEFORE_SECOND;
  }

  if (first.charAt(1) > second.charAt(1)) {
    return FIRST_AFTER_SECOND;
  }

  return FIRST_EQUALS_SECOND;
}

function sortLibraries(first: string, second: string): number {
  if (!validString(first) || !validString(second)) {
    return INVALID_OR_ERROR;
  }

  if (first.length > second.length) {
    return FIRST_AFTER_SECOND;
  }

  if (second.length < first.length) {
    return FIRST_BEFORE_SECOND;
  }

  return FIRST_EQUALS_SECOND;
}

function handleBackwardsPath(first: string, second: string): number {
  if (!validString(first) || !validString(second)) {
    return INVALID_OR_ERROR;
  }

  first = ImportUtils.normalizePath(first);
  second = ImportUtils.normalizePath(second);

  if (ImportUtils.isForwardPath(second)) {
    return FIRST_BEFORE_SECOND;
  }
  if (ImportUtils.isCurrentPath(second)) {
    return FIRST_AFTER_SECOND;
  }
  if (ImportUtils.isBackwardsPath(second)) {
    return handleBothBackwardsPaths(first, second);
  }

  // TODO: error handling
  return INVALID_OR_ERROR;
}

function handleCurrentPath(first: string, second: string): number {
  if (!validString(first) || !validString(second)) {
    return INVALID_OR_ERROR;
  }

  first = ImportUtils.normalizePath(first);
  second = ImportUtils.normalizePath(second);

  if (ImportUtils.isBackwardsPath(second)) {
    return FIRST_AFTER_SECOND;
  }
  if (ImportUtils.isForwardPath(second)) {
    return FIRST_BEFORE_SECOND;
  }
  if (ImportUtils.isCurrentPath(second)) {
    return handleBothCurrentPaths(first, second);
  }

  // TODO: error handling
  return INVALID_OR_ERROR;
}

function handleForwardPath(first: string, second: string): number {
  if (!validString(first) || !validString(second)) {
    return INVALID_OR_ERROR;
  }

  first = ImportUtils.normalizePath(first);
  second = ImportUtils.normalizePath(second);

  if (ImportUtils.isBackwardsPath(second) || ImportUtils.isCurrentPath(second)) {
    return FIRST_AFTER_SECOND;
  }
  if (ImportUtils.isForwardPath(second)) {
    return handleBothForwardPaths(first, second);
  }

  // TODO: error handling
  return INVALID_OR_ERROR;
}

// TODO convert first to lowercase, so that we have a case-insensitive sorting?
function sortAlphabetically(first: string, second: string): number {
  if (!validString(first) || !validString(second)) {
    return INVALID_OR_ERROR;
  }

  if (first < second) {
    // ascending
    return FIRST_BEFORE_SECOND;
  }

  if (first > second) {
    // descending
    return FIRST_AFTER_SECOND;
  }

  return FIRST_EQUALS_SECOND;
}

function handleBothBackwardsPaths(first: string, second: string): number {
  if (!validString(first) || !validString(second)) {
    return INVALID_OR_ERROR;
  }

  const levelFirst = determineBackwardsHierarchyLevel(first);
  const levelSecond = determineBackwardsHierarchyLevel(second);

  if (levelFirst === levelSecond) {
    return sortAlphabetically(first, second);
  }

  if (levelFirst < levelSecond) {
    return FIRST_BEFORE_SECOND;
  }

  return FIRST_AFTER_SECOND;
}

function determineBackwardsHierarchyLevel(statement: string): number {
  if (!validString(statement)) {
    return INVALID_OR_ERROR;
  }

  const regexResult = statement.match(FOLDER_PATH_REGEX);
  if (regexResult) {
    return regexResult.length;
  }

  return 0;
}

function handleBothCurrentPaths(first: string, second: string): number {
  if (!validString(first) || !validString(second)) {
    return INVALID_OR_ERROR;
  }

  return sortAlphabetically(first, second);
}

function handleBothForwardPaths(first: string, second: string): number {
  if (!validString(first) || !validString(second)) {
    return INVALID_OR_ERROR;
  }

  const levelFirst = ImportUtils.determineForwardHierarchyLevel(first);
  const levelSecond = ImportUtils.determineForwardHierarchyLevel(second);

  if (levelFirst === levelSecond) {
    return sortAlphabetically(first, second);
  }

  if (levelFirst < levelSecond) {
    return FIRST_BEFORE_SECOND;
  }

  return FIRST_AFTER_SECOND;
}
