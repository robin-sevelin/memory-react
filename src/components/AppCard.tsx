import { Card } from '../models/Card';

interface IGameProps {
  cards: Card[];

  onFlipCard: (card: Card, index: number) => void;
}

export const AppCard = ({ cards, onFlipCard }: IGameProps) => {
  const handleClick = (card: Card, index: number) => {
    onFlipCard(card, index);
  };

  const html = cards.map((card, index) => (
    <div key={index}>
      {card.isFlipped || card.isMatch ? (
        <img src={card.img} alt='card front' className='card' />
      ) : (
        <img
          src='/img/SuperMushroom_-_2D_art.svg'
          alt='card back'
          className='card'
          onClick={() => handleClick(card, index)}
        />
      )}
    </div>
  ));
  return (
    <>
      <div className='board'>{html}</div>
    </>
  );
};
