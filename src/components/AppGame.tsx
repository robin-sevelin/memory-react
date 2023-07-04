import { AppCard } from './AppCard';

interface IGameProps {
  cards: string[];
  onTagCard: (index: number) => void;
}

export const AppGame = ({ cards, onTagCard }: IGameProps) => {
  const tagCard = (index: number) => {
    onTagCard(index);
  };
  return (
    <>
      <h2>hello from game</h2>
      <AppCard cards={cards} onTagCard={tagCard} />
    </>
  );
};
