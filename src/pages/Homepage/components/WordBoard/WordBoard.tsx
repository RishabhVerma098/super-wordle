import './WordBoard.scss';

import { RegularExpressions } from 'core/constants/regex';
import { EMPTY_STRING, KeyStrokes } from 'core/constants/strings';
import { IBoxData } from 'core/models/box-data.interface';
import { getBoxDataArray } from 'pages/Homepage/utils/wordboard.utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import WordBox from 'shared/components/WordBox/WordBox';

type WordBoardPropsType = {
  wordLength: number;
  userTotalTries: number;
  currentWord: string;
  setNewCurrentWord: () => void;
};

export default function WordBoard({
  userTotalTries,
  wordLength,
  currentWord,
  setNewCurrentWord,
}: WordBoardPropsType) {
  // Will hold main data array for the words, 2d matrix.
  const [boxDataArray, setBoxDataArray] = useState<IBoxData[][]>(
    getBoxDataArray(userTotalTries, wordLength)
  );

  // Will hold the count the current line in the board game.
  const [currentLineNumber, setCurrentLineNumber] = useState<number>(0);

  // Will hold the current word count in a particular line.
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

  // Will set regex for string KeyA or KeyB etc.
  const isCharInBetweenAtoZRegEx = useMemo(
    () => RegularExpressions.IS_KEYSTROKE_BTW_A_Z,
    []
  );

  // Will store data that whether the game has ended or not.
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  /**
   * Will run when a key stroke happens,
   * Contains main game logic.
   *
   * @param {KeyboardEvent} event: Key, code of the current key press.
   */
  const handleUserKeyPress = ({ code, key }: KeyboardEvent) => {
    // Runs when backspace key is pressed,
    // Expect it to clear a char in a word from right.
    if (code === KeyStrokes.BACKSPACE) {
      if (currentWordIndex === 0) return;

      // Updated box data array.
      const tempBoxDataArray = boxDataArray;
      tempBoxDataArray[currentLineNumber][currentWordIndex - 1].word =
        EMPTY_STRING;
      setBoxDataArray(tempBoxDataArray);

      // Updete current word index.
      setCurrentWordIndex((prev) => prev - 1);
      return;
    }

    // Runs when enter key is pressed,
    // Expect it to go to next line when all the boxes in current line is filled.
    // When call specific funtions for win or loss.
    if (code === KeyStrokes.ENTER && currentWordIndex === wordLength) {
      const userEnteredWord = boxDataArray[currentLineNumber]
        .map((box: IBoxData) => box.word)
        .join(EMPTY_STRING);

      // TODO: Handle game win and loss modal etc.
      // Game end, User has won the game.
      if (currentWord === userEnteredWord) {
        // eslint-disable-next-line no-alert
        alert('YOU HAVE WON');
        setGameEnded(true);
        return;
      }

      // Game end, User has lost the game.
      if (currentLineNumber + 1 === userTotalTries) {
        // eslint-disable-next-line no-alert
        alert('Game Over you lost');
        setGameEnded(true);
      }

      setCurrentLineNumber((prev) => prev + 1);
      setCurrentWordIndex(0);
      return;
    }

    // Runs when keys b/w a-z are pressed,
    // Expect it to fill the current box.
    if (isCharInBetweenAtoZRegEx.test(code)) {
      if (currentWordIndex === wordLength) return;

      // Updated box data array.
      const temp = boxDataArray;
      temp[currentLineNumber][currentWordIndex].word = key;
      setBoxDataArray(temp);

      // Updete current word index.
      setCurrentWordIndex((prev) => prev + 1);
    }
  };

  /**
   * Will reset the game board,
   * All the state will be reset and new word would be calulated.
   */
  const resetGame = useCallback(() => {
    setBoxDataArray(getBoxDataArray(userTotalTries, wordLength));
    setCurrentLineNumber(0);
    setCurrentWordIndex(0);
    setGameEnded(false);
    setNewCurrentWord();
  }, [setNewCurrentWord, userTotalTries, wordLength]);

  /**
   * Will run when gameEnded boolean is changed,
   * if the game has ended then call reset the game.
   */
  useEffect(() => {
    if (gameEnded) resetGame();
  }, [gameEnded, resetGame]);

  // Assign a reference to handleUserKeyPress.
  const handleUserKeyPressRef = useRef(handleUserKeyPress);

  /**
   * Will run on every render,
   * When a render happens a new handleUserKeyPress is generated,
   * handleUserKeyPressRef need to be updated with the new reference
   * of this new function for our event listener so that the listener
   * can get new updated state variables.
   */
  useEffect(() => {
    handleUserKeyPressRef.current = handleUserKeyPress;
  });

  /**
   * Will run on initial render,
   * Adds a window listener for keyPress.
   */
  useEffect(() => {
    // Will be used to pass to listeners to attach a reference of a function.
    const currentHandleUserPress = (event: KeyboardEvent) =>
      handleUserKeyPressRef.current(event);

    window.addEventListener('keydown', currentHandleUserPress);

    // Clean up
    return () => {
      window.removeEventListener('keydown', currentHandleUserPress);
    };
  }, []);

  return (
    <div
      className="word-board"
      style={{
        gridTemplateRows: `repeat(${userTotalTries}, 1fr)`,
        gridTemplateColumns: `repeat(${wordLength}, 1fr)`,
      }}
    >
      {boxDataArray.map((boxData: IBoxData[]) =>
        boxData.map((data: IBoxData) => {
          return (
            <WordBox
              key={data.id}
              word={data.word.toUpperCase()}
              state={data.state}
            />
          );
        })
      )}
    </div>
  );
}
