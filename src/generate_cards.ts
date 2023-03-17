import { Condition } from "./condition";

export const suits = [
  "./static/spades.png",
  "./static/hearts.png",
  "./static/diamonds.png",
  "./static/clubs.png",
];
export const ranks = ["A", "K", "Q", "J", "10", "9", "8", "7", "6"];

export function generateCards(
  suits: string[],
  ranks: string[],
  complexity: string,
  condition: Condition,
): void {
  let pairsCount: number;
  if (complexity === "1") {
    pairsCount = 3;
  } else if (complexity === "2") {
    pairsCount = 6;
  } else if (complexity === "3") {
    pairsCount = 9;
  }
  let rank: number;
  let suit: number;
  condition.cards = {};
  for (let i = 0; i < pairsCount; i++) {
    rank = Math.floor(Math.random() * ranks.length);
    suit = Math.floor(Math.random() * suits.length);
    condition.cards[i] = {
      rank: `${ranks[rank]}`,
      suit: `${suits[suit]}`,
    };
  }
}
