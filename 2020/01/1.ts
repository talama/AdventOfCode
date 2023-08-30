import { readFileSync } from 'fs';
import { join } from 'path';

function format(input: string): Array<number> {
  const data = readFileSync(join(__dirname, input), 'utf-8');
  return data
    .trim()
    .split('\n')
    .map((str) => parseInt(str, 10));
}

function twoSum(list: number[], target: number): void {
  const len = list.length;
  const idx: number[] = [];
  const hash: { [index: number]: number } = {};
  for (let i = 0; i < len; i += 1) {
    const diff = target - list[i];
    if (diff in hash) {
      idx.push(hash[diff], i);
      break;
    }
    hash[list[i]] = i;
  }
  console.log(
    `Two sum: ${list[idx[0]]} * ${list[idx[1]]} = ${
      list[idx[0]] * list[idx[1]]
    }`
  );
}

function threeSum(list: number[], target: number): void {
  const len = list.length;
  const idx: number[] = [];
  const hash: { [index: number]: number } = {};
  for (let i = 0; i < len; i += 1) {
    const diff = target - list[i];
    for (let j = i + 1; j < len; j += 1) {
      if (diff - list[j] in hash) {
        idx.push(i, j, hash[diff - list[j]]);
        break;
      }
      hash[list[j]] = j;
    }
  }
  console.log(`Three sum: ${list[idx[0]]} * ${list[idx[1]]} * ${list[idx[2]]} = ${list[idx[0]] * list[idx[1]] * list[idx[2]]}`)
}

// const test = [1721, 979, 366, 299, 675, 1456];
const data = format('input.txt');
twoSum(data, 2020);
threeSum(data, 2020);
