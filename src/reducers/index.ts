import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import drawer from './drawer';
import activeProfile from './activeProfile';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    drawer,
    activeProfile
  });
}