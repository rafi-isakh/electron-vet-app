import { Dispatch, GetState } from "../reducers/types"

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SET_CREDENTIAL = 'SET_CREDENTIAL';

export const signIn = (credentials: any) => {
  return async (dispatch: Dispatch, getState: GetState, { getFirebase }:any) => {
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: LOGIN_SUCCESS })
    }).catch((err: any) => {
      dispatch({type: 'LOGIN_ERROR', err})
    })
  }
}

export const setCredential = (credentials: any) => {
  return async (dispatch: Dispatch, getState: GetState) => {
    dispatch({ type: SET_CREDENTIAL, payload: credentials})
  }
}

export const signOut = () => {
  return async (dispatch: Dispatch, getState: GetState, { getFirebase }:any) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: LOGOUT_SUCCESS })
    })
  }
}