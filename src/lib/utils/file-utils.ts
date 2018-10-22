import * as fs from 'fs';

import * as path from 'path';

const UTF_8 = 'utf8';
const TYPESCRIPT_EXTENSION = 'ts';
const JAVASCRIPT_EXTENSION = 'js';

export class FileUtils {
  static isDirectory(directoryPath: string): boolean {
    return fs.existsSync(directoryPath) && fs.lstatSync(directoryPath).isDirectory();
  }

  static isFile(filePath: string): boolean {
    return fs.existsSync(filePath) && fs.lstatSync(filePath).isFile();
  }

  static readFile(filePath: string): string {
    if (this.isFile(filePath)) {
      return fs.readFileSync(filePath, { encoding: UTF_8 });
    }

    // TODO: return empty string in this case?
    return '';
  }

  static readDirectory(directoryPath: string, recursive: boolean, filePaths?: string[]): string[] {
    filePaths = filePaths || [];
    const files = fs.readdirSync(directoryPath);
    for (const f of files) {
      const name = path.join(directoryPath, f);
      if (this.isDirectory(name) && recursive) {
        const subDirFiles = this.readDirectory(name, recursive);
        filePaths = [...filePaths, ...subDirFiles];
      } else if (this.isValidFile(name)) {
        filePaths = [...filePaths, name];
      }
    }
    return filePaths;
  }

  static saveFile(filePath: string, content: string): void {
    if (this.isFile(filePath)) {
      fs.writeFileSync(filePath, content, { encoding: UTF_8 });
    }
  }

  static isValidFile(filePath: string): boolean {
    const extension = filePath.split('.').pop();
    return extension === TYPESCRIPT_EXTENSION || extension === JAVASCRIPT_EXTENSION;
  }
}
