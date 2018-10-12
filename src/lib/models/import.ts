'use strict';

import { Position, Range } from './position';

/**
 * An import type.
 * Can be a library or an import pointing to backward, current or forward directory
 */
export enum Type {
  /**
   * @example
   * import { Component, OnDestroy, OnInit } from '@angular/core';
   */
  LIBRARY = 1,
  /**
   * @example
   * import {a} from '../../b'
   */
  BACKWARDS,
  /**
   * @example
   * import {a} from './b'
   */
  CURRENT,
  /**
   * @example
   * import {a} from './b/c/d'
   */
  FORWARD
}

/**
 * An import
 */
export interface Import {
  /**
   * The whole import statement.
   *
   * @example
   * import { Component, OnDestroy, OnInit } from '@angular/core';
   */
  statement: string;
  /**
   * Only the 'from' part of an import statement.
   *
   * @example
   * @angular/core
   */
  from: string;
  /** A type */
  type: Type | null;
  /** Starting position */
  startPosition: Position;
  /** Ending position */
  endPosition: Position;
}

/**
 * An import group
 */
export interface ImportGroup {
  /** all the imports from the same group */
  imports: Import[];
}

/**
 * Models a JS/TS file
 */
export interface ImportFile {
  /** sorted imports */
  sortedImports: string;
  /** a range of import positions; used when replacing original imports with the sorted ones. */
  range: Range;
}
