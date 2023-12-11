import "./App.css";
import { DealerProvider } from "./context/DealerContext";
import { useDealer } from "./hooks/useDealer";
import { usePlayer } from "./hooks/usePlayer";
import { useDeck } from "./hooks/useDeck";
import { useGameStatus } from "./hooks/useGameStatus";
import { DeckProvider } from "./context/DeckContext";
import { PlayerProvider } from "./context/PlayerContext";
import { GameStatusProvider } from "./context/GameStatusContext";
import Game from "./components/Game";

var deck = [];

function App() {
  const [deck, changeDeck] = useDeck();
  const [dealer, changeDealer] = useDealer();
  const [player, changePlayer] = usePlayer();
  const [gameStatus, changeGameStatus] = useGameStatus();
  return (
    <DealerProvider>
      <DeckProvider>
        <PlayerProvider>
          <GameStatusProvider>
            {gameStatus == "NaN" ? null : (
              <Game
                dealer={dealer}
                player={player}
                gameStatus={gameStatus}
              />
            )}
            <h2>{gameStatus}</h2>
          </GameStatusProvider>
        </PlayerProvider>
      </DeckProvider>
    </DealerProvider>
  );
}

export default App;
