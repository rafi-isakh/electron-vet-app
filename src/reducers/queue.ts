import { QueueActions } from "../types/Queue";
import { GET_QUEUE_LIST, ADD_QUEUE, EDIT_QUEUE, ADD_BILLING, EDIT_BILLING } from "../actions/queue";

const initialState: any = {}

export default function queue (state = initialState, action: QueueActions) {
  switch(action.type) {
    case GET_QUEUE_LIST:
      return Object.assign({}, action.payload);
    case ADD_QUEUE:
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    case ADD_BILLING:
      const queueId = action.payload.queue
      return {
        ...state,
        [queueId]: {
          ...state[queueId],
          billing: action.payload.billing
        }
      }
    case EDIT_BILLING:
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    default:
      return state;
  }
}