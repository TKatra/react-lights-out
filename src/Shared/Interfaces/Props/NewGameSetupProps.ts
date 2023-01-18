import { PlayArea } from "../playArea";
import { GameSetup } from "../gameSetup";
import { GamePhase } from "../../Enum/gamePhase";

export interface NewGameSetupProps {
  gameSetup: GameSetup;
  onPlayerNameChange: setPlayerNameFunc;
  onPlayAreaChange: setPlayAreaFunc;
  onStartNewGame: setGamePhaseFunc;
}

interface setPlayerNameFunc {
  (newName: string): void;
}

interface setPlayAreaFunc {
  (newPlayArea: PlayArea): void;
}

interface setGamePhaseFunc {
  (newGamePhase: GamePhase): void;
}