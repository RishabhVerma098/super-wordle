import { RegularExpressions } from 'core/constants/regex';
import { EMPTY_STRING, KeyStrokes, UserError } from 'core/constants/strings';
import { ILetterData, LetterStateType } from 'core/models/letter-data.model';
import { UsedKeyType } from 'core/models/used-key.model';
import { IWordList } from 'core/models/word-list.model';
import { getInitialData } from 'core/utils/wordle.util';
import { useState } from 'react';

type PropsType = {
  userTotalTries: number;
  wordLength: number;
  dictionaryWord: string;
  handleShowAlert: (show: boolean, message: string) => void;
};

const useWordle = ({
  userTotalTries,
  wordLength,
  dictionaryWord,
  handleShowAlert,
}: PropsType) => {
  // Will hold user guess like "blame" or "bird" or "b" etc.
  const [userGuess, setUserGuess] = useState<string>(EMPTY_STRING);

  // Will hold user tries.
  const [userGuessTurn, setUserGuessTurn] = useState<number>(0);

  // Will hold user win or loss status.
  const [userVictory, setUserVictory] = useState<boolean>(false);

  // Will hold all user guessed words in a list.
  const [guessedWordsHistory, setGuessedWordsHistory] = useState<string[]>([]);

  // Will hold user guesses in a 2d format.
  const [listOfUserGuess, setlistOfUserGuess] = useState<IWordList[]>(
    getInitialData(userTotalTries, wordLength)
  );

  // Keeps track of the used key with there state.
  // format: {a: 'grey', b: 'green', c: 'yellow'} etc
  const [usedKeys, setUsedKeys] = useState<UsedKeyType>({});

  /**
   * Will set user guess when a-z keys are pressed.
   *
   * @param {string} keyStroke : entered key
   */
  const userPressAToZKey = (keyStroke: string) => {
    if (userGuess.length === wordLength) return;

    setUserGuess((prev) => prev + keyStroke);
  };

  /**
   * Will remove last element in the user guess.
   */
  const userPressBackspace = () => setUserGuess((prev) => prev.slice(0, -1));

  /**
   * Will return the letter box state for animation.
   *
   * @param {string} letter : current letter in a word.
   * @param {number} position : current position off the letter passed.
   * @returns {LetterStateType} 'correct' | 'close' | 'wrong'
   */
  const getLetterState = (
    letter: string,
    position: number
  ): LetterStateType => {
    if (letter === dictionaryWord[position]) return 'correct';

    if (dictionaryWord.includes(letter)) return 'close';

    return 'wrong';
  };

  /**
   * Will return letter data list forming a word,
   * inclusive of the letter state changes.
   *
   * @returns {ILetterData[]} list of letter data objects.
   */
  const getFormattedGuess = (): ILetterData[] =>
    listOfUserGuess[userGuessTurn].word.map(
      (letter: ILetterData, index: number) => {
        const guess: string = userGuess[index];
        return {
          ...letter,
          letter: guess,
          state: getLetterState(guess, index),
        };
      }
    );

  /**
   * Will run the user press enter,
   * Will check is the endered guess valid,
   * if yes then update the component state.
   */
  const userPressEnter = () => {
    // If user has finshed its turns return.
    if (userGuessTurn === userTotalTries) return;

    // If user entered word less than required.
    if (userGuess.length < wordLength) {
      handleShowAlert(true, UserError.WORD_LENGTH);
      return;
    }

    // If user entered word which he previously tried.
    if (guessedWordsHistory.includes(userGuess)) {
      handleShowAlert(true, UserError.WORD_ALREADY_PRESENT);
      return;
    }

    const formattedword: ILetterData[] = getFormattedGuess();

    // Update user guesses.
    setlistOfUserGuess((prevGuesses: IWordList[]) => {
      const newGuesses: IWordList[] = [...prevGuesses];
      newGuesses[userGuessTurn] = {
        ...newGuesses[userGuessTurn],
        word: formattedword,
      };
      return newGuesses;
    });

    // Update used keys.
    setUsedKeys((prev) => {
      const prevKeys = { ...prev };

      formattedword.forEach((letter: ILetterData) => {
        prevKeys[letter.letter] = letter.state;
        return letter;
      });

      return prevKeys;
    });

    setGuessedWordsHistory((prev) => [...prev].concat(userGuess));
    setUserGuessTurn((prev) => prev + 1);

    // If user gussed the word correctly then he wins.
    if (userGuess === dictionaryWord) setUserVictory(true);

    // Reset Guess.
    setUserGuess(EMPTY_STRING);
  };

  /**
   * Will intiate task according to user input.
   *
   * @param {KeyboardEvent} {key} : user entered key stroke
   */
  const handleUserKeyPress = ({ key }: KeyboardEvent) => {
    // User Press enter
    if (key === KeyStrokes.ENTER) {
      userPressEnter();
      return;
    }

    // User Press backspace
    if (key === KeyStrokes.BACKSPACE) {
      userPressBackspace();
      return;
    }

    // User Press letter from a-z
    if (RegularExpressions.IS_KEYSTROKE_BTW_A_Z.test(key))
      userPressAToZKey(key);
  };

  return {
    userGuess,
    userGuessTurn,
    userVictory,
    listOfUserGuess,
    usedKeys,
    handleUserKeyPress,
  };
};

export default useWordle;
