import { Dispatch, GetState } from '../reducers/types'

export const GET_USER_INFO = 'GET_USER_INFO';

export const getUserInfo = () => {
  return async (dispatch: Dispatch, getState: GetState, { getFirestore }: any) => {
    const firestore = getFirestore();
    let payload = {}
    firestore.collection('userInfo').get().then((users: any) => {
      users.forEach((user: any) => {
        let id = user.id
        let value = user.data()
        value['id'] = id
        payload = Object.assign(payload, {[id]: value})
      })
      dispatch({ type: GET_USER_INFO, payload})
    })
  }
}