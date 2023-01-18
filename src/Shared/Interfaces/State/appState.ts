import { GamePhase } from "../../Enum/gamePhase";
import { GameSetup } from "../gameSetup";

export interface AppState {
  gameSetup: GameSetup;
  gamePhase: GamePhase;
}