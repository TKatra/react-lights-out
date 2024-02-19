import { TimerState } from "../State/timerState";

export interface TimerSlice extends TimerState {
  startTimer: () => void;
  updateTimer: () => void;
  stopTimer: () => void;
  hideTimer: () => void;
  getTimerString: () => string;
  getTimerStringWithMs: () => string;
}
