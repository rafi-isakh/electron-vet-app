import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

type Patient = {
  name: string,
  address: string,
  phone: string
}

type DialogState = {
  addPatientDialog: boolean
  editPatientDialog: boolean
}

export type stateTypeObject = {
  drawer: boolean;
  activeProfile: string;
  patients: Patient;
  dialogState: DialogState;
  firestore: any
};

export type GetState = () => stateTypeObject;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<stateTypeObject, Action<string>>;