import { Dispatch, GetState } from '../reducers/types'

export const GET_QUEUE_LIST = 'GET_QUEUE_LIST';

export const getQueue = () => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }:any) => {
    const firestore = getFirestore();
    let payload = {}
    firestore.collection('queue').get().then((queue: any) => {
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