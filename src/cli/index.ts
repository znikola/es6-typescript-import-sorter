'use strict';

import * as program from 'commander';

import {
  SortingConfig,
  CONTENT_FLAG,
  RECURSIVE_FLAG,
  SORT_MODULES_FLAG,
  DRY_RUN_FLAG,
  DIRECTORY_PATH_FLAG,
  FILES_FLAG,
  PRINT_OUTPUT_FLAG,
  VERBOSE_FLAG
} from '../lib/config/lib-config.model';
import { SortError } from '../lib/models/errors';
import { LogUtils } from '../lib/utils/log-utils';

import { cliSort } from './cli';
import { CliConfigUtil } from './cli-config-binder';

export function run(): void {
  program
    .version('1.0.0-alpha.4')
    .description('An opinionated ES6 and TypeScript import sorter')
    .option(`${CONTENT_FLAG.short}, ${CONTENT_FLAG.long} <content>`, 'specfiy imports inline')
    .option(`${DIRECTORY_PATH_FLAG.short}, ${DIRECTORY_PATH_FLAG.long} <path>`, 'specify a path to directory')
    .option(`${RECURSIVE_FLAG.short}, ${RECURSIVE_FLAG.long}`, 'walk recursively in the specified directory')
    .option(`${SORT_MODULES_FLAG.short}, ${SORT_MODULES_FLAG.long}`, 'sort modules')
    .option(`${FILES_FLAG.short}, ${FILES_FLAG.long} <files>`, 'specify a comma-separated list of files to sort imports in ')
    .option(`${DRY_RUN_FLAG.short}, ${DRY_RUN_FLAG.long}`, 'a flag to not apply any changes')
    .option(`${PRINT_OUTPUT_FLAG.short}, ${PRINT_OUTPUT_FLAG.long}`, 'prints sorted files to the console')
    .option(`${VERBOSE_FLAG.short}, ${VERBOSE_FLAG.long}`, 'prints more details and detailed error messages')
    .parse(process.argv);

  const config: SortingConfig = new CliConfigUtil(
    program.content,
    program.path,
    program.recursive,
    program.modules,
    program.files,
    program.dryRun,
    program.printOutput,
    program.verbose,
  ).createConfig();

  LogUtils.info('=========*** Sorting imports... ***=========');
  try {
  cliSort(config);
  } catch (error) {
    handleErrors(error, config);
  }

  LogUtils.info('================*** Done ***================');
}

function handleErrors(error: Error | SortError, config: SortingConfig) {
  if (config.verbose) {
    if (error instanceof SortError) {
      // Log error
      LogUtils.error(error.errorMessage);
    } else {
      LogUtils.error(error.message);
    }
  } else {
    LogUtils.error(`An error occured, use ${VERBOSE_FLAG.long} for more informations`);
  }
  // Exit with failure
  process.exit(1);
}
