import { useState } from "react";
import "./App.css";
var deck;

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

    const getDeck = () => {
        return cards.values
            .map((value) =>
                cards.symbols.map((symbol) => `${value}_of_${symbol}`)
            )
            .flat();
    };

    const getRandomNumber = (max) => {
        return Math.floor(Math.random() * max);
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

    if (gameStatus == "NaN") deck = shuffleDeck(getDeck());
    console.log(deck);

    const getCard = () => {
        const card = deck.pop();
        deck = deck.filter((c) => c !== card);
        return card;
    };

    const getRandomHand = () => {
        let cards = deck.slice(-2);
        console.log(cards);
        console.log(deck);
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
            if (deck.length < 8) {
                deck = shuffleDeck(getDeck());
            }
            startNewGame();
        }

        if (e.target.name == "deal") {
            dealCard();
        }

        if (e.target.name == "fold") {
            foldHand();
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
                <h2>
                    Dealer&apos;s Cards{" "}
                    {gameStatus != "onGoing" ? dealer.points : null}
                </h2>
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
