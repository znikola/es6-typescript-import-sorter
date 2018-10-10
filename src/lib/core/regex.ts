'use strict';

import { Import } from '../models/import';
import { Position, NEW_LINE } from '../models/position';
import { determineType } from '../utils/import-util';
import { validString } from '../utils/validation';

const ES6_IMPORTS_REGEX = /^import(?:["'\s]*(?:[\w*{}\n\r\t, ]+)from\s*)?(["'\s].*(?:[@\w\/\_\-.]+)["'\s]).*;\ */gm;
// extracted from ES6_IMPORTS_REGEX. Because of how JavaScript's regex engine is implemented (https://stackoverflow.com/a/27131524/5252849), we have to extract it separatley.
const ES6_FROM_REGEX = /([@\w\/\_\-.]+)/gm;

export function parse(content: string): Import[] {
  if (!content) {
    return [];
  }

  ES6_IMPORTS_REGEX.lastIndex = 0;
  let imports: Import[] = [];

  let match: RegExpExecArray | null;
  while ((match = ES6_IMPORTS_REGEX.exec(content))) {
    const startPosition = getPosition(content, match.index);
    const endPosition = getPosition(content, ES6_IMPORTS_REGEX.lastIndex);

    const from = parseFrom(match[1]);
    const newImport: Import = {
      statement: match[0],
      from,
      type: determineType(from),
      startPosition,
      endPosition
    };
    imports = [...imports, newImport];
  }

  return imports;
}

function parseFrom(raw: string): string {
  if (!validString(raw)) {
    return raw;
  }

  const result = raw.match(ES6_FROM_REGEX);
  if (!result) {
    return raw;
  }

  return result[0];
}

function getPosition(content: string, index: number): Position {
  let line = 0;
  let lineCharacter = 0;
  for (let i = 0; i < content.length; i++) {
    if (i === index) {
      break;
    }

    const currentChar = content.charAt(i);
    lineCharacter++;

    if (currentChar === NEW_LINE) {
      line++;
      lineCharacter = 0;
    }
  }

  return new Position(line, lineCharacter);
}
