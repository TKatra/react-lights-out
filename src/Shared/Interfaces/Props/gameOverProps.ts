import { Coordinate } from "../coordinate";
import { Timer } from "../timer";

export interface GameOverProps {
  show: boolean;
  timer: Timer;
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