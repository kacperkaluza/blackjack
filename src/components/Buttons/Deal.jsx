import { useContext, useState } from "react";

import { getNextCard } from "../../utils/Card/getNextCard";
import { compareHands } from "../../utils/Hands/compareHands";

import DealerContext  from "../../context/DealerContext";
import PlayerContext from "../../context/PlayerContext";
import GameStatusContext from "../../context/GameStatusContext";

export default function Deal() {
	const [dealer, setDealer] = useState(useContext(DealerContext));
	const [player, setPlayer] = useState(useContext(PlayerContext));
	const [gameStatus, setGameStatus] = useState(useContext(GameStatusContext));

	const handleClick = () => {
		let tempPlayer = player;
		tempPlayer = getNextCard(tempPlayer);
		setPlayer(tempPlayer);
		if (tempPlayer.points > 21) {
			return setGameStatus("bust");
		}
		if (tempPlayer.points == 21) {
			let tempDealer = dealer;
			while (tempDealer.points < 17) {
				tempDealer = getNextCard(tempDealer);
			}
			setDealer(tempDealer);
			return compareHands(tempDealer.points, tempPlayer.points);
		}
	};

	return (
		<DealerContext.Provider value={dealer}>
			<PlayerContext.Provider value={player}>
				<GameStatusContext.Provider value={gameStatus}>
					<button onClick={handleClick}>Deal</button>
				</GameStatusContext.Provider>
			</PlayerContext.Provider>
		</DealerContext.Provider>
	);
}
