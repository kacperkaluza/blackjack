import { cards } from "../../data/cards";

export const getDeck = () => {
  return cards.values
    .map((value) => cards.symbols.map((symbol) => `${value}_of_${symbol}`))
    .flat();
};
