import { Dispatch, GetState } from '../reducers/types';

export const GET_SERVICE_LIST = 'GET_SERVICE_LIST';
export const ADD_NEW_SERVICE = 'ADD_NEW_SERVICE';
export const EDIT_SERVICE = 'EDIT_SERVICE';
export const DELETE_SERVICE = 'DELETE_SERVICE';

export const getServices = () => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }:any) => {
    const firestore = getFirestore();
    let payload = {};
    let idx = 0;
    firestore.collection('services').get().then((services: any) => {
      services.forEach((item: any) => {
        let id = item.id
        let value = item.data()
        value['id'] = id
        payload = Object.assign(payload, {[idx]: value});
        idx++
      })
      dispatch({ type: GET_SERVICE_LIST, payload})
    })
  }
}

export const addService = (service: any) => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }:any) => {
    const firestore = getFirestore();
    firestore.collection('services').add({
      ...service,
      createdAt: new Date()
    }).then((data: any) => {
      const newData = Object.assign({}, {'id': data.id}, service)
      dispatch({ type: ADD_NEW_SERVICE, payload: newData})
    })
  }
}

export const editService = (updatedService: any, selected: any) => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }:any) => {
    const firestore = getFirestore();
    firestore.collection('services').doc(selected.activeProfile).update({
      ...updatedService,
      modifiedAt: new Date()
    }).then(() => {
      const updatedData = Object.assign({}, {'id': selected.activeProfile}, updatedService);
      dispatch({ type: EDIT_SERVICE, payload: {selected, service: updatedData}})
    })
  }
}

export const deleteService = (selected: any) => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }:any) => {
    const firestore = getFirestore();
    firestore.collection('services').doc(selected.activeProfile).delete()
      .then(() => {
        dispatch({ type: DELETE_SERVICE, payload: selected})
      })
  }
}