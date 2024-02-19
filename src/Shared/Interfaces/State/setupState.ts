import { PlayArea } from "../playArea";

export interface SetupState {
  playerName: string;
  playArea: PlayArea;
  isSetupValid: boolean;
}