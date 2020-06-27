import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import drawer from './drawer';
import activeProfile from './activeProfile';
import dialogState from './dialogState';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    drawer,
    activeProfile,
    dialogState
  });
}