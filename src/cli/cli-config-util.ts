'use strict';

import {
  SortingConfig,
  DIRECTORY_PATH_DEFAULT,
  RECURSIVE_DEFAULT,
  DRY_RUN_DEFAULT,
  FILES_DEFAULT,
  SORT_MODULES_DEFAULT,
  CONTENT_DEFAULT,
  PRINT_OUTPUT_DEFAULT
} from '../lib/config/lib-config.model';

export class CliConfigUtil {
  constructor(
    private contentOption: string,
    private directoryPathOption: string,
    private recursiveOption: string,
    private modulesOption: string,
    private filesOption: string,
    private dryRunOption: string,
    private printOutputOption: string
  ) {}

  createConfig(): SortingConfig {
    const content = this.contentConfig(this.contentOption);
    const directoryPath = this.pathConfig(this.directoryPathOption);
    const recursive = this.recursiveConfig(this.recursiveOption);
    const sortModules = this.modulesConfig(this.modulesOption);
    const files = this.filesConfig(this.filesOption);
    const dryRun = this.dryRunConfig(this.dryRunOption);
    const printOutput = this.printOutputConfig(this.printOutputOption);

    return {
      content,
      directoryPath,
      recursive,
      sortModules,
      files,
      dryRun,
      printOutput
    };
  }

  private contentConfig(content: string): string {
    return content ? content : CONTENT_DEFAULT;
  }

  private pathConfig(path: string): string {
    if (!path || path === DIRECTORY_PATH_DEFAULT) {
      return process.cwd();
    }
    return path;
  }

  private recursiveConfig(recursive: string): boolean {
    return this.toBoolean(recursive, RECURSIVE_DEFAULT);
  }

  private modulesConfig(modules: string): boolean {
    return this.toBoolean(modules, SORT_MODULES_DEFAULT);
  }

  private filesConfig(files: string): string[] {
    return files ? this.list(files) : FILES_DEFAULT;
  }

  private dryRunConfig(dryRun: string): boolean {
    return this.toBoolean(dryRun, DRY_RUN_DEFAULT);
  }

  private printOutputConfig(printOutput: string): boolean {
    return this.toBoolean(printOutput, PRINT_OUTPUT_DEFAULT);
  }

  // TODO: 'x.ts, x2.ts' doesn't work because of space after the comma
  private list(csl: string): string[] {
    return csl.split(',');
  }

  private toBoolean(value: any, defaultValue: boolean): boolean {
    if (value === undefined || value === null || value === '') {
      return defaultValue;
    }

    return Boolean(value);
  }
}
