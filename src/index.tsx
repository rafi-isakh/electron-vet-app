import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { configureStore, history } from './store';
import Root from './containers/Root';

const store = configureStore();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () =>
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  )
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
