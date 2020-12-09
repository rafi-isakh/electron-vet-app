import { GET_USER_INFO } from '../actions/userInfo';
import { MedRecActions } from '../types/MedicalRecord';

const initialState: any = {}

export default function loginInfo(state = initialState, action: MedRecActions) {
  switch(action.type) {
    case GET_USER_INFO:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}