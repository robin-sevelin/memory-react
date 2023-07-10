import { Card } from '../models/Card';

interface IGameProps {
  cards: Card[];
  onFlipCard: (name: string, id: number) => void;
}

export const AppCard = ({ cards, onFlipCard }: IGameProps) => {
  const handleClick = (name: string, id: number) => {
    onFlipCard(name, id);
  };

  const html = cards.map((card) => (
    <div key={card.id}>
      {card.isFlipped ||
        (card.isMatch && <img src={card.name} alt='' className='card-front' />)}

      <img
        src='/public/img/SuperMushroom_-_2D_art.svg'
        alt=''
        className='card-back'
        onClick={() => handleClick(card.name, card.id)}
      />
    </div>
  ));
  return (
    <>
      <div className='board'>{html}</div>
    </>
  );
};
