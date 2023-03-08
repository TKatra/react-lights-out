export interface TimerState {
  show: boolean;
  active: boolean;
  start: number;
  end: number;
  id?: NodeJS.Timer;
}
