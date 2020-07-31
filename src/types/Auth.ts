import { Action } from "redux";

export interface Auth extends Action<string> {
  type: string;
  payload: any;
}

export type AuthActions = Auth;