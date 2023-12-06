import { readFileSync } from 'fs';
import { join } from 'path';

function format(input: string): number[][] {
  const data = readFileSync(join(__dirname, input), 'utf-8')
    .trim()
    .split('\n')
    .map((line) =>
      line
        .split(/:\s+/)[1]
        .split(/\s+/g)
        .map((num) => parseInt(num, 10))
    );
  return data;
}

function solution1(times: number[], dist: number[]) {
  return times.reduce((prev, curr, idx) => {
    let count = 0;
    for (let i = 1; i <= curr; i += 1) {
      if ((curr - i) * i > dist[idx]) {
        count += 1;
      }
    }
    return prev * count;
  }, 1);
}

const [times, dist] = format('input.txt');

console.log(solution2(times, dist));
