import Deal from "./Buttons/Deal";
import Fold from "./Buttons/Fold";
import Start from "./Buttons/Start";

export default function Buttons() {
  return (
    <>
      {gameStatus != "onGoing" && <Start />}
      {gameStatus == "onGoing" && <Deal />}
      {gameStatus == "onGoing" && <Fold />}
      <Fold />
    </>
  );
}
