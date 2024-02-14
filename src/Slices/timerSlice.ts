import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TimerState } from "../Shared/Interfaces/State/timerState";
import { MiscHelper } from "../Shared/miscHelper";

const initialState: TimerState = {  
  active: false,
  show: false,
  start: 0,
  end: 0,
  id: undefined
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers : {
    setTimerId: (state, action: PayloadAction<NodeJS.Timer>) => {
      state.id = action.payload;
    },
    startTimer: (state, action: PayloadAction<number>) => {
      state.show = true;
      state.active = true;
      state.start = action.payload;
      state.end = action.payload;
    },
    updateTimer: (state, action: PayloadAction<number>) => {
      state.end = action.payload;
    },
    stopTimer: (state, action: PayloadAction<number>) => {
      state.active = false;
      state.end = action.payload;
    },
    hideTimer: (state) => {
      state.active = false;
      state.show = false;
    }
  },
  selectors: {
    selectTimerString: timer => MiscHelper.timerToString(timer.start, timer.end),
    selectTimerStringIncludeMs: timer => MiscHelper.timerToString(timer.start, timer.end, true),
    selectIsTimerActive: timer => timer.active,
    selectIsTimerShown: timer => timer.show
  }
});

export const { setTimerId, startTimer, updateTimer, stopTimer, hideTimer } = timerSlice.actions;
export const { selectTimerString, selectTimerStringIncludeMs, selectIsTimerActive, selectIsTimerShown } = timerSlice.selectors
export default timerSlice.reducer;
