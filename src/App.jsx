import { useState } from "react";
import "./App.css";
import Display from "./components/Display";

var deck = [];

function App() {
  const [dealer, setDealer] = useState({ hand: [], points: 0 });
  const [player, setPlayer] = useState({ hand: [], points: 0 });
  const [gameStatus, setGameStatus] = useState("NaN");
  return (
    <>
      {gameStatus == "NaN" ? null : (
        <Display dealer={dealer} player={player} gameStatus={gameStatus} />
      )}
      <h2>{gameStatus}</h2>
    </>
  );
}

export default App;
