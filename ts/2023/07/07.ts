import { readFileSync } from 'fs';
import { join } from 'path';

type Hand = {
  hand: string;
  bid: number;
};

const CARDS = '23456789TJQKA';

function format(input: string): Hand[] {
  const data = readFileSync(join(__dirname, input), 'utf-8').trim().split('\n');
  return data.map((line) => {
    const [hand, bid] = line.split(' ');
    return { hand: hand, bid: parseInt(bid, 10) };
  });
}

function getScore(hand: string) {
  let score = 0;
  hand.split('').forEach((char) => {
    const regex = new RegExp(`${char}`, 'g');
    const count = (hand.match(regex) || []).length;
    if (count <= 1) {
      score += 0;
    } else if (count <= 3) {
      score += count;
    } else score += count + 1;
  });
  return score;
}

function sortHands(a: Hand, b: Hand): number {
  const aScore = getScore(a.hand);
  const bScore = getScore(b.hand);
  if (aScore === bScore) {
    for (let i = 0; i < 5; i += 1) {
      const aHigh = CARDS.indexOf(a.hand[i]);
      const bHigh = CARDS.indexOf(b.hand[i]);
      if (aHigh > bHigh) {
        return 1;
      }
      if (aHigh < bHigh) {
        return -1;
      }
    }
  }
  if (aScore > bScore) {
    return 1;
  }
  if (aScore < bScore) {
    return -1;
  }
  return 0;
}

function solution1(hands: Hand[]) {
  return hands
    .sort((a, b) => sortHands(a, b))
    .reduce((acc, curr, idx) => curr.bid * (idx + 1) + acc, 0);
}

const hands = format('input.txt');
console.log(solution1(hands));
