import { Card } from '../models/Card';
import { AppCard } from './AppCard';

interface IGameProps {
  cards: Card[];
  turns: number;
  onFlipCard: (name: string, id: number) => void;
  onQuitGame: () => void;
}

export const AppGame = ({
  cards,
  onFlipCard,
  onQuitGame,
  turns,
}: IGameProps) => {
  const flipCard = (name: string, id: number) => {
    onFlipCard(name, id);
  };

  const handleClick = () => {
    onQuitGame();
  };
  return (
    <>
      <p>Antal försök {turns}</p>
      <AppCard cards={cards} onFlipCard={flipCard} />
      <button onClick={handleClick}>Avsluta</button>
    </>
  );
};
