import { PatientActions } from '../types/Patient'
import { ADD_NEW_PATIENT, EDIT_PATIENT, DELETE_PATIENT, GET_PATIENT_LIST } from '../actions/patient';
import _ from 'lodash';

const initialState = {
  patients: {
    detailInfo: {}
  }
}

export default function patient (state = initialState, action: PatientActions) {
  switch(action.type) {
    case ADD_NEW_PATIENT:
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    case GET_PATIENT_LIST:
      return Object.assign({}, action.payload);
    case EDIT_PATIENT:
      return {
        ...state,
        [action.payload.selected.activeProfile]: action.payload.patient
      }
    case DELETE_PATIENT:
      const patients = _.omit(state, action.payload.activeProfile)
      return Object.assign({}, patients); 
    default:
      return state;
  }
}