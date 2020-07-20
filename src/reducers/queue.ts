import { QueueActions } from "../types/Queue";
import { GET_QUEUE_LIST, ADD_QUEUE } from "../actions/queue";

const initialState = {
  queue: {}
}

export default function queue (state = initialState, action: QueueActions) {
  switch(action.type) {
    case GET_QUEUE_LIST:
      console.log('get queue list', action.payload)
      return {
        ...state,
        queue: action.payload
      };
    case ADD_QUEUE:
      console.log('add queue success')
      return {
        ...state,
        queue: {
          ...state.queue,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
}