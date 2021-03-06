'use strict';

import { sortImports } from '../lib';
import { SortingConfig } from '../lib/config/lib-config.model';
import { SortError } from '../lib/models/errors';
import { ImportFile } from '../lib/models/import';
import { NEW_LINE, Position } from '../lib/models/position';
import { FileUtils } from '../lib/utils/file-utils';
import { LogUtils } from '../lib/utils/log-utils';
import { Util } from '../lib/utils/util';

export function cliSort(config: SortingConfig) {
  if (config.verbose) {
    LogUtils.debug('Using the following configuration: ', JSON.stringify(config));
  }

  let filePaths: string[] = [];
  if (config.files && config.files.length > 0) {
    // TODO: move to FileUtils
    for (const path of config.files) {
      try {
        if (FileUtils.isFile(path) && FileUtils.isValidFile(path)) {
          filePaths = [...filePaths, path];
        } else {
          LogUtils.warn(`Skipping, file doesn't exist: `, path);
        }
      } catch (error) {
        throw(new SortError(`${error} 🛑 While reading file : ${path}`, error, path ));
      }
    }
  } else if (config.directoryPath) {
    // TODO: Boolean(config.recursive) is a temporary solution because TS reports a possibly `undefined` value
    const files = FileUtils.readDirectory(config.directoryPath, Boolean(config.recursive));
    filePaths = [...filePaths, ...files];
  }

  for (const path of filePaths) {
    try {
      const originalContent = FileUtils.readFile(path);
      config = {
        ...config,
        content: originalContent
      };
  
      const importFile: ImportFile = sortImports(config);
      if (Util.isFalsyObject(importFile)) {
        if (config.verbose) {
          LogUtils.debug('Imports not found in file: ', path);
        }
        continue;
      }
  
      const newContent = replaceImports(
        originalContent,
        importFile.range.start,
        importFile.range.end,
        importFile.sortedImports
      );
  
      if (importsChanged(originalContent, newContent)) {
        if (!config.dryRun) {
          FileUtils.saveFile(path, newContent);
        }
        printSorted(path, newContent, config.printOutput);
      }
    } catch (error) {
      throw(new SortError(`${error} 🛑 On file : ${path}`, error, path ));
    }
  }
}

function importsChanged(originalContent: string, newContent: string): boolean {
  return originalContent !== newContent;
}

function printSorted(path: string, newContent: string, printOutput: boolean | undefined): void {
  LogUtils.info('Sorted: ', path);
  if (printOutput) {
    LogUtils.info(newContent);
  }
}

// TODO: move to some other file?
function replaceImports(content: string, startPosition: Position, endPosition: Position, newImports: string): string {
  const splitted = content.split(NEW_LINE);
  const deleteCount = endPosition.line - startPosition.line + 1;
  splitted.splice(startPosition.line, deleteCount, ...newImports.split(NEW_LINE));
  return splitted.join(NEW_LINE);
}
