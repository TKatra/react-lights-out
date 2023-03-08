import { SetupActionType } from "../Shared/Enum/Actions/SetupActionType";
import { SetupState } from "../Shared/Interfaces/State/setupState";
import { MiscHelper } from "../Shared/miscHelper";
import { SetupAction } from "../Shared/Types/Actions/setupAction";

export const initialSetupState: SetupState = {  
  playerName: '',
  playArea: {
    xLength: 3,
    yLength: 3
  },
  isValid: false
};

export function setupReducer(state: SetupState, action: SetupAction): SetupState {
  switch (action.type) {
    case SetupActionType.SetPlayerName:
      return {
        ...state,
        playerName: action.payload,
        isValid: MiscHelper.validateSetup(state)
      };
    case SetupActionType.SetPlayArea:
      return {
        ...state,
        playArea: action.payload
      };
  }
}