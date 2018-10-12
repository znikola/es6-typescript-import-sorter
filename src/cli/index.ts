'use strict';

import * as program from 'commander';

import { SortingConfig } from '../lib/config/lib-config.model';
import { LogUtils } from '../lib/utils/log-utils';

import { cliSort } from './cli';
import { CliConfigUtil } from './cli-config-util';

export function run(): void {
  program
    .version('1.0.0-alpha.4')
    .description('ES6 and TypeScript import sorter')
    .option('-c, --content <content>', 'inline imports to sort')
    .option('-p, --path <path>', 'specify a path with files to sort imports in')
    .option('-r, --recursive', 'sort recursively')
    .option('-m, --modules', 'sort modules')
    .option('-f, --files <files>', 'specify a comma-separated list of files to sort imports in ')
    .option('-d, --dry-run', 'when set, it does not save files')
    .parse(process.argv);

  const config: SortingConfig = new CliConfigUtil(
    program.content,
    program.path,
    program.recursive,
    program.modules,
    program.files,
    program.dryRun
  ).createConfig();

  LogUtils.info('=========*** Sorting imports... ***=========');
  cliSort(config);
}
