import { Phase } from "../../Enum/gamePhase";
import { Coordinate } from "../coordinate";
import { Setup } from "../gameSetup";
import { Timer } from "../timer";

export interface AppState {
  setup: Setup;
  phase: Phase;
  initialGrid: boolean[][];
  activeGrid: boolean[][];
  isGridValid: boolean;
  timer: Timer;
  moveList: Coordinate[];
}