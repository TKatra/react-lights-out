import { PlayArea } from "../playArea";
import { SetupState } from "./setupState";

export interface SetupSlice extends SetupState {
  setPlayerName: (playerName: string) => void;
  setPlayArea: (playArea: PlayArea) => void;
}