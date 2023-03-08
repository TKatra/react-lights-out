import { PlayArea } from "../playArea";
import { SetupState } from "../State/setupState";

export interface NewGameSetupProps {
  setup: SetupState;
  onPlayerNameChange: setPlayerNameFunc;
  onPlayAreaChange: setPlayAreaFunc;
}

interface setPlayerNameFunc {
  (newName: string): void;
}

interface setPlayAreaFunc {
  (newPlayArea: PlayArea): void;
}