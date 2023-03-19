import { it, expect } from "@jest/globals";
import { generateCards, suits, ranks } from "./generate_cards";
import { condition } from "./condition";

it("should check the length of the variable if the complexity is 1", () => {
  const complexity = "1";

  generateCards(suits, ranks, complexity, condition);

  expect(Object.keys(condition.cards)).toHaveLength(3);
});

it("should check the length of the variable if the complexity is 2", () => {
  const complexity = "2";

  generateCards(suits, ranks, complexity, condition);

  expect(Object.keys(condition.cards)).toHaveLength(6);
});

it("should check the length of the variable if the complexity is 3", () => {
  const complexity = "3";

  generateCards(suits, ranks, complexity, condition);

  expect(Object.keys(condition.cards)).toHaveLength(9);
});
