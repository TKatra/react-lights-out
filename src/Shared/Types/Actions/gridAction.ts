import { GridActionType } from "../../Enum/Actions/GridActionType";
import { Coordinate } from "../../Interfaces/coordinate";
import { Grid } from "../grid";

export type GridAction = 
  | {type: GridActionType.StartNewGrid, payload: Grid}
  | {type: GridActionType.ResetGrid}
  | {type: GridActionType.UpdateGrid, payload: {
      newGrid: Grid,
      isGridValid: boolean,
      newMoveList: Coordinate[]
    }};