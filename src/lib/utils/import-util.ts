'use strict';

import { Type } from '../models/import';

import { validString } from './validation';

export const FOLDER_PATH = '../';
const PATH_SEPARATOR_REGEX = /\//g;

export class ImportUtils {
  static isLibrary(from: string): boolean {
    if (!validString(from)) {
      return false;
    }

    return ImportUtils.startsWithAT(from) || !ImportUtils.isRelativePath(from);
  }

  static normalizePath(from: string): string {
    if (!validString(from)) {
      return from;
    }

    if (ImportUtils.isFirstCharacter(from, '.') && from.charAt(1) === '/') {
      return from.slice(2);
    }
    return from;
  }

  static isBackwardsPath(from: string): boolean {
    if (!validString(from)) {
      return false;
    }

    return from.startsWith(FOLDER_PATH);
  }

  static isForwardPath(statement: string): boolean {
    if (!validString) {
      return false;
    }

    return !ImportUtils.isBackwardsPath(statement) && !ImportUtils.isCurrentPath(statement);
  }

  static isCurrentPath(from: string): boolean {
    if (!validString(from)) {
      return false;
    }

    return ImportUtils.determineForwardHierarchyLevel(from) === 0;
  }

  static determineForwardHierarchyLevel(statement: string): number {
    if (!validString(statement)) {
      return -1;
    }

    const match = statement.match(PATH_SEPARATOR_REGEX);
    if (match) {
      return match.length;
    }

    return 0;
  }

  static startsWithAT(from: string): boolean {
    if (!validString(from)) {
      return false;
    }

    return ImportUtils.isFirstCharacter(from, '@');
  }

  static determineType(_from: string): Type {
    let from = _from;
    if (ImportUtils.isLibrary(from)) {
      return Type.LIBRARY;
    }

    from = ImportUtils.normalizePath(from);

    if (ImportUtils.isCurrentPath(from)) {
      return Type.CURRENT;
    }
    if (ImportUtils.isForwardPath(from)) {
      return Type.FORWARD;
    }
    if (ImportUtils.isBackwardsPath(from)) {
      return Type.BACKWARDS;
    }

    // TODO: error handling
    throw new Error(`From not recognized: ${from}`);
  }

  static isRelativePath(from: string): boolean {
    if (!validString(from)) {
      return false;
    }

    return ImportUtils.isFirstCharacter(from, '.') || ImportUtils.isFirstCharacter(from, '/');
  }

  static isFirstCharacter(str: string, char: string): boolean {
    if (!validString(str) || !validString(char)) {
      return false;
    }

    return str.charAt(0) === char;
  }
}
