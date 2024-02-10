export const getRandomHand = (deck) => {
  let cards = deck.slice(-2);
  console.log(cards);
  console.log(deck);
  deck = deck.slice(0, -2);
  return cards;
};
