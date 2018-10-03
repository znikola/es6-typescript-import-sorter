import * as program from 'commander';
import * as chalk from 'chalk';

import { doIt } from '../lib';
import { SortingConfig } from '../lib/config/lib-config.model';
import { CliConfigUtil } from './cli-config-util';
import { FileUtils } from '../lib/file-utils/file-utils';
import * as fs from 'fs';

export function run(): void {
  program
    .version('1.0.0')
    .description('ES6 and TypeScript import sorter')
    .option('-p, --path <path>', 'specify a path with files to sort imports in')
    .option('-r, --recursive', 'sort recursively')
    .option('-m, --modules', 'sort modules')
    .option('-f, --files <files>', 'specify a comma-separated list of files to sort imports in ')
    .option('-d, --dry-run', 'when set, it does not save files')
    .parse(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp((help: string) => chalk.default.yellow(help));
    process.exit();
  }

  const config = new CliConfigUtil(
    program.path,
    program.recursive,
    program.modules,
    program.files,
    program.dryRun
  ).createConfig();

  console.log(chalk.default.blueBright('=========*** Sorting imports... ***========='));
  const files = doIt(config);

  if (!config.dryRun) {
    saveFiles([]);
  }
}

function saveFiles(files: string[]): void {}
