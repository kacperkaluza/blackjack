import { useContext } from "react";
import "./App.css";
import GameStatusContext from "./context/GameStatusContext";
import Game from "./components/Game";


function App() {
  const gameStatus = useContext(GameStatusContext);
  console.log(gameStatus);
	return (
		<>
			{gameStatus == "null" && <Game />}
			<h2>{gameStatus}</h2>
		</>
	);
}

export default App;
