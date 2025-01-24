import { useState } from "react";
import "./App.css";
import Display from "../components/Display";
import { cards } from "../data/cards";
import getRandomNumber from "../utils/getRandomNumber";

const getDeck = () => {
	return cards.values
		.map((value) => cards.symbols.map((symbol) => `${value}_of_${symbol}`))
		.flat();
};

const shuffleDeck = (deck) => {
	let randomIndex, tempValue;
	for (let i = deck.length - 1; i > 0; i--) {
		randomIndex = getRandomNumber(i + 1);
		tempValue = deck[i];
		deck[i] = deck[randomIndex];
		deck[randomIndex] = tempValue;
	}
	return deck;
};
var deck = [];

function App() {
	const [dealer, setDealer] = useState({ hand: [''], points: 0 });
	const [player, setPlayer] = useState({ hand: [''], points: 0 });
	const [gameStatus, setGameStatus] = useState("NaN");

	const getCard = () => {
		const card = deck.pop();
		// deck = deck.filter((c) => c !== card);
		return card;
	};

	const getRandomHand = () => {
		let cards = deck.slice(-2);
		deck = deck.slice(0, -2);
		return cards;
	};

	const compareHands = (a, b) => {
		if (a > 21) {
			setGameStatus("win");
		} else {
			if (b == a) {
				setGameStatus("push");
			}
			if (b > a) {
				setGameStatus("win");
			}
			if (b < a) {
				setGameStatus("lose");
			}
		}
	};

	const getTemp = (tempObj) => {
		tempObj = {
			...tempObj,
			hand: [...tempObj.hand, getCard()],
		};
		tempObj = {
			...tempObj,
			points: getHandScore(tempObj),
		};
		return tempObj;
	};

	const getHandScore = (instance) => {
		
		const cardValues = {
			jack: 10,
			queen: 10,
			king: 10,
			ace: 11,
		};
		
		let totalPoints = 0;

		for (let i = 0; i < instance.hand.length; i++) {
			const card = instance.hand[i];
			const valueString = card.split("_")[0];
			let value = cardValues[valueString] || parseInt(valueString);

			if (valueString == "ace" && instance.points > 12) {
				value = 1;
			}

			totalPoints += value;
		}
		return totalPoints;
	};

	const startNewGame = () => {
		if (deck.length < 10) {
			deck = shuffleDeck(getDeck());
		}
		let tempPlayer = {
			hand: getRandomHand(),
			points: 0,
		};
		tempPlayer = {
			...tempPlayer,
			points: getHandScore(tempPlayer),
		};
		setPlayer(tempPlayer);
		let tempDealer = {
			hand: getRandomHand(),
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

	const dealCard = () => {
		let tempPlayer = player;
		tempPlayer = getTemp(tempPlayer);
		setPlayer(tempPlayer);
		if (tempPlayer.points > 21) {
			return setGameStatus("bust");
		}
		if (tempPlayer.points == 21) {
			let tempDealer = dealer;
			while (tempDealer.points < 17) {
				tempDealer = getTemp(tempDealer);
			}
			setDealer(tempDealer);
			return compareHands(tempDealer.points, tempPlayer.points);
		}
	};

	const foldHand = () => {
		let tempDealer = dealer;
		while (tempDealer.points < 17) {
			tempDealer = getTemp(tempDealer);
		}
		setDealer(tempDealer);
		return compareHands(tempDealer.points, player.points);
	};

	const handleClick = (e) => {
		if (e.target.name == "start") {
			startNewGame();
		}

		if (e.target.name == "deal") {
			dealCard();
		}

		if (e.target.name == "fold") {
			foldHand();
		}
	};
	return (
		<>
			{gameStatus != "NaN" && (
				<Display
					dealer={dealer}
					player={player}
					gameStatus={gameStatus}
				/>
			)}
			{gameStatus != "onGoing" && (
				<button onClick={handleClick} name="start">
					New Game
				</button>
			)}
			{gameStatus == "onGoing" && (
				<button onClick={handleClick} name="deal">
					Deal
				</button>
			)}
			{gameStatus == "onGoing" && (
				<button onClick={handleClick} name="fold">
					Fold
				</button>
			)}
			<h2>{gameStatus}</h2>
		</>
	);
}

export default App;
