import { readFileSync } from 'fs';
import { join } from 'path';

type Hand = {
  hand: string;
  bid: number;
};

const CARDS: string = '23456789TJQKA';
const CARDS_JOKER = 'J23456789TQKA';

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
    if (count > 1) {
      score += count;
    }
  });
  return score;
}

function getScoreJoker(hand: string) {
  let score = 0;
  if (hand.indexOf('J') !== -1) {
    for (let i = 0; i < CARDS.length; i += 1) {
      const tmpScore = getScore(hand.replaceAll('J', CARDS[i]));
      if (tmpScore > score) {
        score = tmpScore;
      }
    }
  } else score = getScore(hand);
  return score;
}

function sortHands(a: Hand, b: Hand, cards: string, isJoker: boolean): number {
  let [aScore, bScore] = [0, 0];

  if (isJoker) {
    aScore = getScoreJoker(a.hand);
    bScore = getScoreJoker(b.hand);
  } else {
    aScore = getScore(a.hand);
    bScore = getScore(b.hand);
  }
  if (aScore === bScore) {
    for (let i = 0; i < 5; i += 1) {
      const aHigh = cards.indexOf(a.hand[i]);
      const bHigh = cards.indexOf(b.hand[i]);
      if (aHigh > bHigh) {
        return 1;
      }
      if (aHigh < bHigh) {
        return -1;
      }
    }
  }
  return aScore - bScore;
}

function solution(hands: Hand[], isJoker: boolean) {
  const cards = isJoker ? CARDS_JOKER : CARDS;
  return hands
    .sort((a, b) => sortHands(a, b, cards, isJoker))
    .reduce((acc, curr, idx) => curr.bid * (idx + 1) + acc, 0);
}

const hands = format('input.txt');
console.log(`Solution1: ${solution(hands, false)}`);
console.log(`Solution2: ${solution(hands, true)}`);
