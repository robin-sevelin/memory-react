import { useState } from 'react';
import { Game } from '../models/Game';
import { AppGame } from './AppGame';

export const AppMain = () => {
  const [game, setGame] = useState<Game>(new Game(['', '', '', ''], false));

  const handleClick = () => {
    setGame((prevGame) => ({
      ...prevGame,
      gameOver: true,
    }));
  };

  const tagCard = (index: number) => {
    const clickedCard = [...game.cards];
    clickedCard[index] = index.toString();

    setGame((prevGame) => ({
      ...prevGame,
      cards: clickedCard,
    }));
  };

  return (
    <main>
      <h2>main section</h2>
      <AppGame cards={game.cards} onTagCard={tagCard} />
      <button onClick={handleClick}>avsluta spelet</button>
      {game.gameOver && <p>spelet är slut</p>}
    </main>
  );
};
