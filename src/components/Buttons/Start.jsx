import { getDeck } from "../../utils/Deck/getDeck";
import { shuffleDeck } from "../../utils/Deck/shuffleDeck";
import { getHandScore } from "../../utils/Hands/getHandScore";
import { getRandomHand } from "../../utils/Hands/getRandomHand";

export default function Start() {
  const handleClick = () => {
    if (deck.length < 10) {
      deck = shuffleDeck(getDeck());
    }
    let tempPlayer = {
      hand: getRandomHand(),
      points: 0,
    };
    tempPlayer = {
      ...tempPlayer,
      points: getHandScore(tempPlayer),
    };
    setPlayer(tempPlayer);
    let tempDealer = {
      hand: getRandomHand(),
      points: 0,
    };
    tempDealer = {
      ...tempDealer,
      points: getHandScore(tempDealer),
    };
    setDealer(tempDealer);
    let tempGameStatus = "";
    if (tempPlayer.points == 21) {
      tempGameStatus = "blackjack";
    }
    if (tempPlayer.points < 21) {
      if (tempDealer.points == "21") {
        tempGameStatus = "lose";
      } else {
        tempGameStatus = "onGoing";
      }
    }
    return setGameStatus(tempGameStatus);
  };
  return <button onClick={handleClick}>Start New Game</button>;
}
