import './Gameboard.scss';

import { GameConfig } from 'core/constants/config';
import WordBoard from 'pages/Homepage/components/WordBoard/WordBoard';

function Gameboard() {
  const wordLength: number = GameConfig.WORD_LENGTH;
  const userTotalTries: number = GameConfig.USER_TOTAL_TRIES;

  return (
    <div className="homepage">
      <WordBoard wordLength={wordLength} userTotalTries={userTotalTries} />
    </div>
  );
}

export default Gameboard;
