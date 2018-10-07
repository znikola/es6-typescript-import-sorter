declare module '@imports/sort' {
  // TODO: write some examples here
  /**
   * A config for sorting
   */
  interface SortingConfig {
    /** a path to a directory containing files to sort imports in */
    directoryPath?: string;
    /** iterate recursively in the specified directory path */
    recursive?: boolean;
    /** sorts imported modules in the import statement itself. */
    sortModules?: boolean;
    /** an array of file paths  */
    files?: string[];
    /** when set, it doesn't apply changes */
    dryRun?: boolean;
  }

  // TODO: declare and export a default configuration?
  // In that way users can just modify parts that they want, without the need to create the whole configuration object

  /**
   * Sorts and groups imports based on the provided configuration.
   *
   * If the configuration is not provided, the default one is used.
   *
   * @param config a `SortingConfig` instance
   */
  export function sort(config: SortingConfig): { range: Range; text: string };

  /**
   * An import type.
   * Can be a library or an import pointing to backward, current or forward directory
   */
  enum Type {
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
  interface Import {
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
  interface ImportGroup {
    /** all the imports from the same group */
    imports: Import[];
    /** a position of a blank line */
    blankLinePostion: Position;
  }

  /**
   * Models a range starting from a position and ending with a position
   */
  class Range {
    /**
     * Initialize a new `Range` with the given params.
     *
     * @param start a starting `Position`
     * @param end an ending `Position`
     */
    constructor(start: Position, end: Position);
  }

  /**
   * Models a position of an import in a file.
   */
  class Position {
    /**
     * Initialize a new `Position` with the given params.
     *
     * @param character a zero-based character position in a line
     * @param line a zero-based line in a file
     */
    constructor(character: number, line: number);
  }
}
