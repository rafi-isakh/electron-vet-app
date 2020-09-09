import { Dispatch, GetState } from '../reducers/types'

export const GET_QUEUE_LIST = 'GET_QUEUE_LIST';
export const ADD_QUEUE = 'ADD_QUEUE';
export const ADD_BILLING = 'ADD_BILLING';
export const GET_BILLING = 'GET_BILLING';
export const GET_BILLING_LIST = 'GET_BILLING_LIST';
export const EDIT_BILLING = 'EDIT_BILLING';

export const getQueue = () => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }:any) => {
    const firestore = getFirestore();
    let today = new Date();
    const yesterday = new Date(today.setDate(today.getDate()-1));
    let payload = {}
    firestore.collection('queue')
      .where('createdAt', '>', yesterday).get().then((queue: any) => {
      queue.forEach((item: any) => {
        let id = item.id
        let value = item.data()
        value['id'] = id
        payload = Object.assign(payload, {[id]: value})
      })
      dispatch({ type: GET_QUEUE_LIST, payload})
    })
  }
}

export const addQueue = (queueItem: any) => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }:any) => {
    const firestore = getFirestore();
    queueItem['status'] = 'Waiting';
    firestore.collection('queue').add({
      ...queueItem,
      createdAt: new Date()
    }).then((data: any) => {
      const newData = Object.assign({}, {'id': data.id}, queueItem)
      dispatch({ type: ADD_QUEUE, payload: newData});
    })
  }
};

export const addBilling = (billing: any) => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }:any) => {
    const firestore = getFirestore();
    firestore.collection('billing').add({
      ...billing,
      createdAt: new Date()
    }).then((data: any) => {
      dispatch({ type: ADD_BILLING, payload: {queue: billing.queueId, billing: data.id}});
    })
  }
}

export const getBilling = (id: string) => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }: any) => {
    const firestore = getFirestore();
    firestore.collection('billing').doc(id).get().then((billing: any) => {
      dispatch({ type: GET_BILLING, payload: billing.data()})
    })
  }
}

export const getBillingList = () => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }:any) => {
    const firestore = getFirestore();
    let today = new Date();
    const yesterday = new Date(today.setDate(today.getDate()-1));
    let payload = {}
    firestore.collection('billing')
      .where('createdAt', '>', yesterday).get().then((billing: any) => {
      billing.forEach((item: any) => {
        let id = item.id
        let value = item.data()
        value['id'] = id
        payload = Object.assign(payload, {[value.queueId]: value})
      })
      dispatch({ type: GET_BILLING_LIST, payload})
    })
  }
}

export const editBilling = (billing: any, id: string) => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }:any) => {
    const firestore = getFirestore();
    firestore.collection('billing').doc(id).update({
      ...billing,
      modifiedAt: new Date()
    })
    .then(() => {
      const updatedData = Object.assign({}, {'id': id}, billing)
      dispatch({ type: EDIT_BILLING, payload: updatedData})
    })
  }
}