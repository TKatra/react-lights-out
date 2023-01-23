import { PlayArea } from "./playArea";

export interface Setup {
  playerName: string;
  playArea: PlayArea;
  isValid: boolean;
}