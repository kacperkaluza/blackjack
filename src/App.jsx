import { useState } from "react";
import "./App.css";

function App() {
    const [dealer, setDealer] = useState({ hand: [], points: 0 });
    const [player, setPlayer] = useState({ hand: [], points: 0 });
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

    const getRandomHand = () => {
        return [getRandomCard(), getRandomCard()];
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

    const handleClick = (e) => {
        if (e.target.name == "start") {
            setDealer((prevDealer) => ({
                ...prevDealer,
                hand: getRandomHand(),
            }));
            setDealer((prevDealer) => ({
                ...prevDealer,
                points: getHandScore(prevDealer),
            }));
            setPlayer((prevPlayer) => ({
                ...prevPlayer,
                hand: getRandomHand(),
            }));
            setPlayer((prevPlayer) => ({
                ...prevPlayer,
                points: getHandScore(prevPlayer),
            }));
            setGameStatus("onGoing");
        }

        if (e.target.name == "deal") {
            let tempPlayer = player;
            tempPlayer = {
                ...tempPlayer,
                hand: [...tempPlayer.hand, getRandomCard()],
            };
            tempPlayer = {
                ...tempPlayer,
                points: getHandScore(tempPlayer),
            };
            setPlayer(tempPlayer);

            if (tempPlayer.points > 21) {
                setGameStatus("bust");
            }
            if (tempPlayer.points == 21) {
                let tempDealer = dealer;
                while (tempDealer.points < 17) {
                    tempDealer = {
                        ...tempDealer,
                        hand: [...tempDealer.hand, getRandomCard()],
                    };
                    tempDealer = {
                        ...tempDealer,
                        points: getHandScore(tempDealer),
                    };
                }
                setDealer(tempDealer);
                if (tempDealer.points > 21) {
                    setGameStatus("win");
                }
                if (tempPlayer.points == tempDealer.points) {
                    setGameStatus("push");
                }
                if (tempPlayer.points > tempDealer.points) {
                    setGameStatus("win");
                }
                if (tempPlayer.points < tempDealer.points) {
                    setGameStatus("lose");
                }
            }
        }

        if (e.target.name == "fold") {
            let tempDealer = dealer;
            while (tempDealer.points < 17) {
                tempDealer = {
                    ...tempDealer,
                    hand: [...tempDealer.hand, getRandomCard()],
                };
                tempDealer = {
                    ...tempDealer,
                    points: getHandScore(tempDealer),
                };
            }
            setDealer(tempDealer);
            if (tempDealer.points > 21) {
                setGameStatus("win");
            }
            if (player.points == tempDealer.points) {
                setGameStatus("push");
            }
            if (player.points > tempDealer.points) {
                setGameStatus("win");
            }
            if (player.points < tempDealer.points) {
                setGameStatus("lose");
            }
        }
    };

    function DisplayCards() {
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
                <h2>Dealer&apos;s Cards {dealer.points}</h2>
                <h3>{dealerCardsElem}</h3>
                <h2>Player&apos;s Cards {player.points} </h2>
                <h3>{playerCardsElem}</h3>
            </>
        );
    }
    return (
        <>
            {gameStatus == "NaN" ? null : <DisplayCards />}
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
