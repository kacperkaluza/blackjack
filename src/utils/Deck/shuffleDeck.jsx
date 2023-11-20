import { getRandomNumber } from "../getRandomNumber";

export const shuffleDeck = (deck) => {
  let randomIndex, tempValue;
  for (let i = deck.length - 1; i > 0; i--) {
    randomIndex = getRandomNumber(i + 1);
    tempValue = deck[i];
    deck[i] = deck[randomIndex];
    deck[randomIndex] = tempValue;
  }
  return deck;
};
