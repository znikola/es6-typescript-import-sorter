import * as program from 'commander';
import * as chalk from 'chalk';

import { doIt } from '../lib';
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
  doIt(config);

  console.log(chalk.default.blueBright('===========*** Saving files... ***==========='));
  if (!config.dryRun) {
    saveFiles([]);
  }
}

const NEW_LINE = '\n';

function saveFiles(_files: string[]): void {
  const path = 'path-to-file';
  const startPosition = 0;
  const endPosition = 18;

  let content = FileUtils.readFile(path);
  console.log(`${NEW_LINE}${NEW_LINE}${NEW_LINE}`);
  console.log(`content BEFORE ${NEW_LINE}`, content);

  const ar = content.split(NEW_LINE);
  console.log(`array elements:`);
  for (let i = 0; i < ar.length; i++) {
    console.log(`${i}: ${ar[i]}`);
  }

  let newImports = '';
  // for (let i = 0; i < 20; i++) {
  //   newImports += 'new import \n';
  // }

  for (let i = 0; i < 10; i++) {
    newImports += 'new import \n';
  }

  content = replaceImports(content, startPosition, endPosition, newImports);
  console.log(`${NEW_LINE}${NEW_LINE}${NEW_LINE}`);
  console.log(`content AFTER ${NEW_LINE}`, content);

  fs.writeFileSync(path, content);
}

function replaceImports(content: string, startPosition: number, endPosition: number, newImports: string): string {
  let splitted = content.split(NEW_LINE);
  splitted.splice(startPosition, endPosition, ...newImports.split(NEW_LINE));
  return splitted.join(NEW_LINE);
}
