import { Dispatch, GetState } from "../reducers/types";

export const SET_ADD_DIALOG_STATE = 'SET_ADD_DIALOG_STATE';
export const SET_EDIT_DIALOG_STATE = 'SET_EDIT_DIALOG_STATE';

export function changeAddDialogState(dialogState: boolean) {
  return {
    type: SET_ADD_DIALOG_STATE,
    payload: dialogState
  };
}

export function setAddDialogState() {
  return async (dispatch: Dispatch, getState: GetState) => {
    const { dialogState } = getState();
    dispatch(changeAddDialogState(!dialogState.addPatientDialog));
  };
}

export function changeEditDialogState(dialogState: boolean) {
  return {
    type: SET_EDIT_DIALOG_STATE,
    payload: dialogState
  };
}

export function setEditDialogState() {
  return async (dispatch: Dispatch, getState: GetState) => {
    const { dialogState } = getState();
    dispatch(changeEditDialogState(!dialogState.editPatientDialog));
  }
}