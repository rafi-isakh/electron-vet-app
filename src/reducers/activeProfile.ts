import { ActiveProfileActions } from "../types/ActiveProfile";
import { SET_ACTIVE_PROFILE, SET_ACTIVE_MEDREC } from "../actions/activeProfile";

export default function activeProfile(state = "", action: ActiveProfileActions) {
  switch (action.type) {
    case SET_ACTIVE_PROFILE:
      return Object.assign({}, action.payload);
    case SET_ACTIVE_MEDREC:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}