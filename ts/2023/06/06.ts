import { readFileSync } from 'fs';
import { join } from 'path';

function format(input: string): string[][] {
  const data = readFileSync(join(__dirname, input), 'utf-8')
    .trim()
    .split('\n')
    .map(
      (line) => line.split(/:\s+/)[1].split(/\s+/g)
    );
  return data;
}

function getWinners(time: number, dist: number) {
  let count = 0;
  for (let i = 1; i <= time; i += 1) {
    if ((time - i) * i > dist) {
      count += 1;
    }
  }
  return count;
}

function solution1(times: string[], dists: string[]) {
  return times.reduce((prev, curr, idx) => {
    const count = getWinners(parseInt(curr, 10), parseInt(dists[idx], 10));
    return prev * count;
  }, 1);
}

const [times, dists] = format('input.txt');

const time = parseInt(times.join(''), 10);
const dist = parseInt(dists.join(''), 10);

console.log(`Solution1: ${solution1(times, dists)}`);
console.log(`Solution2: ${getWinners(time, dist)}`);
