import { Action } from 'redux';

export interface Service extends Action<string> {
  type: string;
  payload: any;
}

export type ServiceActions = Service;