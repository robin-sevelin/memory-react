import { useEffect, useState } from 'react';
import { Card } from '../models/Card';
import { AppGame } from './AppGame';
import { Game } from '../models/Game';

export const AppMain = () => {
  const [game, setGame] = useState<Game>({
    gameStarted: false,
    hasWinner: false,
  });
  const [cards, setCards] = useState<Card[]>([]);

  const [turns, setTurns] = useState(0);

  const images: Card[] = [
    { id: 0, img: '/img/bowser.png', isFlipped: false, isMatch: false },
    { id: 1, img: '/img/link.png', isFlipped: false, isMatch: false },
    { id: 2, img: '/img/luigi.png', isFlipped: false, isMatch: false },
    { id: 3, img: '/img/mario.png', isFlipped: false, isMatch: false },
    { id: 4, img: '/img/yoshi.png', isFlipped: false, isMatch: false },
    { id: 5, img: '/img/bowser.png', isFlipped: false, isMatch: false },
    { id: 6, img: '/img/link.png', isFlipped: false, isMatch: false },
    { id: 7, img: '/img/luigi.png', isFlipped: false, isMatch: false },
    { id: 8, img: '/img/mario.png', isFlipped: false, isMatch: false },
    { id: 9, img: '/img/yoshi.png', isFlipped: false, isMatch: false },
  ];

  const [guessOne, setGuessOne] = useState('');
  const [guessTwo, setGuessTwo] = useState('');
  const startGame = () => {
    const newGame = { ...game, gameStarted: true };

    setGame(newGame);
    shuffleCards();
  };
  const shuffleCards = () => {
    const shuffledCards = [...images].sort(() => Math.random() - 0.5);
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

  useEffect(() => {
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
        resetCard();
        resetChoice();
      }
    }
    checkWin();
  }, [guessOne, guessTwo, cards]);

  const resetChoice = () => {
    setTurns(turns + 1);
    setGuessOne('');
    setGuessTwo('');
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

  const checkWin = () => {
    if (cards.every(({ isMatch }) => isMatch === true)) {
      return setGame({ ...game, hasWinner: true });
    }
  };

  const quitGame = () => {
    setGame({ ...game, gameStarted: false, hasWinner: false });
    setTurns(0);
  };

  return (
    <main>
      {game.hasWinner && game.gameStarted && (
        <p>grattis du klarade det på {turns} försök</p>
      )}
      {game.gameStarted && !game.hasWinner && <p>{turns} antal försök</p>}

      {game.gameStarted && (
        <AppGame
          cards={cards}
          onFlipCard={flipCard}
          turns={turns}
          onQuitGame={quitGame}
        />
      )}
      {!game.gameStarted && <button onClick={startGame}>Starta</button>}
    </main>
  );
};
