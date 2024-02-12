import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coordinate } from "../Shared/Interfaces/coordinate";
import { GridState } from "../Shared/Interfaces/State/gridState";
import { MiscHelper } from "../Shared/miscHelper";
import { Grid } from "../Shared/Types/grid";

const initialState: GridState = {  
  initialGrid: [],
  activeGrid: [],
  isGridValid: false,
  moveList: []
};

export const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers : {
    startNewGrid: (state, action: PayloadAction<Grid>) => {
      state.initialGrid = MiscHelper.deepCopy(action.payload);
      state.activeGrid = MiscHelper.deepCopy(action.payload);
      state.isGridValid = false;
      state.moveList = [];
    },
    resetGrid: (state) => {
      state.activeGrid = MiscHelper.deepCopy(state.initialGrid);
      state.isGridValid = false;
      state.moveList = [];
    },
    updateGrid: (state, action: PayloadAction<{newGrid: Grid, isGridValid: boolean, newMoveList: Coordinate[]}>) => {
      state.activeGrid = action.payload.newGrid;
      state.isGridValid = action.payload.isGridValid;
      state.moveList = action.payload.newMoveList;
    }
  },
  selectors: {
    selectActiveGrid: grid => grid.activeGrid,
    selectIsGridValid: grid => grid.isGridValid,
    selectMoveList: grid => grid.moveList
  }
});

export const { startNewGrid, resetGrid, updateGrid } = gridSlice.actions;
export const { selectIsGridValid, selectMoveList, selectActiveGrid } = gridSlice.selectors
export default gridSlice.reducer;
