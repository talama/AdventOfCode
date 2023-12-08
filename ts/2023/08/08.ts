import { readFileSync } from 'fs';
import { join } from 'path';

// { AAA: [ 'BBB', 'BBB' ], BBB: [ 'AAA', 'ZZZ' ], ZZZ: [ 'ZZZ', 'ZZZ' ] }
type NodeMap = Record<string, string[]>;

function format(input: string) {
  const data = readFileSync(join(__dirname, input), 'utf-8')
    .trim()
    .split('\n\n');
  const instructions: string = data[0];
  const nodes = data[1].split('\n').map((line) => {
    const matches = line.match(/\b\w+\b/g);
    return matches;
  });
  const map: NodeMap = {};
  nodes.forEach((node) => {
    if (node) {
      map[node[0]] = [node[1], node[2]];
    }
  });
  return [instructions, map];
}

function solution1(instructions: string, map: NodeMap) {
  let steps = 0;
  let position = 'AAA';
  while (position !== 'ZZZ') {
    const [left, right] = map[position];
    const instruction = instructions.charAt(steps % instructions.length);
    if (instruction === 'L') {
      position = left;
    } else {
      position = right;
    }
    steps += 1;
  }
  return steps;
}

const [instructions, map] = format('input.txt');
console.log(`Solution1: ${solution1(instructions as string, map as NodeMap)}`);
