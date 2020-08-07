import { Action } from 'redux';

export interface MedicalRecord extends Action<string> {
  type: string;
  payload: any;
}

export type MedRecActions = MedicalRecord;