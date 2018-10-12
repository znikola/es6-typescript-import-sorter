'use strict';

export const CONTENT_DEFAULT = '';
export const RECURSIVE_DEFAULT = true;
export const SORT_MODULES_DEFAULT = true;
export const DRY_RUN_DEFAULT = false;
export const DIRECTORY_PATH_DEFAULT = '.';
export const FILES_DEFAULT: string[] = [];

/**
 * The default sorting config
 */
export class DefaultSortingConfig implements SortingConfig {
  content = CONTENT_DEFAULT;
  directoryPath = DIRECTORY_PATH_DEFAULT;
  recursive = RECURSIVE_DEFAULT;
  sortModules = SORT_MODULES_DEFAULT;
  files = FILES_DEFAULT;
  dryRun = DRY_RUN_DEFAULT;
}

/**
 * A config for sorting
 */
export interface SortingConfig {
  /** a file's content */
  content: string;
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
