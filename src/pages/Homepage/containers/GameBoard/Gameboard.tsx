import './Gameboard.scss';

import { GameConfig } from 'core/constants/config';
import data from 'core/data/dictonary.json';
import { randomIntFromInterval } from 'core/utils/utils';
import WordBoard from 'pages/Homepage/components/WordBoard/WordBoard';
import { useState } from 'react';

function Gameboard() {
  // Total word length (cols).
  const wordLength: number = GameConfig.WORD_LENGTH;

  // Total user tries (rows).
  const userTotalTries: number = GameConfig.USER_TOTAL_TRIES;

  // Some mock data from json, having english 5 letter words.
  const dictonaryWords = data as string[];

  // Stores the current word in play.
  const [currentWord, setCurrentWord] = useState<string>(
    dictonaryWords[randomIntFromInterval(0, dictonaryWords.length)]
  );

  /**
   * Will get new random word from dictornary and set it as current.
   */
  const setNewWord = () =>
    setCurrentWord(
      dictonaryWords[randomIntFromInterval(0, dictonaryWords.length)]
    );

  return (
    <div className="homepage">
      <WordBoard
        wordLength={wordLength}
        userTotalTries={userTotalTries}
        currentWord={currentWord}
        setNewCurrentWord={setNewWord}
      />
    </div>
  );
}

export default Gameboard;
