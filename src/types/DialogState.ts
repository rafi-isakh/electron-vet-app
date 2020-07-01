import { Action } from 'redux';
// import { SET_ADD_DIALOG_STATE } from '../actions/dialogState';

export interface SetAddDialogState extends Action<string> {
  type: string;
  payload: boolean;
}

export type DialogStateActions = SetAddDialogState;