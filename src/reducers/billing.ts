import { QueueActions } from '../types/Queue';
import { GET_BILLING, GET_BILLING_LIST } from '../actions/queue';

const initialState: any = {}

export default function billing(state = initialState, action: QueueActions) {
  switch(action.type) {
    case GET_BILLING_LIST:
      return Object.assign({}, action.payload)
    default:
      return state;
  }
}