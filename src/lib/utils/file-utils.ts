import * as fs from 'fs';
import * as path from 'path';

const UTF_8 = 'utf8';

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
    for (const f in files) {
      const name = directoryPath + path.sep + files[f];
      if (this.isDirectory(name) && recursive) {
        this.readDirectory(name, recursive, filePaths);
      } else {
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
}
