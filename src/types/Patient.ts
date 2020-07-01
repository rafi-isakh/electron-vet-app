import { Action } from 'redux';
import { ADD_NEW_PATIENT } from '../actions/addPatient';

type Patient = {
  name: string,
  address: string,
  phone: string
} 

export interface SetAddNewPatient extends Action<string> {
  type: string;
  payload: Patient;
}

export type PatientActions = SetAddNewPatient;