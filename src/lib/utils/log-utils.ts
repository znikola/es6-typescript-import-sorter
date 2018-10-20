'use strict';

import * as chalk from 'chalk';

export class LogUtils {
  static debug(s: string, ...args: any[]): void {
    console.log(chalk.default.green(s, ...args));
  }

  static info(s: string, ...args: any[]): void {
    console.log(chalk.default.blueBright(s, ...args));
  }

  static warn(s: string, ...args: any[]): void {
    console.log(chalk.default.yellow(s, ...args));
  }

  static error(s: string, ...args: any[]): void {
    console.log(chalk.default.red(s, ...args));
  }
}
