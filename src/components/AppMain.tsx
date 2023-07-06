import { useState } from 'react';
import { Card } from '../models/Card';
import { AppGame } from './AppGame';

export const AppMain = () => {
  const [cards, setCards] = useState<Card[]>([]);

  const images = [
    new Card('/img/bowser.png', false, 0),
    new Card('/img/mario.png', false, 0),
    new Card('/img/luigi.png', false, 0),
    new Card('/img/yoshi.png', false, 0),
    new Card('/img/link.png', false, 0),
  ];

  const shuffleCards = () => {
    const shuffledCards = [...images, ...images]
      .map((card) => {
        return { ...card, id: Math.random() };
      })
      .sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  };

  const flipCard = (id: number) => {
    const clickedCard = cards.map((card) => {
      if (card.id === id) {
        return { ...card, isClicked: true };
      }
      return card;
    });

    setCards(clickedCard);
  };

  console.log(cards);

  return (
    <main>
      <AppGame cards={cards} onFlipCard={flipCard} />
      <button onClick={shuffleCards}>Starta</button>
    </main>
  );
};
