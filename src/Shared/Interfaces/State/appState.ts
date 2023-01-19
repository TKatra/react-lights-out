import { Phase } from "../../Enum/gamePhase";
import { Setup } from "../gameSetup";

export interface AppState {
  setup: Setup;
  phase: Phase;
  initialGrid: boolean[][];
  activeGrid: boolean[][];
  isGridValid: boolean;
}