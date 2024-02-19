import { StateCreator } from "zustand";
import { TimerSlice } from "../Shared/Interfaces/Slice/timerSlice";
import { TimerState } from "../Shared/Interfaces/State/timerState";
import { MiscHelper } from "../Shared/miscHelper";

const initialState: TimerState = {  
  isTimerActive: false,
  isTimerShown: false,
  start: 0,
  end: 0
};

export const timerSlice: StateCreator<TimerSlice> = (set, get) => ({
  ...initialState,
  startTimer: () => {
    const startTime = Date.now();

    set((state) => ({
      ...state,
      isTimerShown: true,
      isTimerActive: true,
      start: startTime,
      end: startTime
    }));
  },
  updateTimer: () => {
    const currentTime = Date.now();

    set((state) => ({
      ...state,
      end: currentTime
    }));
  },
  stopTimer: () => {
    const currentTime = Date.now();

    set((state) => ({
      ...state,
      isTimerActive: false,
      end: currentTime
    }));
  },
  hideTimer: () => {
    set((state) => ({
      ...state,
      isTimerActive: false,
      isTimerShown: false
    }));
  },
  getTimerString: () => MiscHelper.timerToString(get().start, get().end),
  getTimerStringWithMs: () => MiscHelper.timerToString(get().start, get().end, true)
});
