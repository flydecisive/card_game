export interface Condition {
  complexity: string | null;
  move: string | null;
  time: string | null;
  cards: { [key: number]: { rank: string; suit: string } };
  userCards: string[];
}

export const condition: Condition = {
  complexity: null,
  move: null,
  time: null,
  cards: {},
  userCards: [""],
};
