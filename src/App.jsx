import { useState } from "react";
import "./App.css";

function App() {
    const [dealer, setDealer] = useState({ deck: [], points: 0 });
    const [player, setPlayer] = useState({ deck: [], points: 0 });
    const [gameStatus, setGameStatus] = useState("NaN");
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

    const getRandomNumber = (max) => {
        return Math.floor(Math.random() * max);
    };

    const getRandomCard = () => {
        return `${cards.values[getRandomNumber(cards.values.length)]}_of_${
            cards.symbols[getRandomNumber(cards.symbols.length)]
        }`;
    };

    const getRandomDeck = () => {
        return [getRandomCard(), getRandomCard()];
    };

    const getDeckScore = (instance) => {
        const cardValues = {
            jack: 10,
            queen: 10,
            king: 10,
            ace: 11,
        };
        let totalPoints = 0;

        for (let i = 0; i < instance.deck.length; i++) {
            const card = instance.deck[i];
            const valueString = card.split("_")[0];
            let value = cardValues[valueString] || parseInt(valueString);

            if (valueString == "ace" && instance.points > 12) {
                value = 1;
            }

            totalPoints += value;
        }

        return totalPoints;
    };

    const handleClick = (e) => {
        if (e.target.name == "start") {
            setDealer((prevDealer) => ({
                ...prevDealer,
                deck: [getRandomCard()],
            }));
            setPlayer((prevPlayer) => ({
                ...prevPlayer,
                deck: getRandomDeck(),
            }));
            setGameStatus("onGoing");
        }

        if (e.target.name == "deal") {
            setPlayer((prevPlayer) => ({
                ...prevPlayer,
                deck: [...prevPlayer.deck, getRandomCard()],
            }));
            player.points = getDeckScore(player);
            if (player.points > 21) {
                setGameStatus("bust");
            }
        }

        if (e.target.name == "fold") {
            setGameStatus("fold");
        }
    };

    if (gameStatus == "fold") {
        setDealer((prevDealer) => ({
            ...prevDealer,
            deck: [...prevDealer.deck, getRandomCard()],
        }));
        dealer.points = getDeckScore(dealer);
        if (player.points == dealer.points) {
            setGameStatus("push");
        }
        if (player.points == 21) {
            setGameStatus("blackjack");
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
                <h2>Dealer&apos;s Cards {player.points}</h2>
                <h3>{dealerCardsElem}</h3>
                <h2>Player&apos;s Cards {player.points} </h2>
                <h3>{playerCardsElem}</h3>
            </>
        );
    }
    return (
        <>
            <DisplayCards />
            <button onClick={handleClick} name='start'>
                Start Game
            </button>
            <button onClick={handleClick} name='deal'>
                Deal
            </button>
            <button onClick={handleClick} name='fold'>
                Fold
            </button>
            <h2>{gameStatus}</h2>
        </>
    );
}

export default App;
