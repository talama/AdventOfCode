import { readFileSync } from 'fs';
import { join } from 'path';

function format(input: string): string[] {
  return readFileSync(join(__dirname, input), 'utf-8').trim().split('\n');
}

function Solution1(data: string[]): number {
  let result = 0;
  data.forEach((line) => {
    const values = line
      .split('')
      .filter((char) => char === '0' || Number(char));
    result += Number(values[0] + values[values.length - 1]);
  });
  return result;
}

function Solution2(data: string[]): number {
  const numbers: { [index: string]: string } = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  };

  let result = 0;

  data.forEach((line) => {
    const matches: { [index: string]: string } = {};
    // Find the index of every occurance of each key (numbers as words)
    // and use it as key for the matches obj
    Object.keys(numbers).forEach((num) => {
      let index = line.indexOf(num);
      while (index !== -1) {
        matches[index] = numbers[num];
        index = line.indexOf(num, index + 1);
      }
    });

    // Find the index of every occurance of each value (numbers as numbers)
    // and use it as key for the matches obj
    Object.values(numbers).forEach((num) => {
      let index = line.indexOf(num);
      while (index !== -1) {
        matches[index] = num;
        index = line.indexOf(num, index + 1);
      }
    });
    const values = Object.values(matches);
    result += Number(values[0] + values[values.length - 1]);
  });
  return result;
}

const data = format('input.txt');
console.log(`Solution1: ${Solution1(data)}`);
console.log(`Solution2: ${Solution2(data)}`);
