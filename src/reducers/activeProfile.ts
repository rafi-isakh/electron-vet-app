import { ActiveProfileActions } from "../types/ActiveProfile";

export default function activeProfile(state = "", action: ActiveProfileActions) {
  switch (action.type) {
    case 'SET_ACTIVE_PROFILE':
      return action.payload;
    default:
      return state;
  }
}