import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayArea } from "../Shared/Interfaces/playArea";
import { SetupState } from "../Shared/Interfaces/State/setupState";
import { MiscHelper } from "../Shared/miscHelper";

const initialState: SetupState = {  
  playerName: '',
  playArea: {
    xLength: 3,
    yLength: 3
  },
  isValid: false
};

export const setupSlice = createSlice({
  name: 'setup',
  initialState,
  reducers : {
    setPlayerName: (state, action: PayloadAction<string>) => {
      state.playerName = action.payload;
      state.isValid = MiscHelper.validateSetup(state);
    },
    setPlayArea: (state, action: PayloadAction<PlayArea>) => {
      state.playArea = action.payload;
    }
  },
  selectors: {
    selectPlayerName: setup => setup.playerName,
    selectPlayArea: setup => setup.playArea,
    selectIsSetupValid: setup => setup.isValid
  }
});

export const { setPlayerName, setPlayArea } = setupSlice.actions;
export const { selectPlayerName, selectPlayArea, selectIsSetupValid } = setupSlice.selectors
export default setupSlice.reducer;
