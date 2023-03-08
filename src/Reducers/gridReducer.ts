import { GridActionType } from "../Shared/Enum/Actions/GridActionType";
import { GridState } from "../Shared/Interfaces/State/gridState";
import { MiscHelper } from "../Shared/miscHelper";
import { GridAction } from "../Shared/Types/Actions/gridAction";

export const initialGridState: GridState = {  
  initialGrid: [],
  activeGrid: [],
  isGridValid: false,
  moveList: []
};

export function gridReducer(state: GridState, action: GridAction): GridState {
  switch (action.type) {
    case GridActionType.StartNewGrid:
      return {
        initialGrid: MiscHelper.deepCopy(action.payload),
        activeGrid: MiscHelper.deepCopy(action.payload),
        isGridValid: false,
        moveList: []
      };
    case GridActionType.ResetGrid:
      return {
        ...state,
        activeGrid: MiscHelper.deepCopy(state.initialGrid),
        isGridValid: false,
        moveList: []
      };
    case GridActionType.UpdateGrid:
      return {
        ...state,
        activeGrid: action.payload.newGrid,
        isGridValid: action.payload.isGridValid,
        moveList: action.payload.newMoveList
      };
  }
}