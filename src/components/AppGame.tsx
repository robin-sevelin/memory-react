import { Card } from '../models/Card';

import { AppCard } from './AppCard';

interface IGameProps {
  cards: Card[];
  turns: number;

  onFlipCard: (card: Card, index: number) => void;
  onQuitGame: () => void;
}

export const AppGame = ({ cards, onFlipCard, onQuitGame }: IGameProps) => {
  const flipCard = (card: Card, index: number) => {
    onFlipCard(card, index);
  };

  const handleClick = () => {
    onQuitGame();
  };
  return (
    <>
      <div className='board'>
        {cards.map((card, index) => (
          <div className='card' key={index}>
            <AppCard cards={card} index={index} onFlipCard={flipCard} />
          </div>
        ))}
      </div>

      <button onClick={handleClick}>Avsluta</button>
    </>
  );
};
