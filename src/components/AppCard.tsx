import { Card } from '../models/Card';

interface IGameProps {
  cards: Card;
  index: number;

  onFlipCard: (card: Card, index: number) => void;
}

export const AppCard = ({ cards, index, onFlipCard }: IGameProps) => {
  const handleClick = (card: Card, index: number) => {
    onFlipCard(card, index);
  };

  return (
    <>
      {cards.isFlipped || cards.isMatch ? (
        <img src={cards.img} alt='card front' className='card' />
      ) : (
        <img
          src='/img/SuperMushroom_-_2D_art.svg'
          alt='card back'
          className='card'
          onClick={() => handleClick(cards, index)}
        />
      )}
    </>
  );
};
