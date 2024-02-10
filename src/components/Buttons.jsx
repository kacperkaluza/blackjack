import { useContext } from "react";
import Deal from "./Buttons/Deal";
import Fold from "./Buttons/Fold";
import Start from "./Buttons/Start";
import GameStatusContext from "../context/GameStatusContext";

export default function Buttons() {
  const gameStatus = useContext(GameStatusContext);
  return (
    <>
      {gameStatus != "onGoing" && <Start />}
      {gameStatus == "onGoing" && <Deal />}
      {gameStatus == "onGoing" && <Fold />}
      <Fold />
    </>
  );
}
