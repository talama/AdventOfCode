import { readFileSync } from 'fs';
import { join } from 'path';

function format(input: string) {
  return readFileSync(join(__dirname, input), 'utf-8').trim().split('\n');
}

function isPart(
  schematic: string[],
  row: number,
  col: number,
  part: string
): boolean {
  const [rowStart, rowEnd] = [
    Math.max(row - 1, 0),
    Math.min(row + 1, schematic.length - 1),
  ];
  const [colStart, colEnd] = [
    Math.max(col - 1, 0),
    Math.min(col + part.length, schematic[row].length - 1),
  ];
  for (let i = rowStart; i <= rowEnd; i += 1) {
    for (let j = colStart; j <= colEnd; j += 1) {
      const char = schematic[i][j];
      if (char !== '.' && /[^0-9]/.test(char)) {
        return true;
      }
    }
  }
  return false;
}

function solution1(schematic: string[]): number {
  const parts = schematic.flatMap((row, rowIdx) => {
    const rowNumbers = Array.from(row.matchAll(/\d+/g));
    return rowNumbers.flatMap((match) => {
      const num = match[0];
      const col = match.index!;
      if (isPart(schematic, rowIdx, col, num)) {
        return parseInt(num, 10);
      }
      return [];
    });
  });
  return parts.reduce((acc, curr) => acc + curr, 0);
}

function findAdjecent(schematic: string[], starRow: number, starCol: number) : number[] {
  const adjNumbers: number[] = [];
  const [rowStart, rowEnd] = [
    Math.max(starRow - 1, 0),
    Math.min(starRow + 1, schematic[starRow].length - 1),
  ];
  for (let i = rowStart; i <= rowEnd; i += 1) {
    const rowNumbers = Array.from(schematic[i].matchAll(/\d+/g));
    const adjRow = rowNumbers.flatMap((match) => {
      const num = match[0];
      const numStart = match.index!;
      const numEnd = numStart + num.length - 1;
      if (numEnd >= starCol - 1 && numStart <= starCol + 1) {
        return parseInt(num, 10);
      }
      return [];
    });
    adjNumbers.push(...adjRow);
  }
  return adjNumbers;
}

function solution2(schematic: string[]) {
  const gears = schematic.flatMap((row, rowIdx) =>
    row
      .split('')
      .flatMap((col, colIdx) => {
        if (col === '*') return colIdx;
        return [];
      })
      .map((col) => findAdjecent(schematic, rowIdx, col))
  );
  return gears
    .filter((gear) => gear.length === 2)
    .map((gearRatio) => gearRatio.reduce((acc, curr) => acc * curr, 1))
    .reduce((acc, curr) => acc + curr, 0);
}

const schematic = format('input.txt');
console.log(`Solution1: ${solution1(schematic)}`);
console.log(`Solution2: ${solution2(schematic)}`);
