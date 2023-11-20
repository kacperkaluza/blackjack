import Buttons from "./Buttons";

/* eslint-disable react/prop-types */
export default function Display({ dealer, player, gameStatus }) {
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
