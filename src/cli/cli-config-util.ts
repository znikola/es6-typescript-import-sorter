'use strict';

import { SortingConfig } from '../lib/config/lib-config.model';

export class CliConfigUtil {
  constructor(
    private directoryPathOption: string,
    private recursiveOption: string,
    private modulesOption: string,
    private filesOption: string,
    private dryRunOption: string
  ) {}

  createConfig(): SortingConfig {
    const directoryPath = this.pathConfig(this.directoryPathOption);
    const recursive = this.recursiveConfig(this.recursiveOption);
    const sortModules = this.modulesConfig(this.modulesOption);
    const files = this.filesConfig(this.filesOption);
    const dryRun = this.dryRunConfig(this.dryRunOption);

    return {
      directoryPath,
      recursive,
      sortModules,
      files,
      dryRun
    };
  }

  private pathConfig(path: string): string {
    if (!path || path === '.') {
      return process.cwd();
    }
    return path;
  }

  private recursiveConfig(recursive: string): boolean {
    return this.toBoolean(recursive, true);
  }

  private modulesConfig(modules: string): boolean {
    return this.toBoolean(modules, true);
  }

  private filesConfig(files: string): string[] {
    if (files) {
      return this.list(files);
    }
    return [];
  }

  private dryRunConfig(dryRun: string): boolean {
    return this.toBoolean(dryRun, false);
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
