import { Coordinate } from "../coordinate";
import { TimerState } from "../State/timerState";

export interface GameOverProps {
  show: boolean;
  timer: TimerState;
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