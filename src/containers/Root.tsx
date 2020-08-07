import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactReduxFirebaseProvider, isLoaded } from 'react-redux-firebase';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Store, Dispatch, stateTypeObject } from '../reducers/types';
import Routes from '../Routes';

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

function AuthIsLoaded({ children }: any) {
  const auth = useSelector<any, stateTypeObject>(state => state.firebase.auth)
  if (!isLoaded(auth)) return <LinearProgress color="secondary" />;
  return children
}

const Root = ({ store, firebase }: Props) => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {... firebase}>
      <Router>
        <AuthIsLoaded>
          <Routes />
        </AuthIsLoaded>
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>
);

export default hot(Root);