export const getCard = () => {
  const card = deck.pop();
  deck = deck.filter((c) => c !== card);
  return card;
};
