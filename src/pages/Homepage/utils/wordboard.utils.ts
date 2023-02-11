import { EMPTY_STRING } from 'core/constants/strings';
import { IBoxData } from 'core/models/box-data.interface';

/**
 * Will return box data array for intial render setup.
 *
 * @param {number} userTotalTries
 * @param {number} wordLength
 * @returns {IBoxData[][]} boxDataArray
 */
export const getBoxDataArray = (
  userTotalTries: number,
  wordLength: number
): IBoxData[][] => {
  const boxDataArray: IBoxData[][] = [];

  for (let i = 0; i < userTotalTries; i += 1) {
    const tempBoxArr: IBoxData[] = [];
    for (let j = 0; j < wordLength; j += 1) {
      const boxData: IBoxData = {
        id: `${i}${j}`,
        word: EMPTY_STRING,
        state: 'invalid',
      };
      tempBoxArr.push(boxData);
    }
    boxDataArray.push(tempBoxArr);
  }
  return boxDataArray;
};
