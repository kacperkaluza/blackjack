import { useContext, useState } from "react";
import { getDeck } from "../../utils/Deck/getDeck";
import { shuffleDeck } from "../../utils/Deck/shuffleDeck";
import { getHandScore } from "../../utils/Hands/getHandScore";
import { getRandomHand } from "../../utils/Hands/getRandomHand";
import DeckContext from "../../context/DeckContext";
import PlayerContext  from "../../context/PlayerContext";
import DealerContext  from "../../context/DealerContext";
import GameStatusContext from "../../context/GameStatusContext";

export default function Start() {
	var deck = useContext(DeckContext);
	const [dealer, setDealer] = useState(useContext(DealerContext));
	const [player, setPlayer] = useState(useContext(PlayerContext));
  const [gameStatus, setGameStatus] = useState(useContext(GameStatusContext));
  
	const handleClick = () => {
		if (deck.length < 10) {
			deck = shuffleDeck(getDeck());
		}
		let tempPlayer = {
			hand: getRandomHand(deck),
			points: 0,
		};
		tempPlayer = {
			...tempPlayer,
			points: getHandScore(tempPlayer),
		};
		setPlayer(tempPlayer);
		let tempDealer = {
			hand: getRandomHand(deck),
			points: 0,
		};
		tempDealer = {
			...tempDealer,
			points: getHandScore(tempDealer),
		};
		setDealer(tempDealer);
		let tempGameStatus = "";
		if (tempPlayer.points == 21) {
			tempGameStatus = "blackjack";
		}
		if (tempPlayer.points < 21) {
			if (tempDealer.points == "21") {
				tempGameStatus = "lose";
			} else {
				tempGameStatus = "onGoing";
			}
		}
		return setGameStatus(tempGameStatus);
	};
	return (
		<DealerContext.Provider value={dealer}>
			<PlayerContext.Provider value={player}>
				<GameStatusContext.Provider value={gameStatus}>
					<button onClick={handleClick}>Start New Game</button>
				</GameStatusContext.Provider>
			</PlayerContext.Provider>
		</DealerContext.Provider>
	);
}
