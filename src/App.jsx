import { useState } from "react";
import "./App.css";

function App() {
    const [dealer, setDealer] = useState({ deck: [], points: 0 });
    const [player, setPlayer] = useState({ deck: [], points: 0 });
    const [gameStatus, setGameStatus] = useState(" ");
    const cards = {
        values: [
            "ace",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "jack",
            "queen",
            "king",
        ],
        symbols: ["clubs", "diamonds", "hearts", "spades"],
    };

    function getRandomNumber(max) {
        return Math.floor(Math.random() * max);
    }

    function getRandomCard() {
        return `${cards.values[getRandomNumber(cards.values.length)]}_of_${
            cards.symbols[getRandomNumber(cards.symbols.length)]
        }`;
    }

    function getRandomDeck() {
        return [getRandomCard(), getRandomCard()];
    }

    function getDeckScore(deck) {
        const cardValues = {
            jack: 10,
            queen: 10,
            king: 10,
            ace: 11,
        };
        let totalPoints = 0;

        for (let i = 0; i < deck.length; i++) {
            const card = deck[i];
            const valueString = card.split("_")[0];
            const value = cardValues[valueString] || parseInt(valueString);
            totalPoints += value;
        }

        return totalPoints;
    }

    if (gameStatus == "onGoing") {
        dealer.points = getDeckScore(dealer.deck);
        player.points = getDeckScore(player.deck);

        if (player.points == dealer.points) {
            setGameStatus("push");
        } else if (
            (player.points == 21 || player.points > dealer.points) &&
            player.points <= 21
        ) {
            setGameStatus("win");
        } else if (player.points > 21) {
            setGameStatus("bust");
        }
    }

    function handleClick() {
        if (gameStatus == "onGoing") {
            setPlayer((prevPlayer) => ({
                ...prevPlayer,
                deck: [...prevPlayer.deck, getRandomCard()],
            }));
        } else {
            setDealer((prevDealer) => ({
                ...prevDealer,
                deck: getRandomDeck(),
            }));
            setPlayer((prevPlayer) => ({
                ...prevPlayer,
                deck: getRandomDeck(),
            }));
            setGameStatus("onGoing");
        }
    }

    function DisplayCards() {
        const dealerCardsElem = dealer.deck.map((card, key) => (
            <img src={`cards/${card}.png`} key={key} />
        ));
        const playerCardsElem = player.deck.map((card, key) => (
            <img src={`cards/${card}.png`} key={key} />
        ));
        return (
            <>
                <h2>Dealer&apos;s Cards {dealer.points}</h2>
                <h3>{dealerCardsElem}</h3>
                <h2>Player&apos;s Cards {player.points} </h2>
                <h3>{playerCardsElem}</h3>
            </>
        );
    }

    return (
        <>
            {gameStatus == " " ? "" : <DisplayCards />}
            <h4>{gameStatus == "onGoing" ? "" : gameStatus}</h4>
            <button onClick={handleClick}>
                {gameStatus == " " ? "Start New Game" : "Deal"}
            </button>
        </>
    );
}

export default App;
