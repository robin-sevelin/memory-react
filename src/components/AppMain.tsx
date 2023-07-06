import { useState } from 'react';
import { Card } from '../models/Card';
import { AppGame } from './AppGame';

export const AppMain = () => {
  const [cards, setCards] = useState<Card[]>([]);

  const images = [
    new Card('/img/bowser.png', false),
    new Card('/img/mario.png', false),
    new Card('/img/luigi.png', false),
    new Card('/img/yoshi.png', false),
    new Card('/img/link.png', false),
  ];

  const shuffleCards = () => {
    const shuffledCards = [...images, ...images];
    shuffledCards.sort(() => 0.5 - Math.random());
    setCards(shuffledCards);
  };

  return (
    <main>
      <AppGame cards={cards} />
      <button onClick={shuffleCards}>Starta</button>
    </main>
  );
};
