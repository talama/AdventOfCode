import { readFileSync } from 'fs';
import { join } from 'path';

function format(input: string): Array<number> {
  const data = readFileSync(join(__dirname, input), 'utf-8');
  return data
    .trim()
    .split('\n')
    .map((str) => parseInt(str, 10));
}

/**
 * Solves twoSum and threeSum using hashmaps.
 * @param {string[]} number - Array of numbers to search in.
 * @param {string[]} target - target number for the sums.
 */
function findSums(numList: number[], target: number): void {
  const len = numList.length;
  const twoSum: number[] = [];
  const threeSum: number[] = [];
  const hashTwo: { [index: number]: number } = {};
  for (let i = 0; i < len; i += 1) {
    const hashThree: { [index: number]: number } = {};
    const diff = target - numList[i];
    if (diff in hashTwo) twoSum.push(hashTwo[diff], numList[i]);
    else hashTwo[numList[i]] = numList[i];
    for (let j = i + 1; j < len; j += 1) {
      if (diff - numList[j] in hashThree)
        threeSum.push(diff - numList[j], numList[j], numList[i]);
      else hashThree[numList[j]] = numList[j];
    }
  }
  console.log(`Two sum: ${twoSum[0] * twoSum[1]}`);
  console.log(`Three sum: ${threeSum[0] * threeSum[1] * threeSum[2]}`);
}

const data = format('input.txt');
findSums(data, 2020);

// function twoSum(numList: number[], target: number): void {
//   const len = numList.length;
//   const idx: number[] = [];
//   const hash: { [index: number]: number } = {};
//   for (let i = 0; i < len; i += 1) {
//     const diff = target - numList[i];
//     if (diff in hash) {
//       idx.push(hash[diff], numList[i]);
//       break;
//     }
//     hash[numList[i]] = numList[i];
//   }
//   console.log(`Two sum: ${idx[0] * idx[1]}`);
// }
//
// function threeSum(numList: number[], target: number): void {
//   const len = numList.length;
//   const idx: number[] = [];
//   const hash: { [index: number]: number } = {};
//   for (let i = 0; i < len; i += 1) {
//     const diff = target - numList[i];
//     for (let j = i + 1; j < len; j += 1) {
//       if (diff - numList[j] in hash) {
//         idx.push(numList[i], numList[j], hash[diff - numList[j]]);
//         break;
//       }
//       hash[numList[j]] = numList[j];
//     }
//   }
//   console.log(`Three sum: ${idx[0] * idx[1] * idx[2]}`);
//   }
//
// const test = [1721, 979, 366, 299, 675, 1456];
// twoSum(data, 2020);
// threeSum(data, 2020);
