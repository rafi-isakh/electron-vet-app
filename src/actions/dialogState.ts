import { Dispatch, GetState } from "../reducers/types";

export const SET_ADD_DIALOG_STATE = 'SET_ADD_DIALOG_STATE';

export function changeAddDialogState(dialogState: boolean) {
  return {
    type: SET_ADD_DIALOG_STATE,
    payload: dialogState
  };
}

export function setAddDialogState() {
  return async (dispatch: Dispatch, getState: GetState) => {
    console.log('Here');
    const { dialogState } = getState();
    dispatch(changeAddDialogState(!dialogState.addPatientDialog));
  };
}