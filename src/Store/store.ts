import { create } from "zustand";
import { GridSlice } from "../Shared/Interfaces/State/gridSlice";
import { SetupSlice } from "../Shared/Interfaces/State/setupSlice";
import { TimerSlice } from "../Shared/Interfaces/State/timerSlice";
import { gridSlice } from "../Slices/gridSlice";
import { setupSlice } from "../Slices/setupSlice";
import { timerSlice } from "../Slices/timerSlice";

export const useBoundStore = create<GridSlice & SetupSlice & TimerSlice>()((...a) => ({
  ...gridSlice(...a),
  ...setupSlice(...a),
  ...timerSlice(...a)
}));
