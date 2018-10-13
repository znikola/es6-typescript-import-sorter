'use strict';

import { sortImports } from '../lib';
import { SortingConfig } from '../lib/config/lib-config.model';
import { ImportFile } from '../lib/models/import';
import { NEW_LINE, Position } from '../lib/models/position';
import { FileUtils } from '../lib/utils/file-utils';
import { LogUtils } from '../lib/utils/log-utils';

export function cliSort(config: SortingConfig) {
  let filePaths: string[] = [];
  if (config.files && config.files.length > 0) {
    // TODO: move to FileUtils
    for (const path of config.files) {
      if (FileUtils.isFile(path) && FileUtils.isValidFile(path)) {
        filePaths = [...filePaths, path];
      } else {
        LogUtils.warn(`Skipping, file doesn't exist: `, path);
      }
    }
  } else if (config.directoryPath) {
    // TODO: Boolean(config.recursive) is a temporary solution because TS reports a possibly `undefined` value
    const files = FileUtils.readDirectory(config.directoryPath, Boolean(config.recursive));
    filePaths = [...filePaths, ...files];
  }

  for (const path of filePaths) {
    const originalContent = FileUtils.readFile(path);
    config = {
      ...config,
      content: originalContent
    };

    const importFile: ImportFile = sortImports(config);
    const newContent = replaceImports(
      originalContent,
      importFile.range.start,
      importFile.range.end,
      importFile.sortedImports
    );

    if (!config.dryRun) {
      FileUtils.saveFile(path, newContent);
    }

    if (importsChanged(originalContent, newContent)) {
      printSorted(path, newContent, config.printOutput);
    }
  }
}

function importsChanged(originalContent: string, newContent: string): boolean {
  return originalContent !== newContent;
}

function printSorted(path: string, newContent: string, printOutput: boolean | undefined): void {
  if (printOutput) {
    LogUtils.info('Sorted: ', path);
    LogUtils.info(newContent);
  }
}

// TODO: move somewhere?
function replaceImports(content: string, startPosition: Position, endPosition: Position, newImports: string): string {
  const splitted = content.split(NEW_LINE);
  splitted.splice(startPosition.line, endPosition.line + 1, ...newImports.split(NEW_LINE));
  return splitted.join(NEW_LINE);
}
