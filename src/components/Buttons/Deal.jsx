import { useDealer } from "../../hooks/useDealer";
import { useGameStatus } from "../../hooks/useGameStatus";
import { usePlayer } from "../../hooks/usePlayer";
import { getNextCard } from "../../utils/Card/getNextCard";
import { compareHands } from "../../utils/Hands/compareHands";

export default function Deal() {
  const [dealer, changeDealer] = useDealer();
  const [player, changePlayer] = usePlayer();
  const [gameStatus, changeGameStatus] = useGameStatus();

  const handleClick = () => {
    let tempPlayer = player;
    tempPlayer = getNextCard(tempPlayer);
    changePlayer(tempPlayer);
    if (tempPlayer.points > 21) {
      return changeGameStatus("bust");
    }
    if (tempPlayer.points == 21) {
      let tempDealer = dealer;
      while (tempDealer.points < 17) {
        tempDealer = getNextCard(tempDealer);
      }
      changeDealer(tempDealer);
      return compareHands(tempDealer.points, tempPlayer.points);
    }
  };
  return <button onClick={handleClick}>Deal</button>;
}
