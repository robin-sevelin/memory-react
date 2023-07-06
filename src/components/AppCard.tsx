import { Card } from '../models/Card';

interface IGameProps {
  cards: Card[];
  onFlipCard: (id: number) => void;
}

export const AppCard = ({ cards, onFlipCard }: IGameProps) => {
  const handleClick = (id: number) => {
    onFlipCard(id);
  };

  const html = cards.map((card) => (
    <div key={card.id}>
      {card.isClicked && <img src={card.name} className='card' />}
      {!card.isClicked && (
        <div className='card' onClick={() => handleClick(card.id)}></div>
      )}
    </div>
  ));
  return (
    <>
      <div className='board'>{html}</div>
    </>
  );
};
