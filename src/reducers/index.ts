import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import auth from './auth';
import drawer from './drawer';
import activeProfile from './activeProfile';
import dialogState from './dialogState';
import patients from './patient';
import queue from './queue';
import medicalRecord from './medicalRecord';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    drawer,
    medicalRecord,
    activeProfile,
    dialogState,
    patients,
    queue,
    auth
  });
}