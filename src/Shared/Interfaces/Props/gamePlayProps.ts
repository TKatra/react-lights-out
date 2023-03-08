import { Grid } from "../../Types/grid";
import { Coordinate } from "../coordinate";
import { SetupState } from "../State/setupState";

export interface GamePlayProps {
  setup: SetupState;
  grid: Grid;
  isGridValid: boolean;
  onGridClick: setActiveGridFunc;
}

interface setActiveGridFunc {
  (newGrid: Coordinate): void;
}