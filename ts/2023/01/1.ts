import { PathOrFileDescriptor, readFileSync } from 'fs';

function format(input: PathOrFileDescriptor): string[] {
  return readFileSync(input, 'utf-8').trim().split('\n');
}

function Solution(data: string[]) {
  const numArr = data.map((str) =>
    str.split('').filter((char) => char === '0' || Number(char))
  );
  let result = 0;
  numArr.forEach(arr => {
    if(arr.length === 1) {
      result += Number(arr[0] + arr[0]);
    } else {
      result += Number(arr[0] + arr[arr.length - 1]);
    }
  })
  return result;
}

const data = format('./input.txt');
console.log(`Solution1: ${Solution(data)}`);
