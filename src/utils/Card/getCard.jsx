export const getCard = (deck) => {
  const card = deck.pop();
  deck = deck.filter((c) => c !== card);
  return card;
};
