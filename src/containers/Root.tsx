import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { Store, Dispatch } from '../reducers/types';
import Routes from '../Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

type FirebaseProps = {
  firebase: any,
  config: any,
  dispatch: Dispatch,
  createFirestoreInstance: any
}

type Props = {
  store: Store;
  history: History;
  firebase: FirebaseProps
};

const Root = ({ store, firebase }: Props) => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {... firebase}>
      <Router>
        <Routes />
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>
);

export default hot(Root);