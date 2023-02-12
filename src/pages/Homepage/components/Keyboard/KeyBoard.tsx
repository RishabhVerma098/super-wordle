import './Keyboard.scss';

import { keyboardkeys } from '@core/data/keyboard';
import { UsedKeyType } from '@core/models/used-key.model';

type PropsType = {
  usedKeys: UsedKeyType;
};

export default function KeyBoard({ usedKeys }: PropsType) {
  return (
    <div className="keyboard">
      {keyboardkeys.map((letter) => {
        return (
          <div key={letter.key} className={usedKeys[letter.key]}>
            {letter.key.toUpperCase()}
          </div>
        );
      })}
    </div>
  );
}
