// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { createHashHistory } from 'history';
// import { routerMiddleware } from 'connected-react-router';
// import createRootReducer from '../reducers';
// import { Store, counterStateType } from '../reducers/types';

// const history = createHashHistory();
// const rootReducer = createRootReducer(history);
// const router = routerMiddleware(history);
// const enhancer = applyMiddleware(thunk, router);

// export default function configureStore(initialState?: counterStateType): Store {
//   return createStore(rootReducer, initialState, enhancer);
// }
import configuredStore from './configureStore';

const selectedConfigureStore = configuredStore

export const { configureStore } = selectedConfigureStore;

export const { history } = selectedConfigureStore;