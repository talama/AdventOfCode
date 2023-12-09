import { readFileSync } from 'fs';
import { join } from 'path';

function format(input: string) {
  const data = readFileSync(join(__dirname, input), 'utf-8').trim().split('\n');
  return data.map((line) => line.split(' ').map((num) => parseInt(num, 10)));
}

function getNextSequence(sequence: number[]) {
  const newSeq: number[] = [];
  for (let i = 1; i < sequence.length; i += 1) {
    newSeq.push(sequence[i] - sequence[i - 1]);
  }
  return newSeq;
}

function getSequences(history: number[]) {
  let [first, last] = [history[0], history[history.length - 1]];
  const sequences: number[][] = [[first, last]];
  let next = getNextSequence(history);
  while (next.some((val) => val !== 0)) {
    [first, last] = [next[0], next[next.length - 1]];
    sequences.push([first, last]);
    next = getNextSequence(next);
  }
  return sequences;
}

function solution1(sequences: number[][][]) {
  const predictions = sequences.map((line) =>
    line.reduce((acc, curr) => acc + curr[1], 0)
  );
  return predictions.reduce((acc, curr) => acc + curr);
}

function solution2(sequences: number[][][]) {
  const predictions = sequences.map((line) =>
    line.toReversed().reduce((acc, curr) => curr[0] - acc, 0)
  );
  return predictions.reduce((acc, curr) => acc + curr);
}

const report = format('input.txt');
const sequences = report.map((line) => getSequences(line));
console.log(`Solution1: ${solution1(sequences)}`);
console.log(`Solution2: ${solution2(sequences)}`);
