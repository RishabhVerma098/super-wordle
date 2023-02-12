import './WordBoardGrid.scss';

import { EMPTY_STRING } from 'core/constants/strings';
import { IWordList } from 'core/models/word-list.model';

import WordBoardGridRow from '../WordBroardGridRow/WordBoardGridRow';

type PropsType = {
  userGuess: string;
  userGuessTurn: number;
  listOfUserGuess: IWordList[];
  wordLength: number;
};

function WordBoardGrid({
  userGuess,
  userGuessTurn,
  listOfUserGuess,
  wordLength,
}: PropsType) {
  return (
    <div className="word-board-grid">
      {listOfUserGuess.map((wordList: IWordList) => {
        // If the user turn value and current word list row are same then
        // the row is guess-row where is actively adding letter to the word.
        // else render and entire word in one shot with animation to reveal its state.
        return userGuessTurn === wordList.id ? (
          <WordBoardGridRow
            wordLength={wordLength}
            key={wordList.id}
            currentGuess={userGuess}
            word={[]}
          />
        ) : (
          <WordBoardGridRow
            wordLength={wordLength}
            key={wordList.id}
            currentGuess={EMPTY_STRING}
            word={wordList.word}
          />
        );
      })}
    </div>
  );
}

export default WordBoardGrid;
