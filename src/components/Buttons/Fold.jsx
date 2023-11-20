import { getNextCard } from "../../utils/Card/getNextCard";
import { compareHands } from "../../utils/Hands/compareHands";

export default function Fold() {
  const handleClick = () => {
    let tempDealer = dealer;
    while (tempDealer.points < 17) {
      tempDealer = getNextCard(tempDealer);
    }
    setDealer(tempDealer);
    return compareHands(tempDealer.points, player.points);
  };
  return <button onClick={handleClick}>Fold</button>;
}
