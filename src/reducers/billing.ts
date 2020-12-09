import { QueueActions } from '../types/Queue';
import { GET_BILLING_LIST, EDIT_BILLING } from '../actions/queue';

const initialState: any = {}

export default function billing(state = initialState, action: QueueActions) {
  switch(action.type) {
    case GET_BILLING_LIST:
      return Object.assign({}, action.payload)
    case EDIT_BILLING:
      return {
        ...state,
        [action.payload.queueId]: action.payload
      }
    default:
      return state;
  }
}