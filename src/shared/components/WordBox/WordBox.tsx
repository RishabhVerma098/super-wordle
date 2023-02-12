import './WordBox.scss';

import WordBoxClassNames from 'shared/constants/strings';

export type WordBoxPropsStateType = 'invalid' | 'correct' | 'close' | 'wrong';

export type WordBoxPropsType = {
  word: string;
  state: WordBoxPropsStateType;
};

export default function WordBox({ word, state }: WordBoxPropsType) {
  /**
   * Will return box classname based on the box state.
   *
   * @returns {string} className for the box variant.
   */
  const getBoxColor = () => {
    switch (state) {
      case 'wrong':
        return WordBoxClassNames.WRONG;
      case 'correct':
        return WordBoxClassNames.GREEN;
      case 'close':
        return WordBoxClassNames.YELLOW;
      default:
        return WordBoxClassNames.TRANSPARENT;
    }
  };

  return (
    <div className={`word-box word-box-${getBoxColor()}`}>
      <p>{word}</p>
    </div>
  );
}
