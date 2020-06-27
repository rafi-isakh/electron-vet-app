import { DialogStateActions } from "../types/DialogState";

const DialogState = {
  addPatientDialog: false
}

export default function dialogState(state = DialogState, action: DialogStateActions) {
  console.log('Reducer ', state)
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