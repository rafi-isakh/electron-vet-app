import { Dispatch, GetState } from '../reducers/types';

export const ADD_NEW_PATIENT = 'ADD_NEW_PATIENT';
export const EDIT_PATIENT = 'EDIT_PATIENT';
export const DELETE_PATIENT = 'DELETE_PATIENT';
export const ADD_PATIENT_ERROR = 'ADD_PATIENT_ERROR';

export const addPatient = (patient: any) => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }:any) => {
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

export const editPatient = (updatedPatient: any, id: string) => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }:any) => {
    const firestore = getFirestore();
    firestore.collection('patients').doc(id).update({
      ...updatedPatient,
      modifiedAt: new Date()
    }).then(() => {
      dispatch({ type: EDIT_PATIENT, updatedPatient})
    })
  }
}

export const deletePatient = (id: string) => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }:any) => {
    const firestore = getFirestore();
    firestore.collection('patients').doc(id).delete()
      .then(() => {
        dispatch({ type: DELETE_PATIENT, id})
      })
  }
}

export const getPatients = () => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }:any) => {
    const firestore = getFirestore();
    firestore.collection('patients').get().then((patients: any[]) => {
      patients.forEach(data => {
        console.log('Result list', data.data())
      })
      dispatch({ type: 'GET_PATIENT_LIST', patients})
    })
  }
}