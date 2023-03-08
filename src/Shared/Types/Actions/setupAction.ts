import { SetupActionType } from "../../Enum/Actions/SetupActionType";
import { PlayArea } from "../../Interfaces/playArea";

export type SetupAction = 
  | {type: SetupActionType.SetPlayerName, payload: string}
  | {type: SetupActionType.SetPlayArea, payload: PlayArea};