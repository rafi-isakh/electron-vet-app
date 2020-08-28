import { QueueActions } from "../types/Queue";
import { GET_QUEUE_LIST, ADD_QUEUE } from "../actions/queue";

const initialState = {
  queue: {}
}

export default function queue (state = initialState, action: QueueActions) {
  switch(action.type) {
    case GET_QUEUE_LIST:
      return Object.assign({}, action.payload);
    case ADD_QUEUE:
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    default:
      return state;
  }
}