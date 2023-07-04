interface ICardProps {
  cards: string[];
  onTagCard: (index: number) => void;
}

export const AppCard = ({ cards, onTagCard }: ICardProps) => {
  const handleClick = (index: number) => {
    onTagCard(index);
  };
  const html = cards.map((card, index) => (
    <div className='card' onClick={() => handleClick(index)} key={index}>
      {card}
    </div>
  ));
  return (
    <>
      <h3>hello from card</h3>
      <div className='board'>{html}</div>
    </>
  );
};
