import './WordBoardGridRow.scss';

import { EMPTY_STRING } from 'core/constants/strings';
import { ILetterData } from 'core/models/letter-data.model';

type WordBoardGridRowPropsType = {
  word: ILetterData[];
  currentGuess: string;
  wordLength: number;
  userError: boolean;
};

type LetterListType = Omit<ILetterData, 'state'>;

function WordBoardGridRow({
  word,
  currentGuess,
  wordLength,
  userError,
}: WordBoardGridRowPropsType) {
  /**
   * Will return list of letter with ids,
   * for the guessed string.
   *
   * @returns {LetterListType[]} list of letters
   */
  const getGuessLetterList = (): LetterListType[] => {
    const tempCurrentWord = currentGuess.split(EMPTY_STRING);

    return new Array(wordLength).fill(0).map((_, index) => {
      return {
        id: index.toString(),
        letter: tempCurrentWord.shift() ?? EMPTY_STRING,
      };
    });
  };

  // If the currentGuess is defined (when user is adding letters to word).
  if (currentGuess) {
    return (
      <div
        className={`word-board-grid-guess-row ${
          userError ? 'shake-row' : EMPTY_STRING
        }`}
      >
        {getGuessLetterList().map((letter: LetterListType) => (
          <div
            key={letter.id}
            className={letter.letter ? 'filled' : EMPTY_STRING}
          >
            {letter.letter.toUpperCase()}
          </div>
        ))}
      </div>
    );
  }

  // If the word is defined and it contains data (when user has pressed enter).
  if (word[0] && word[0].letter) {
    return (
      <div className="word-board-grid-row">
        {word.map((letter: ILetterData) => (
          <div key={letter.id} className={letter.state}>
            {letter.letter.toUpperCase()}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="word-board-grid-row">
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}

export default WordBoardGridRow;
