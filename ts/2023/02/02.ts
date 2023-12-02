import { readFileSync } from 'fs';
import { join } from 'path';

type Game = {
  id: number;
  rounds: { [index: string]: number }[];
};

function format(input: string): Game[] {
  const data = readFileSync(join(__dirname, input), 'utf-8').trim().split('\n');
  const keys = ['red', 'green', 'blue'];
  return data.map((line) => {
    const game = line.split(':');
    const id = Number(game[0].slice(5));
    console.log(id);
    const rounds = game[1].split(';').map((round) => {
      const result: { [index: string]: number } = {};
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

function solution1(data: Game[], bag: { [index: string]: number }): number {
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

const data = format('input.txt');
const bag = { red: 12, green: 13, blue: 14 };
console.log(solution1(data, bag));
