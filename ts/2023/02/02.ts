import { readFileSync } from 'fs';
import { join } from 'path';

type Round = { [index: string]: number };

type Game = {
  id: number;
  rounds: Round[];
};

function format(input: string): Game[] {
  const data = readFileSync(join(__dirname, input), 'utf-8').trim().split('\n');
  const keys = ['red', 'green', 'blue'];
  return data.map((line) => {
    const game = line.split(':');
    const id = Number(game[0].slice(5));
    const rounds = game[1].split(';').map((round) => {
      const result: Round = {};
      keys.forEach((key) => {
        const index = round.indexOf(key);
        if (index !== -1) {
          result[key] = Number(round.slice(index - 3, index - 1));
        }
      });
      return result;
    });
    return { id: id, rounds: rounds };
  });
}

function solution1(data: Game[], bag: Round): number {
  let result = 0;
  data.forEach((game) => {
    if (
      !game.rounds.some((round) =>
        Object.keys(round).some((key) => round[key] > bag[key])
      )
    ) {
      result += game.id;
    }
  });
  return result;
}

function solution2(data: Game[]): number {
  let result = 0;
  data.forEach((game) => {
    const cubes: Round = { red: 1, green: 1, blue: 1 };
    game.rounds.forEach((round) => {
      Object.keys(cubes).forEach((key) => {
        if (round[key] && round[key] > cubes[key]) {
          cubes[key] = round[key];
        }
      });
    });
    result += cubes.red * cubes.green * cubes.blue;
  });
  return result;
}

const data = format('input.txt');
const bag : Round = { red: 12, green: 13, blue: 14 };
console.log(`Solution1: ${solution1(data, bag)}`);
console.log(`Solution2: ${solution2(data)}`);
