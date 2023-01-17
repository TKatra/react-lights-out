import { PlayArea } from "../playArea";
import { GameState } from "../State/gameState";

export interface startNewGameProps {
  gameState: GameState;
  onPlayerNameChange: setPlayerNameFunc;
  onPlayAreaChange: setPlayAreaFunc;
}

interface setPlayerNameFunc {
  (newName: string): void;
}

interface setPlayAreaFunc {
  (newPlayArea: PlayArea): void;
}