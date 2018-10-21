'use strict';

import * as program from 'commander';

import { SortingConfig } from '../lib/config/lib-config.model';
import { SortError } from '../lib/models/errors';
import { LogUtils } from '../lib/utils/log-utils';

import { cliSort } from './cli';
import { CliConfigUtil } from './cli-config-binder';

export function run(): void {
  program
    .version('1.0.0-alpha.4')
    .description('An opinionated ES6 and TypeScript import sorter')
    .option('-c, --content <content>', 'specfiy imports inline')
    .option('-d, --directory <path>', 'specify a path to directory')
    .option('-r, --recursive', 'walk recursively in the specified directory')
    .option('-m, --modules', 'sort modules')
    .option('-f, --files <files>', 'specify a comma-separated list of files to sort imports in ')
    .option('-D, --dry-run', 'a flag to not apply any changes')
    .option('-o, --print-sorted-content', 'prints sorted files to the console')
    .option('-v, --verbose', 'prints more details and detailed error messages')
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
    LogUtils.error('An error occured, use --verbose for more informations');
  }
  // Exit with failure
  process.exit(1);
}
