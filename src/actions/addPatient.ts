import { Dispatch, GetState } from '../reducers/types';

export const ADD_NEW_PATIENT = 'ADD_NEW_PATIENT';
export const ADD_PATIENT_ERROR = 'ADD_PATIENT_ERROR';

export const addPatient = (patient: any) => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('patients').add({
      ...patient,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: ADD_NEW_PATIENT, patient});
    }).catch((err: any) => {
      dispatch({ type: ADD_PATIENT_ERROR, err});
    })
  }
};