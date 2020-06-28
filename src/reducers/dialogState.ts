import { DialogStateActions } from "../types/DialogState";

const initialState = {
  addPatientDialog: false
}

export default function dialogState(state = initialState, action: DialogStateActions) {
  switch (action.type) {
    case 'SET_ADD_DIALOG_STATE':
      return {
        ...state,
        addPatientDialog: action.payload
      }
    default:
      return state;
  }
}