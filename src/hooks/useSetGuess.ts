import { useEffect } from 'react';

export const useSetGuess = (
  guessOne: string,
  guessTwo: string,
  checkGuess: () => void
) => {
  useEffect(() => {
    if (guessOne && guessTwo) {
      checkGuess();
    }
  });
};
