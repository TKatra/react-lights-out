import { Grid } from "../../Types/grid";
import { Coordinate } from "../coordinate";
import { GridState } from "../State/gridState";

export interface GridSlice extends GridState {
  startNewGrid: (grid: Grid) => void;
  resetGrid: () => void;
  updateGrid: (newGrid: Grid, isGridValid: boolean, newMoveList: Coordinate[]) => void;
}