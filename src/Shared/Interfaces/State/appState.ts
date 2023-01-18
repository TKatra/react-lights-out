import { Phase } from "../../Enum/gamePhase";
import { Setup } from "../gameSetup";

export interface AppState {
  setup: Setup;
  phase: Phase;
  grid: boolean[][];
}