import { getNextCard } from "../../utils/Card/getNextCard";
import { compareHands } from "../../utils/Hands/compareHands";

export default function Deal({player}) {
  const handleClick = () => {
      let tempPlayer = player;
      tempPlayer = getNextCard(tempPlayer);
      setPlayer(tempPlayer);
      if (tempPlayer.points > 21) {
        return setGameStatus("bust");
      }
      if (tempPlayer.points == 21) {
        let tempDealer = dealer;
        while (tempDealer.points < 17) {
          tempDealer = getNextCard(tempDealer);
        }
        setDealer(tempDealer);
        return compareHands(tempDealer.points, tempPlayer.points);
      }
    
  }
  return(<button onClick={handleClick}>Deal</button>)
}