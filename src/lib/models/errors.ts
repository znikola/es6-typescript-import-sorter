'use strict';

export class SortError extends Error {
  errorMessage: string;
  error: Error | undefined;
  path: string | undefined;

  constructor(message: string, error?: Error, path?: string) {
    super();
    this.error = error;
    this.errorMessage = message;
    this.path = path;

    // This is because of https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
    Object.setPrototypeOf(this, SortError.prototype);
  }
}
