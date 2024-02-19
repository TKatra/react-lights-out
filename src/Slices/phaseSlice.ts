import { StateCreator } from "zustand";
import { Phase } from "../Shared/Enum/gamePhase";
import { PhaseSlice } from "../Shared/Interfaces/Slice/phaseSlice";
import { PhaseState } from "../Shared/Interfaces/State/phaseState";

const initialState: PhaseState = {  
  currentPhase: Phase.Setup
};

export const phaseSlice: StateCreator<PhaseSlice> = (set) => ({
  ...initialState,
  setPhase: (phase: Phase) => {
    set((state) => ({
      ...state,
      currentPhase: phase
    }));
  }
});
