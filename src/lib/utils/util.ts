'use strict';

export class Util {
  static isLastIteration<T>(i: number, anArray: Array<T>): boolean {
    return i === anArray.length - 1;
  }

  static isFalsyObject(o: any): boolean {
    return Boolean(o) ? Object.keys(o).length === 0 : true;
  }

  static isNotFalsyObject(o: any): boolean {
    return Boolean(o) ? Object.keys(o).length > 0 : false;
  }
}
