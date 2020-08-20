import _ from 'lodash'
import { GET_SERVICE_LIST, ADD_NEW_SERVICE, EDIT_SERVICE, DELETE_SERVICE } from '../actions/service';
import { ServiceActions } from '../types/Service'

const initialState = {}

export default function services (state = initialState, action: ServiceActions) {
  switch(action.type) {
    case GET_SERVICE_LIST:
      return Object.assign({}, action.payload)
    case ADD_NEW_SERVICE:
      const index = (state !== undefined && !_.isEmpty(state)) ? _.keys(state).length : 0;
      return {
        ...state,
        [index]: action.payload
      }
    case EDIT_SERVICE:
      const idx = action.payload.selected.selectedProfile;
      return {
        ...state,
        [idx]: action.payload.service
      }
    case DELETE_SERVICE:
      const services = _.omit(state, action.payload.selectedProfile)
      return Object.assign({}, services);
    default:
      return state;
  }
}