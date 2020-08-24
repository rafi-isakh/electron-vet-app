import { Action } from 'redux';
import { SET_ACTIVE_PROFILE } from '../actions/activeProfile';

export interface SetActiveProfile extends Action<string> {
  type: string;
  payload: boolean;
}

export type ActiveProfileActions = SetActiveProfile;