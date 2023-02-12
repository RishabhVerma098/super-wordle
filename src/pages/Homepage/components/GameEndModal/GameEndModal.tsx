import './GameEndModal.scss';

import { Button } from '@mui/material';
import Modal from '@shared/components/Modal/Modal';

type PropsType = {
  win: boolean;
  word: string;
};

function GameEndModal({ win, word }: PropsType) {
  /**
   * Will refresh page when modal closes.
   */
  const onClose = () => window.location.reload();

  return (
    <Modal open onClose={onClose} style={{ backgroundColor: '#b4a5a5' }}>
      <div className="game-end-wrapper">
        <h1>You have {win ? 'WON' : 'LOST'} !!</h1>
        <h3>Word was {word.toUpperCase()}</h3>
        <Button variant="outlined" onClick={() => onClose()} color="error">
          Refresh
        </Button>
      </div>
    </Modal>
  );
}

export default GameEndModal;
