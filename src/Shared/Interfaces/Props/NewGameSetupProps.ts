import { PlayArea } from "../playArea";
import { Setup } from "../gameSetup";

export interface NewGameSetupProps {
  setup: Setup;
  onPlayerNameChange: setPlayerNameFunc;
  onPlayAreaChange: setPlayAreaFunc;
  onStartNewGame: startGameFunc;
}

interface setPlayerNameFunc {
  (newName: string): void;
}

interface setPlayAreaFunc {
  (newPlayArea: PlayArea): void;
}

interface startGameFunc {
  (): void;
}