import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import createRootReducer from '../reducers';
import { Store, stateTypeObject } from '../reducers/types';
import config from '../services/firebase';

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = compose(
  applyMiddleware(thunk.withExtraArgument({ getFirestore }), router),
  reduxFirestore(config)
) ;

function configureStore(initialState?: stateTypeObject): Store {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };