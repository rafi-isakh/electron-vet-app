import { DialogStateActions } from "../types/DialogState";
import { SET_ADD_DIALOG_STATE, SET_EDIT_DIALOG_STATE } from "../actions/dialogState";

const initialState = {
  addPatientDialog: false,
  editPatientDialog: false
}

export default function dialogState(state = initialState, action: DialogStateActions) {
  switch (action.type) {
    case SET_ADD_DIALOG_STATE:
      return {
        ...state,
        addPatientDialog: action.payload
      }
    case SET_EDIT_DIALOG_STATE:
      return {
        ...state,
        editPatientDialog: action.payload
      }
    default:
      return state;
  }
}