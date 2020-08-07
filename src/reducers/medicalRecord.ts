import { GET_MEDICAL_RECORD, ADD_MEDICAL_RECORD, CREATE_MEDICAL_RECORD } from "../actions/medicalRecord";
import { MedRecActions } from "../types/MedicalRecord";

const initialState = {}

export default function medicalRecord (state = initialState, action: MedRecActions) {
  switch(action.type) {
    case GET_MEDICAL_RECORD:
      return Object.assign({}, action.payload);
    case ADD_MEDICAL_RECORD:
      return Object.assign({}, action.payload);
    case CREATE_MEDICAL_RECORD:
      return Object.assign({}, action.payload)
    default:
      return state;
  }
}