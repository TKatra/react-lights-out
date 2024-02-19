import { StateCreator } from "zustand";
import { PlayArea } from "../Shared/Interfaces/playArea";
import { SetupSlice } from "../Shared/Interfaces/State/setupSlice";
import { SetupState } from "../Shared/Interfaces/State/setupState";
import { MiscHelper } from "../Shared/miscHelper";

const initialState: SetupState = {  
  playerName: '',
  playArea: {
    xLength: 3,
    yLength: 3
  },
  isSetupValid: false
};

export const setupSlice: StateCreator<SetupSlice> = (set) => ({
  ...initialState,
  setPlayerName: (playerName: string) => {
    set((state) => ({
      ...state,
      playerName: playerName,
      isSetupValid: MiscHelper.validateSetup(playerName)
    }));
  },
  setPlayArea: (playArea: PlayArea) => {
    set((state) => ({
      ...state,
      playArea: playArea
    }));
  }
});
