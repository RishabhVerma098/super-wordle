import './Gameboard.scss';

import { GameConfig } from 'core/constants/config';
import data from 'core/data/dictionary.json';
import useWordle from 'core/hooks/useWordle';
import { IDictonaryWord } from 'core/models/dictionary-word.model';
import { randomIntFromInterval } from 'core/utils/common.util';
import WordBoardGrid from 'pages/Homepage/components/WordBoardGrid/WordBoardGrid';
import { useEffect, useMemo } from 'react';

function Gameboard() {
  // Total word length (cols).
  const wordLength: number = GameConfig.WORD_LENGTH;

  // Total user tries (rows).
  const userTotalTries: number = GameConfig.USER_TOTAL_TRIES;

  // Some mock data from json, having english 5 letter words.
  const dictonaryWords = data as IDictonaryWord[];

  // Current word randomly picked from words dictionary.
  const currentWord: string = useMemo(() => {
    return dictonaryWords[randomIntFromInterval(0, dictonaryWords.length)].word;
  }, [dictonaryWords]);

  // Get all the response of useWordle hook.
  const {
    userGuess,
    userGuessTurn,
    userVictory,
    listOfUserGuess,
    handleUserKeyPress,
  } = useWordle({
    userTotalTries,
    wordLength,
    dictionaryWord: currentWord,
  });

  /**
   * Will initial event listner here to listen to keyboard events,
   * Will open win or loss modals accordingly.
   */
  useEffect(() => {
    window.addEventListener('keyup', handleUserKeyPress);

    // TODO: Add modal opening here.
    if (userVictory) {
      window.removeEventListener('keyup', handleUserKeyPress);
    }

    // TODO: Add modal opening here.
    if (userGuessTurn > userTotalTries - 1) {
      window.removeEventListener('keyup', handleUserKeyPress);
    }

    return () => window.removeEventListener('keyup', handleUserKeyPress);
  }, [handleUserKeyPress, userGuessTurn, userTotalTries, userVictory]);

  return (
    <div className="homepage">
      <WordBoardGrid
        userGuess={userGuess}
        userGuessTurn={userGuessTurn}
        listOfUserGuess={listOfUserGuess}
        wordLength={wordLength}
      />
    </div>
  );
}

export default Gameboard;
