import { Phase } from "../../Enum/gamePhase";
import { Setup } from "../gameSetup";
import { Statistics } from "../statistics";

export interface AppState {
  setup: Setup;
  phase: Phase;
  initialGrid: boolean[][];
  activeGrid: boolean[][];
  isGridValid: boolean;
  showtimer: boolean;
  statistics: Statistics;
}