export class SortError extends Error {
  error: Error;
  errorMessage: string | undefined;
  path: string | undefined;

  constructor(error: Error, message?: string, path?: string) {
    super();
    this.error = error;
    this.errorMessage = message;
    this.path = path;

    // This is because of https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
    Object.setPrototypeOf(this, SortError.prototype);
  }
}
