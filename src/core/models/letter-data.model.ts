export type LetterStateType = 'correct' | 'wrong' | 'close' | 'invalid';

export interface ILetterData {
  id: string;
  letter: string;
  state: LetterStateType;
}
