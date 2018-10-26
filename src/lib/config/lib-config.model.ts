'use strict';

// Defaults
export const CONTENT_DEFAULT = '';
export const RECURSIVE_DEFAULT = true;
export const SORT_MODULES_DEFAULT = true;
export const DRY_RUN_DEFAULT = false;
export const DIRECTORY_PATH_DEFAULT = '.';
export const FILES_DEFAULT: string[] = [];
export const PRINT_OUTPUT_DEFAULT = false;
export const VERBOSE_DEFAULT = false;

// Flags
export const CONTENT_FLAG = { short: '-c', long: '--content' };
export const RECURSIVE_FLAG = { short: '-r', long: '--recursive' };
export const SORT_MODULES_FLAG = { short: '-m', long: '--modules' };
export const DRY_RUN_FLAG = { short: '-D', long: '--dry-run' };
export const DIRECTORY_PATH_FLAG = { short: '-d', long: '--directory' };
export const FILES_FLAG = { short: '-f', long: '--files' };
export const PRINT_OUTPUT_FLAG = { short: '-o', long: '--print-sorted-content' };
export const VERBOSE_FLAG = { short: '-v', long: '--verbose' };

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
  printOutput = PRINT_OUTPUT_DEFAULT;
  verbose = VERBOSE_DEFAULT;
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
  /** if set to true, the content of the sorted files imports is going to be printed in the console */
  printOutput?: boolean;
  /** prints more details and detailed error messages */
  verbose?: boolean;
}
