import { EMPTY_STRING } from '@core/constants/strings';
import { IWordList } from '@core/models/word-list.model';

/**
 * Will return instal 2D type word list.
 *
 * @param {number} userTotalTries
 * @param {number} wordLength
 * @returns {IWordList[]} list of words.
 */
export const getInitialData = (
  userTotalTries: number,
  wordLength: number
): IWordList[] =>
  new Array(userTotalTries).fill(0).map((_, index: number) => {
    return {
      id: index,
      word: new Array(wordLength).fill(0).map((__, index2) => {
        return {
          id: `${index}${index2}`,
          letter: EMPTY_STRING,
          state: 'invalid',
        };
      }),
    };
  });
