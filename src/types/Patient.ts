import { Action } from 'redux';
import { ADD_NEW_PATIENT } from '../actions/patient';

type Patient = {
  selected: {
    activeProfile: string,
    selectedProfile: number
  },
  patient: any,
  id: any
} 

export interface SetAddNewPatient extends Action<string> {
  type: string;
  payload: Patient;
}

export type PatientActions = SetAddNewPatient;