import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [dealerDeck, setDealerDeck] = useState([]);
    const [playerDeck, setPlayerDeck] = useState([]);
    const [info, setInfo] = useState(" ");

    function getDeckScore(deck) {
        return deck.reduce((total, amount) => total + amount);
    }

    if (info == "") {
        var dealerDeckScore = getDeckScore(dealerDeck);
        var playerDeckScore = getDeckScore(playerDeck);

        if (playerDeckScore == dealerDeckScore) {
            setInfo("push");
        } else if (
            (playerDeckScore == 21 || playerDeckScore > dealerDeckScore) &&
            playerDeckScore <= 21
        ) {
            setInfo("win");
        } else if (playerDeckScore > 21) {
            setInfo("bust");
        }
    }

    function getRandomCard() {
        return Math.floor(Math.random() * 14 + 2);
    }

    function getRandomDeck() {
        return [getRandomCard(), getRandomCard()];
    }

    function startNewGame() {
        if (info == "") {
            setPlayerDeck([...playerDeck, getRandomCard()]);
        } else {
            
            setDealerDeck(getRandomDeck());
            setPlayerDeck(getRandomDeck());
            if
            setInfo("");
        }
    }

    function DisplayCards() {
        const dealerCardsElem = dealerDeck.map((card) => `${card} `);
        const playerCardsElem = playerDeck.map((card) => `${card} `);
        return (
            <>
                <h2>Dealer's Cards</h2>
                <h3>{dealerCardsElem}</h3>
                <h2>Player's Cards</h2>
                <h3>{playerCardsElem}</h3>
            </>
        );
    }

    return (
        <>
            <button onClick={startNewGame}>
                {info ? "Start New Game" : "Take"}
            </button>

            <DisplayCards />
            <h4>{info}</h4>
        </>
    );
}

export default App;
