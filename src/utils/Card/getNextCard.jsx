import { getHandScore } from "../Hands/getHandScore";
import { getCard } from "./getCard";

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
