import { Coordinate } from "../coordinate";

export interface GameOverProps {
  show: boolean;
  timerStringMs: string;
  moveList: Coordinate[];
  onStartNewGame: onStartNewGameFunc;
  onResetGame: onResetGameFunc;
}

interface onStartNewGameFunc {
  (): void
}

interface onResetGameFunc {
  (): void
}