export interface Timer {
  show: boolean;
  active: boolean;
  start: number;
  end: number;
  id?: NodeJS.Timer;
}
