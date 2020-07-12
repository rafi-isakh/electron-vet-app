import { PatientActions } from '../types/Patient'
import { ADD_NEW_PATIENT, EDIT_PATIENT, DELETE_PATIENT } from '../actions/patient';

const initialState = {
  patients: {
    detailInfo: {}
  }
}

export default function patient (state = initialState, action: PatientActions) {
  switch(action.type) {
    case ADD_NEW_PATIENT:
      console.log('add patient success')
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case 'GET_PATIENT_LIST':
      console.log('get patient list', action.payload)
      return {
        ...state,
        patients: action.payload
      };
    case EDIT_PATIENT:
      console.log('edit update', action.payload)
      return {
        ...state,
        patients: {
            ...state.patients,
            [action.payload.selected.activeProfile]: action.payload.patient
          }
      };
    case DELETE_PATIENT:
        console.log('delete patient success')
        return {
          ...state,
          patients: action.payload
        };  
    default:
      return state;
  }
}