import { readFileSync } from 'fs';
import { join } from 'path';

function format(input: string): [number[], number[][][]] {
  const data = readFileSync(join(__dirname, input), 'utf-8')
    .trim()
    .split('\n\n');
  const seeds = data
    .shift()!
    .split(/:\s+/)[1]
    .split(' ')
    .map((num) => parseInt(num, 10));
  const almanac = data.map((line) => {
    const values = line.split(':')[1].trim();
    return values
      .split('\n')
      .map((str) => str.split(' ').map((num) => parseInt(num, 10)));
  });
  return [seeds, almanac];
}

function mapSeed(mapping: number[][], seed: number) {
  for (let i = 0; i < mapping.length; i += 1) {
    const destStart = mapping[i][0];
    const sourceStart = mapping[i][1];
    const range = mapping[i][2];
    if (seed >= sourceStart && seed <= sourceStart + range) {
      return seed + (destStart - sourceStart);
    }
  }
  return seed;
}

function solution1(seeds: number[], almanac: number[][][]) {
  return seeds
    .map((seed) => {
      let destination = seed;
      almanac.forEach((mapping) => {
        destination = mapSeed(mapping, destination);
      });
      return destination;
    })
    .reduce((acc, curr) => (curr < acc ? curr : acc));
}

function solution2(seeds: number[], almanac: number[][][]) {
  const seedRanges: number[][] = [];
  for (let i = 0; i < seeds.length; i += 2) {
    seedRanges.push([seeds[i], seeds[i + 1]]);
  }
  const destinations: number[] = [];
  seedRanges.forEach((range, idx) => {
    for (let i = range[0]; i < range[0] + range[1]; i += 1) {
      let destination = i;
      almanac.forEach((mapping) => {
        destination = mapSeed(mapping, destination);
      });
      if (!destinations[idx] || destination < destinations[idx]) {
        destinations[idx] = destination;
      }
    }
  });
  return destinations.reduce((acc, curr) => (curr < acc ? curr : acc));
}

const [seeds, almanac] = format('input.txt');
// console.log(solution2(seeds, almanac));
console.log(`Solution1: ${solution1(seeds, almanac)}`);
