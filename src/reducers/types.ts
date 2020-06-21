import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

export type stateTypeObject = {
  drawer: boolean;
  activeProfile: string;
};

export type GetState = () => stateTypeObject;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<stateTypeObject, Action<string>>;