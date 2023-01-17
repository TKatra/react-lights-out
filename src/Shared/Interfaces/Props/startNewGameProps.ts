import { PlayArea } from "../playArea";
import { GameSetup } from "../gameSetup";

export interface startNewGameProps {
  gameSetup: GameSetup;
  onPlayerNameChange: setPlayerNameFunc;
  onPlayAreaChange: setPlayAreaFunc;
}

interface setPlayerNameFunc {
  (newName: string): void;
}

interface setPlayAreaFunc {
  (newPlayArea: PlayArea): void;
}