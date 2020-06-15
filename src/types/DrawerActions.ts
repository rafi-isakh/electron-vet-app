import { Action } from 'redux';
import { SET_DRAWER_STATUS } from '../actions/drawer';

export interface SetDrawerStatus extends Action<string> {
  type: typeof SET_DRAWER_STATUS;
  payload: boolean;
}

export type DrawerActions = SetDrawerStatus;