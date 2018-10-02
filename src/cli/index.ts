import * as commander from 'commander';
import chalk from 'chalk';

import { doIt } from '../lib';

export function run(): void {
  commander.parse(process.argv);
}

commander.version('1.0.0').description('ES6 and TypeScript import sorter');

commander
  .command('sort-imports')
  .alias('S')
  .description('Sorts all imports')
  .action(() => {
    console.log(chalk.blueBright('=========*** Sorting imports... ***========='));
    doIt();
  });

if (!process.argv.slice(2).length) {
  commander.outputHelp();
  process.exit();
}
