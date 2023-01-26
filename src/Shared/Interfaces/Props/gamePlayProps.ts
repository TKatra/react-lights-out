import { Coordinate } from "../coordinate";
import { Setup } from "../gameSetup";

export interface GamePlayProps {
  setup: Setup;
  grid: boolean[][];
  isGridValid: boolean;
  onGridClick: setActiveGridFunc;
}

interface setActiveGridFunc {
  (newGrid: Coordinate): void;
}