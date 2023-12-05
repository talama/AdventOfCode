import { readFileSync } from 'fs';
import { join } from 'path';

function format(input: string) {
  return readFileSync(join(__dirname, input), 'utf-8').trim().split('\n');
}

function parseLine(line: string) {
  const [, lineNumbers] = line.split(/:\s+/);
  const [winStr, numStr] = lineNumbers.split(' | ');
  const [winners, numbers] = [winStr.split(/[ ]+/), numStr.split(/[ ]+/)];
  return [winners, numbers];
}

function solution1(input: string[]) {
  const score: number[] = [];
  input.forEach((line) => {
    const [winners, numbers] = parseLine(line);
    const points = numbers.filter((num) => winners.includes(num));
    if (points.length > 0) {
      score.push(2 ** (points.length - 1));
    }
  });
  return score.reduce((acc, curr) => acc + curr, 0);
}

const data = format('input.txt');
console.log(`Solution1: ${solution1(data)}`);
