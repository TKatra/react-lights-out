import { StateCreator } from "zustand/vanilla";
import { Coordinate } from "../Shared/Interfaces/coordinate";
import { GridSlice } from "../Shared/Interfaces/State/gridSlice";
import { GridState } from "../Shared/Interfaces/State/gridState";
import { MiscHelper } from "../Shared/miscHelper";
import { Grid } from "../Shared/Types/grid";

const initialState: GridState = {  
  initialGrid: [],
  activeGrid: [],
  isGridValid: false,
  moveList: []
};

export const gridSlice: StateCreator<GridSlice> = (set) => ({
  ...initialState,
  startNewGrid: (grid: Grid) => {
    set((state) => ({
      ...state,
      initialGrid: MiscHelper.deepCopy(grid),
      activeGrid: MiscHelper.deepCopy(grid),
      isGridValid: false,
      moveList: []
    }));
  },
  resetGrid: () => {
    set((state) => ({
      ...state,
      activeGrid: MiscHelper.deepCopy(state.initialGrid),
      isGridValid: false,
      moveList: []
    }));
  },
  updateGrid: (newGrid: Grid, isGridValid: boolean, newMoveList: Coordinate[]) => {
    set((state) => ({
      ...state,
      activeGrid: newGrid,
      isGridValid: isGridValid,
      moveList: newMoveList
    }));
  }
});
