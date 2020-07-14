import { QueueActions } from "../types/Queue";
import { GET_QUEUE_LIST } from "../actions/queue";

export default function queue (state = {}, action: QueueActions) {
  switch(action.type) {
    case GET_QUEUE_LIST:
      console.log('get queue list', action.payload)
      return {
        ...state,
        queue: action.payload
      };
    default:
      return state;
  }
}