import { Dispatch, GetState } from "../reducers/types";

export const GET_MEDICAL_RECORD = 'GET_MEDICAL_RECORD';
export const ADD_MEDICAL_RECORD = 'ADD_MEDICAL_RECORD';
export const CREATE_MEDICAL_RECORD = 'CREATE_MEDICAL_RECORD';

export const getMedicalRecord = (data: any) => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }:any) => {
    const firestore = getFirestore();
    let payload = {}
    firestore.collection('medical_records')
      .where('owner', '==', data.owner)
      .where('name', '==', data.name)
      .get().then((record: any) => {
        record.forEach((item: any) => {
          payload = Object.assign({}, {'id': item.id}, item.data());
        })
        dispatch({ type: GET_MEDICAL_RECORD, payload})
      })
  }
}

export const addMedicalRecord = (data: any) => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }:any) => {
    const firestore = getFirestore();
    console.log('Debug ', data)
    firestore.collection('medical_records').doc(data.id).update({
      ...data,
      modifiedAt: new Date()
    }).then((record: any) => {
      const newData = Object.assign({}, data)
      dispatch({ type: ADD_MEDICAL_RECORD, payload: newData});
    })
  }
}

export const createMedicalRecord = (data: any) => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }:any) => {
    const firestore = getFirestore();
    firestore.collection('medical_records').add({
      ...data,
      createdAt: new Date()
    }).then((result: any) => {
      const newData = Object.assign({}, {'id': result.id}, data)
      dispatch({ type: CREATE_MEDICAL_RECORD, payload: newData});
    })
  }
}