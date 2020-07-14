import { Action } from 'redux';

export interface Queue extends Action<string> {
  type: string;
  payload: any;
}

export type QueueActions = Queue;