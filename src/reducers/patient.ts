import { PatientActions } from '../types/Patient'
import { ADD_NEW_PATIENT } from '../actions/addPatient';


export default function patient (state = {}, action: PatientActions) {
  switch(action.type) {
    case ADD_NEW_PATIENT:
      console.log('add patient success')
      return state;
    default:
      return state;
  }
}