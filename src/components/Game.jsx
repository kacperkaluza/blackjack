import { useContext } from "react";
import Buttons from "./Buttons";
import GameStatusContext from "../context/GameStatusContext";
import PlayerContext from "../context/PlayerContext";
import DealerContext from "../context/DealerContext";

export default function Game() {
  const gameStatus = useContext(GameStatusContext);
  const player = useContext(PlayerContext);
  const dealer = useContext(DealerContext);
  
  const dealerCardsElem = dealer.hand.map((card, key) => (
    <img
      src={`cards/${
        gameStatus == "onGoing" && key == 1 ? "0_blank" : card
      }.png`}
      key={key}
    />
  ));
  const playerCardsElem = player.hand.map((card, key) => (
    <img src={`cards/${card}.png`} key={key} />
  ));
  return (
    <>
      <h2>
        Dealer&apos;s Cards {gameStatus != "onGoing" ? dealer.points : null}
      </h2>
      <h3>{dealerCardsElem}</h3>
      <h2>Player&apos;s Cards {player.points} </h2>
      <h3>{playerCardsElem}</h3>
      <Buttons />
    </>
  );
}
