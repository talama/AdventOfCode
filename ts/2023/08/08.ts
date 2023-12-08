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

function getSteps(instructions: string, map: NodeMap, startPos: string) {
  let steps = 0;
  let position = startPos;
  while (!position.endsWith('Z')) {
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

function gcd(a: number, b: number): number {
  return b ? gcd(b, a % b) : a;
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

const [instructions, map] = format('input.txt');
const startPositions = Object.keys(map).filter((key) => key.endsWith('A'));
const steps = startPositions.map((startPos) =>
  getSteps(instructions as string, map as NodeMap, startPos)
);
const solution2 = steps.reduce((a, b) => lcm(a, b));
console.log(`Solution1: ${solution1(instructions as string, map as NodeMap)}`);
console.log(`Solution2: ${solution2}`);
