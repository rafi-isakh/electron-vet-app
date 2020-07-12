import { Dispatch, GetState } from '../reducers/types';

export const ADD_NEW_PATIENT = 'ADD_NEW_PATIENT';
export const EDIT_PATIENT = 'EDIT_PATIENT';
export const DELETE_PATIENT = 'DELETE_PATIENT';
export const ADD_PATIENT_ERROR = 'ADD_PATIENT_ERROR';

function refreshPatientList(firestore: any, dispatch: Dispatch, actionType: string) {
  firestore.collection('patients').get().then((patients: any) => {
    let resultList: any[] = []
    let detailInfo = {}
    patients.forEach((patient: any) => {
      let id = patient.id
      let value = patient.data()
      detailInfo = Object.assign(detailInfo, {[id]: value})
      
      let patientData = patient.data()
      patientData['id'] = id
      resultList.push(patientData)
    })
    dispatch({ type: actionType, payload: {resultList, detailInfo}})
  })
} 

export const addPatient = (patient: any) => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }:any) => {
    const firestore = getFirestore();
    firestore.collection('patients').add({
      ...patient,
      createdAt: new Date()
    }).then(() => {
      refreshPatientList(firestore, dispatch, ADD_NEW_PATIENT)
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
      refreshPatientList(firestore, dispatch, EDIT_PATIENT)
    })
  }
}

export const deletePatient = (id: string) => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }:any) => {
    const firestore = getFirestore();
    firestore.collection('patients').doc(id).delete()
      .then(() => {
        refreshPatientList(firestore, dispatch, DELETE_PATIENT)
      })
  }
}

export const getPatients = () => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }:any) => {
    const firestore = getFirestore();
    console.log('refresh action called')
    firestore.collection('patients').get().then((patients: any) => {
      let resultList: any[] = []
      let detailInfo = {}
      patients.forEach((patient: any) => {
        let id = patient.id
        let value = patient.data()
        detailInfo = Object.assign(detailInfo, {[id]: value})
        
        let patientData = patient.data()
        patientData['id'] = id
        resultList.push(patientData)
      })
      dispatch({ type: 'GET_PATIENT_LIST', payload: {resultList, detailInfo}})
    })
  }
}