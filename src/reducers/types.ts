import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

type Patient = {
  name: string,
  address: string,
  phone: string
}

type DialogState = {
  addPatientDialog: boolean
}

export type stateTypeObject = {
  drawer: boolean;
  activeProfile: string;
  patient: Patient;
  dialogState: DialogState;
};

export type GetState = () => stateTypeObject;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<stateTypeObject, Action<string>>;