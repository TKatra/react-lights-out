import { Grid } from "../../Types/grid";
import { Coordinate } from "../coordinate";

export interface GridState {
  initialGrid: Grid;
  activeGrid: Grid;
  isGridValid: boolean;
  moveList: Coordinate[];
}