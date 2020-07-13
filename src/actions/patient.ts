import { Dispatch, GetState } from '../reducers/types';

export const GET_PATIENT_LIST = 'GET_PATIENT_LIST';
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
    }).then((data: any) => {
      const newData = Object.assign({}, {'id': data.id}, patient)
      dispatch({ type: ADD_NEW_PATIENT, payload: newData});
    })
    .catch((err: any) => {
      dispatch({ type: ADD_PATIENT_ERROR, err});
    })
  }
};

export const editPatient = (updatedPatient: any, selected: any) => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }:any) => {
    const firestore = getFirestore();
    firestore.collection('patients').doc(selected.activeProfile).update({
      ...updatedPatient,
      modifiedAt: new Date()
    })
    .then(() => {
      const updatedData = Object.assign({}, {'id': selected.activeProfile}, updatedPatient)
      dispatch({ type: EDIT_PATIENT, payload: {selected, patient: updatedData}})
    })
  }
}

export const deletePatient = (selected: any) => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }:any) => {
    const firestore = getFirestore();
    firestore.collection('patients').doc(selected.activeProfile).delete()
      .then(() => {
        dispatch({ type: DELETE_PATIENT, payload: selected})
      })
  }
}

export const getPatients = () => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }:any) => {
    const firestore = getFirestore();
    firestore.collection('patients').get().then((patients: any) => {
      let detailInfo = {}
      patients.forEach((patient: any) => {
        let id = patient.id
        let value = patient.data()
        value['id'] = id
        detailInfo = Object.assign(detailInfo, {[id]: value})
      })
      dispatch({ type: GET_PATIENT_LIST, payload: detailInfo})
    })
  }
}