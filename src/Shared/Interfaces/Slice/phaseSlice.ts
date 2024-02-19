import { Phase } from "../../Enum/gamePhase";
import { PhaseState } from "../State/phaseState";

export interface PhaseSlice extends PhaseState {
  setPhase: (phase: Phase) => void;
}
