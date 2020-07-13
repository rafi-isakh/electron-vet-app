import { Action } from 'redux';

type Patient = {
  selected: {
    activeProfile: string,
    selectedProfile: number
  },
  patient: any,
  activeProfile: string,
  id: any
} 

export interface SetAddNewPatient extends Action<string> {
  type: string;
  payload: Patient;
}

export type PatientActions = SetAddNewPatient;