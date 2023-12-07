import { readFileSync } from 'fs';
import { join } from 'path';

type Hand = {
  hand: string;
  bid: number;
};

const CARDS = '23456789TJQKA';
const CARDS_JOKER = 'J23456789TQKA';

function format(input: string): Hand[] {
  const data = readFileSync(join(__dirname, input), 'utf-8').trim().split('\n');
  return data.map((line) => {
    const [hand, bid] = line.split(' ');
    return { hand: hand, bid: parseInt(bid, 10) };
  });
}

function getCards(hand: string): Record<string, number> {
  const count: Record<string, number> = {};
  hand.split('').forEach((card) => {
    if (count[card]) {
      count[card] += 1;
    } else {
      count[card] = 1;
    }
  });
  return count;
}

function getScore(hand: string, isJoker: boolean) {
  const cards = getCards(hand);
  let jokers = 0;
  if (isJoker) {
    jokers = cards.J ?? 0;
    delete cards.J;
  }
  const highest = Math.max(...Object.values(cards)) + jokers;
  const cardsType = Object.keys(cards).length;
  if (cardsType <= 1) {
    return 6;
  }
  if (cardsType === 2 && highest === 4) {
    return 5;
  }
  if (cardsType === 2) {
    return 4;
  }
  if (highest === 3) {
    return 3;
  }
  if (cardsType === 3 && highest === 2) {
    return 2;
  }
  if (highest === 2) {
    return 1;
  }
  return 0;
}

function sortHands(a: Hand, b: Hand, cards: string, isJoker: boolean): number {
  const aScore = getScore(a.hand, isJoker);
  const bScore = getScore(b.hand, isJoker);

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
