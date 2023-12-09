import { readFileSync } from 'fs';
import { join } from 'path';

type History = {
  values: number[];
  prediction: number;
};

function format(input: string): History[] {
  const data = readFileSync(join(__dirname, input), 'utf-8').trim().split('\n');
  return data.map((line) => {
    const values = line.split(' ').map((num) => parseInt(num, 10));
    const prediction = 0;
    return { values: values, prediction: prediction };
  });
}

function getPrediction(history: History): number {
  if (!history.values.some((val) => val !== 0)) {
    return history.prediction;
  }
  const valEnd = history.values.length - 1;
  const prediction = history.prediction + history.values[valEnd];
  const values: number[] = [];
  for (let i = 1; i <= valEnd; i += 1) {
    values.push(history.values[i] - history.values[i - 1]);
  }
  return getPrediction({ values: values, prediction: prediction });
}

const report = format('input.txt');
const solution1 = report.reduce((acc, curr) => acc + getPrediction(curr), 0);
console.log(solution1);
