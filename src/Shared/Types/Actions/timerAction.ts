import { TimerActionType } from "../../Enum/Actions/TimerActionType";

export type TimerAction = 
  | {type: TimerActionType.StartTimer, payload: number}
  | {type: TimerActionType.UpdateTimer, payload: number}
  | {type: TimerActionType.SetTimerId, payload: NodeJS.Timer}
  | {type: TimerActionType.StopTimer, payload: number}
  | {type: TimerActionType.HideTimer};