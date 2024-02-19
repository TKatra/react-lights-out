import { PlayArea } from "../playArea";

export interface NewGameSetupProps {
  playerName: string;
  playArea: PlayArea;
  onPlayerNameChange: setPlayerNameFunc;
  onPlayAreaChange: setPlayAreaFunc;
}

interface setPlayerNameFunc {
  (newName: string): void;
}

interface setPlayAreaFunc {
  (newPlayArea: PlayArea): void;
}