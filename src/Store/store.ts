import { create } from "zustand";
import { GridSlice } from "../Shared/Interfaces/Slice/gridSlice";
import { PhaseSlice } from "../Shared/Interfaces/Slice/phaseSlice";
import { SetupSlice } from "../Shared/Interfaces/Slice/setupSlice";
import { TimerSlice } from "../Shared/Interfaces/Slice/timerSlice";
import { gridSlice } from "../Slices/gridSlice";
import { phaseSlice } from "../Slices/phaseSlice";
import { setupSlice } from "../Slices/setupSlice";
import { timerSlice } from "../Slices/timerSlice";

export const useBoundStore = create<PhaseSlice & GridSlice & SetupSlice & TimerSlice>()((...a) => ({
  ...phaseSlice(...a),
  ...gridSlice(...a),
  ...setupSlice(...a),
  ...timerSlice(...a)
}));
