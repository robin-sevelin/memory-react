import { useEffect, useState } from 'react';
import { Card } from '../models/Card';
import { AppGame } from './AppGame';
import { Game } from '../models/Game';
import { Choice } from '../models/Choice';

export const AppMain = () => {
  const [game, setGame] = useState<Game>({ gameOver: true });
  const [cards, setCards] = useState<Card[]>([]);
  const [choiceOne, setChoiceOne] = useState<Choice>({ choice: '' });
  const [choiceTwo, setChoiceTwo] = useState<Choice>({ choice: '' });
  const [turns, setTurns] = useState(0);

  const images = [
    new Card('/img/bowser.png', false, false, 0),
    new Card('/img/mario.png', false, false, 0),
    new Card('/img/luigi.png', false, false, 0),
    new Card('/img/yoshi.png', false, false, 0),
    new Card('/img/link.png', false, false, 0),
  ];

  const startGame = () => {
    const newGame = { ...game, gameOver: false };

    setGame(newGame);
    shuffleCards();
  };
  const shuffleCards = () => {
    const shuffledCards = [...images, ...images]
      .map((card) => {
        return { ...card, id: Math.random() };
      })
      .sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  };

  const flipCard = (name: string) => {
    choiceOne.choice !== ''
      ? setChoiceTwo({ choice: name })
      : setChoiceOne({ choice: name });
  };

  useEffect(() => {
    if (choiceOne.choice && choiceTwo.choice !== '') {
      if (choiceOne.choice === choiceTwo.choice) {
        setCards(
          cards.map((card) => {
            if (card.name === choiceOne.choice) {
              return { ...card, isMatch: true };
            } else {
              return card;
            }
          })
        );

        resetChoice();
      } else {
        resetChoice();
      }
    }
  }, [choiceOne, choiceTwo, cards]);

  const resetChoice = () => {
    setTurns((turns) => turns + 1);
    setChoiceOne({ choice: '' });
    setChoiceTwo({ choice: '' });
  };

  const quitGame = () => {
    const quitGame = { ...game, gameOver: true };
    setGame(quitGame);
    setTurns(0);
  };

  return (
    <main>
      {!game.gameOver && (
        <AppGame
          cards={cards}
          onFlipCard={flipCard}
          turns={turns}
          onQuitGame={quitGame}
        />
      )}
      {game.gameOver && <button onClick={startGame}>Starta</button>}
    </main>
  );
};
