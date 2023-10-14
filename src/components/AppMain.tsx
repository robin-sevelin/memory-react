import { useState } from 'react';
import { Card } from '../models/Card';
import { AppGame } from './AppGame';
import { Game } from '../models/Game';
import { useSetGuess } from '../hooks/useSetGuess';

export const AppMain = () => {
  const [game, setGame] = useState<Game>({
    gameStarted: false,
    hasWinner: false,
  });
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState(0);
  const [guessOne, setGuessOne] = useState('');
  const [guessTwo, setGuessTwo] = useState('');

  const images: Card[] = [
    { id: 0, img: '/img/bowser.png', isFlipped: false, isMatch: false },
    { id: 0, img: '/img/link.png', isFlipped: false, isMatch: false },
    { id: 0, img: '/img/donkeykong.jpg', isFlipped: false, isMatch: false },
    { id: 0, img: '/img/luigi.jpg', isFlipped: false, isMatch: false },
    { id: 0, img: '/img/toad.webp', isFlipped: false, isMatch: false },
    { id: 0, img: '/img/yoshi.png', isFlipped: false, isMatch: false },
    { id: 0, img: '/img/peach.png', isFlipped: false, isMatch: false },
  ];

  const checkGuess = () => {
    if (guessOne !== '' && guessTwo !== '') {
      if (guessOne === guessTwo) {
        setCards(
          cards.map((card) => {
            if (card.img === guessOne) {
              return { ...card, isMatch: true, isFlipped: true };
            } else {
              return card;
            }
          })
        );

        resetChoice();
      } else {
        resetChoice();
        resetCard();
      }
    }

    if (cards.length > 0 && cards.every((card) => card.isMatch === true)) {
      setGame({ ...game, hasWinner: true });
    }
  };

  const startGame = () => {
    const newGame = { ...game, gameStarted: true, hasWinner: false };

    setGame(newGame);
    shuffleCards();
  };

  const shuffleCards = () => {
    const shuffledCards = [...images, ...images]
      .map((image) => {
        return { ...image, id: Math.random() };
      })
      .sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  };

  const flipCard = (card: Card, index: number) => {
    guessOne !== '' ? setGuessTwo(card.img) : setGuessOne(card.img);

    setCards(
      cards.map((card) => {
        if (cards[index].id === card.id) {
          return { ...card, isFlipped: true };
        } else {
          return card;
        }
      })
    );
  };

  console.log(game);

  const resetChoice = () => {
    setGuessOne('');
    setGuessTwo('');
    setTurns(turns + 1);
  };

  const resetCard = () => {
    setTimeout(() => {
      setCards(
        cards.map((card) => {
          return { ...card, isFlipped: false };
        })
      );
    }, 1000);
  };

  const restartGame = () => {
    startGame();
    setTurns(0);
  };

  const quitGame = () => {
    setGame({ ...game, gameStarted: false, hasWinner: false });
    setTurns(0);
  };

  useSetGuess(guessOne, guessTwo, checkGuess);

  return (
    <main>
      {game.hasWinner && <p>Grattis! Du klarade det på {turns} försök.</p>}
      {game.gameStarted && !game.hasWinner && <p>Antal försök: {turns}</p>}

      {game.gameStarted && (
        <AppGame
          cards={cards}
          onFlipCard={flipCard}
          turns={turns}
          onQuitGame={quitGame}
        />
      )}

      {!game.gameStarted && (
        <div>
          <button onClick={startGame}>Starta</button>{' '}
          <p>Hur många försök kan du klara spelet på?</p>
        </div>
      )}

      {game.gameStarted && <button onClick={restartGame}>Börja om</button>}
    </main>
  );
};
