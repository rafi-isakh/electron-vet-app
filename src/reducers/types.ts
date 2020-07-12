import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

type Patient = {
  name: string,
  address: string,
  phone: string
}

type DialogState = {
  addPatientDialog: boolean
  editPatientDialog: boolean
  deletePatientDialog: boolean
}

export type stateTypeObject = {
  drawer: boolean;
  activeProfile: any;
  dialogState: DialogState;
  firestore: any;
  patients: any;
};

export type GetState = () => stateTypeObject;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<stateTypeObject, Action<string>>;