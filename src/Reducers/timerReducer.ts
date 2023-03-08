import { TimerActionType } from "../Shared/Enum/Actions/TimerActionType";
import { TimerState } from "../Shared/Interfaces/State/timerState";
import { TimerAction } from "../Shared/Types/Actions/timerAction";

export const initialTimerState: TimerState = {  
  active: false,
  show: false,
  start: 0,
  end: 0
};

export function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case TimerActionType.StartTimer:
      return {
        ...state,
        show: true,
        active: true,
        start: action.payload,
        end: action.payload
      };
    case TimerActionType.UpdateTimer:
      return {
        ...state,
        end: action.payload
      };
    case TimerActionType.SetTimerId:
      return {
        ...state,
        id: action.payload
      };
    case TimerActionType.StopTimer:
      return {
        ...state,
        active: false,
        end: action.payload
      };
    case TimerActionType.HideTimer:
      return {
        ...state,
        active: false,
        show: false
      };
  }
}