import { Card } from '../models/Card';
import { AppCard } from './AppCard';

interface IGameProps {
  cards: Card[];
}

export const AppGame = ({ cards }: IGameProps) => {
  return (
    <>
      <AppCard cards={cards} />
    </>
  );
};
