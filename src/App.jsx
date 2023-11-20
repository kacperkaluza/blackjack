import { useState } from "react";
import "./App.css";
import Display from "./components/Display";

var deck = [];

function App() {
  const [dealer, setDealer] = useState({ hand: [], points: 0 });
  const [player, setPlayer] = useState({ hand: [], points: 0 });
  const [gameStatus, setGameStatus] = useState("NaN");

  const foldHand = () => {
    
  };

  return (
    <>
      {gameStatus == "NaN" ? null : (
        <Display dealer={dealer} player={player} gameStatus={gameStatus} />
      )}
      {gameStatus != "onGoing" ? (
        <button onClick={handleClick} name='start'>
          New Game
        </button>
      ) : null}
      {gameStatus == "onGoing" ? (
        <button onClick={handleClick} name='deal'>
          Deal
        </button>
      ) : null}
      {gameStatus == "onGoing" ? (
        <button onClick={handleClick} name='fold'>
          Fold
        </button>
      ) : null}
      <h2>{gameStatus}</h2>
    </>
  );
}

export default App;
