import { Card } from '../models/Card';
import { AppCard } from './AppCard';

interface IGameProps {
  cards: Card[];
  onFlipCard: (id: number) => void;
}

export const AppGame = ({ cards, onFlipCard }: IGameProps) => {
  const flipCard = (id: number) => {
    onFlipCard(id);
  };
  return (
    <>
      <AppCard cards={cards} onFlipCard={flipCard} />
    </>
  );
};
