import './Gameboard.scss';

import { GameConfig } from '@core/constants/config';
import { EMPTY_STRING } from '@core/constants/strings';
import useWordle from '@core/hooks/useWordle';
import data from '@core/mocks/dictionary.json';
import { IAlert } from '@core/models/alert.model';
import { IDictonaryWord } from '@core/models/dictionary-word.model';
import { randomIntFromInterval } from '@core/utils/common.util';
import { Alert, Snackbar } from '@mui/material';
import GameEndModal from '@pages/Homepage/components/GameEndModal/GameEndModal';
import KeyBoard from '@pages/Homepage/components/Keyboard/KeyBoard';
import WordBoardGrid from '@pages/Homepage/components/WordBoardGrid/WordBoardGrid';
import { useEffect, useMemo, useState } from 'react';

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

  // Will hold modal visibility.
  const [showModal, setShowModal] = useState<boolean>(false);

  // Will hold alert visibility.
  const [showAlert, setShowAlert] = useState<IAlert>({
    show: false,
    message: EMPTY_STRING,
  });

  /**
   * Will open or close alert.
   *
   * @param {boolean} show : true then alert will be shown
   * @param {string} message : message in alert
   * @returns
   */
  const handleShowAlert = (show: boolean, message: string) =>
    setShowAlert({ show, message });

  // Get all the response of useWordle hook.
  const {
    userGuess,
    userGuessTurn,
    userVictory,
    listOfUserGuess,
    usedKeys,
    handleUserKeyPress,
  } = useWordle({
    userTotalTries,
    wordLength,
    handleShowAlert,
    dictionaryWord: currentWord,
  });

  /**
   * Will initial event listner here to listen to keyboard events,
   * Will open win or loss modals accordingly.
   */
  useEffect(() => {
    window.addEventListener('keyup', handleUserKeyPress);

    // User win or lose open game end modal.
    if (userVictory || userGuessTurn > userTotalTries - 1) {
      setTimeout(() => setShowModal(true), 1000);
      window.removeEventListener('keyup', handleUserKeyPress);
    }

    return () => window.removeEventListener('keyup', handleUserKeyPress);
  }, [handleUserKeyPress, userGuessTurn, userTotalTries, userVictory]);

  return (
    <div className="homepage">
      <h1>Super Wordle</h1>
      <WordBoardGrid
        userGuess={userGuess}
        userGuessTurn={userGuessTurn}
        listOfUserGuess={listOfUserGuess}
        wordLength={wordLength}
        userError={showAlert.show}
      />
      <KeyBoard usedKeys={usedKeys} />
      {showModal && <GameEndModal win={userVictory} word={currentWord} />}
      {showAlert.show && (
        <Snackbar
          open={showAlert.show}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={() => handleShowAlert(false, EMPTY_STRING)}
        >
          <Alert severity="info">{showAlert.message}</Alert>
        </Snackbar>
      )}
    </div>
  );
}

export default Gameboard;
