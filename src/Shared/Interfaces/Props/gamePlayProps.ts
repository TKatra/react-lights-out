import { Grid } from "../../Types/grid";
import { Coordinate } from "../coordinate";

export interface GamePlayProps {
  grid: Grid;
  isGridValid: boolean;
  onGridClick: setActiveGridFunc;
}

interface setActiveGridFunc {
  (newGrid: Coordinate): void;
}