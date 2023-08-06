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
    { id: 0, img: '/img/link.png', isFlipped: false, isMatch: false },
    { id: 0, img: '/img/donkeykong.jpg', isFlipped: false, isMatch: false },
    { id: 0, img: '/img/luigi.jpg', isFlipped: false, isMatch: false },
    { id: 0, img: '/img/toad.webp', isFlipped: false, isMatch: false },
    { id: 0, img: '/img/yoshi.png', isFlipped: false, isMatch: false },
    { id: 0, img: '/img/peach.png', isFlipped: false, isMatch: false },
  ];

  const [guessOne, setGuessOne] = useState('');
  const [guessTwo, setGuessTwo] = useState('');

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
        resetChoice();
        resetCard();
      }
    }

    if (cards.length > 0 && cards.every((card) => card.isMatch === true)) {
      setGame({ ...game, hasWinner: true });
    }
  }, [guessOne, guessTwo, cards]);

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
    }, 500);
  };

  const restartGame = () => {
    startGame();
    setTurns(0);
  };

  const quitGame = () => {
    setGame({ ...game, gameStarted: false, hasWinner: false });
    setTurns(0);
  };

  return (
    <main>
      {game.hasWinner && <p>Grattis! Du klarade det på {turns} försök.</p>}
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
      {game.gameStarted && <button onClick={restartGame}>Börja om</button>}
    </main>
  );
};
