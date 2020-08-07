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
  auth: any,
  drawer: boolean;
  activeProfile: any;
  dialogState: DialogState;
  firestore: any;
  firebase: any;
  patients: any;
  queue: any;
  medicalRecord: any;
};

export type GetState = () => stateTypeObject;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<stateTypeObject, Action<string>>;