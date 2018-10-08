'use strict';

/**
 * A config for sorting
 */
export interface SortingConfig {
  /** a path to a directory containing files to sort imports in */
  directoryPath?: string;
  /** iterate recursively in the specified directory path */
  recursive?: boolean;
  /** sorts imported modules in the import statement itself. */
  sortModules?: boolean;
  /** an array of file paths  */
  files?: string[];
  /** when set, it doesn't apply changes */
  dryRun?: boolean;
}

export class DefaultSortingConfig implements SortingConfig {
  directoryPath = '.';
  recursive = true;
  sortModules = true;
  files = [];
}
