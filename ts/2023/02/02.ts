import { readFileSync } from 'fs';
import { join } from 'path';

type Game = Record<string, number>;

function format(input: string) {
  const data = readFileSync(join(__dirname, input), 'utf-8').trim().split('\n');
  return data.map((line) => {
    const game: Game = {};
    const rounds = line.match(/(\d+)\s(\w+)/g);
    if (rounds) {
      rounds.forEach((elem) => {
        const [value, color] = elem.split(' ');
        if (!Object.hasOwn(game, color) || game[color] < parseInt(value, 10)) {
          game[color] = parseInt(value, 10);
        }
      });
    }
    return game;
  });
}

function Solutions(games: Game[], bag: Game) {
  let sol1 = 0;
  let sol2 = 0;

  games.forEach((game, index) => {
    const { red, blue, green } = game;
    if (red <= bag.red && green <= bag.green && blue <= bag.blue) {
      sol1 += index + 1;
    }
    sol2 += ( red * green * blue );
  });
  return [sol1, sol2];
}

const bag: Game = { red: 12, green: 13, blue: 14 };
const games = format('input.txt');
const [sol1, sol2] = Solutions(games, bag);
console.log(`Solution1: ${sol1}`);
console.log(`Solution2: ${sol2}`);
