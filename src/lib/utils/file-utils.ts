import * as fs from 'fs';

const UTF_8 = 'utf8';

export class FileUtils {
  static isDirectory(path: string): boolean {
    return fs.existsSync(path) && fs.lstatSync(path).isDirectory();
  }

  static isFile(path: string): boolean {
    return fs.existsSync(path) && fs.lstatSync(path).isFile();
  }

  static readFile(path: string): string {
    if (this.isFile(path)) {
      return fs.readFileSync(path, { encoding: UTF_8 });
    }

    // TODO: return empty string in this case?
    return '';
  }

  static saveFile(path: string, content: string): void {
    if (this.isFile(path)) {
      fs.writeFileSync(path, content, { encoding: UTF_8 });
    }
  }
}
