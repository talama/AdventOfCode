import { readFileSync } from 'fs';
import { join } from 'path';

type Range = {
  start: number;
  end: number;
  offset: number;
};

function format(input: string): [number[], Range[][]] {
  const data = readFileSync(join(__dirname, input), 'utf-8')
    .trim()
    .split('\n\n');

  const seeds = data
    .shift()!
    .split(/:\s+/)[1]
    .split(' ')
    .map((num) => parseInt(num, 10));

  const almanac = data.map((mapping) => {
    const ranges = mapping
      .split(':')[1]
      .trim()
      .split('\n')
      .map((range) => {
        const [destination, source, length] = range
          .trim()
          .split(' ')
          .map((num) => parseInt(num, 10));
        return {
          start: source,
          end: source + length,
          offset: destination - source,
        };
      })
      .sort((rangeA, rangeB) => rangeA.start - rangeB.start);
    return ranges;
  });

  return [seeds, almanac];
}

function mapSeed(mapping: Range[], seed: number) {
  for (let i = 0; i < mapping.length; i += 1) {
    if (seed >= mapping[i].start && seed <= mapping[i].end) {
      return seed + mapping[i].offset;
    }
  }
  return seed;
}

function solution1(seeds: number[], almanac: Range[][]) {
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

const [seeds, almanac] = format('input.txt');

console.log(solution1(seeds, almanac));
