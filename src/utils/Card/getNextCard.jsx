export const getNextCard = (tempObj) => {
  tempObj = {
    ...tempObj,
    hand: [...tempObj.hand, getCard()],
  };
  tempObj = {
    ...tempObj,
    points: getHandScore(tempObj),
  };
  return tempObj;
};
