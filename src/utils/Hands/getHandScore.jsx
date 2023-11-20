export const getHandScore = (instance) => {
  const cardValues = {
    jack: 10,
    queen: 10,
    king: 10,
    ace: 11,
  };
  let totalPoints = 0;

  for (let i = 0; i < instance.hand.length; i++) {
    const card = instance.hand[i];
    const valueString = card.split("_")[0];
    let value = cardValues[valueString] || parseInt(valueString);

    if (valueString == "ace" && instance.points > 12) {
      value = 1;
    }

    totalPoints += value;
  }

  return totalPoints;
};
