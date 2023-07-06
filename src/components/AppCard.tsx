import { Card } from '../models/Card';

interface IGameProps {
  cards: Card[];
}

export const AppCard = ({ cards }: IGameProps) => {
  const handleClick = (index: number) => {
    console.log(index);
  };

  const html = cards.map((card, index) => (
    <div key={index}>
      {card.isClicked && (
        <img src={card.name} className='card' height={300} width={250} />
      )}
      {!card.isClicked && (
        <img
          onClick={() => handleClick(index)}
          src='/img/logo.png'
          className='card'
          height={300}
          width={250}
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
