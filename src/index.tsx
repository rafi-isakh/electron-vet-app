import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { configureStore, history } from './store';
import Root from './containers/Root';
import firebase from 'firebase/app';
import 'firebase/firestore'
import { createFirestoreInstance } from "redux-firestore";

const store = configureStore();

const firebaseConfig = {
  apiKey: "AIzaSyB9H292Lx47xSutp43PTVcoo4sY9yrWkBc",
  authDomain: "electron-vet-app.firebaseapp.com",
  databaseURL: "https://electron-vet-app.firebaseio.com",
  projectId: "electron-vet-app",
  storageBucket: "electron-vet-app.appspot.com",
  messagingSenderId: "675210899315",
  appId: "1:675210899315:web:8e01aa4b2cb5bb2df9df06"
};
// firebase.initializeApp(firebaseConfig);
// firebase.firestore();

const rrfConfig = {
  userProfile: 'users'
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

const firebaseProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
}

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () =>
  render(
    <AppContainer>
      <Root store={store} history={history} firebase={firebaseProps}/>
    </AppContainer>,
    document.getElementById('root')
  )
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
