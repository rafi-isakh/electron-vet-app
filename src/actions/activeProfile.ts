import { Dispatch, GetState } from '../reducers/types';

export const SET_ACTIVE_PROFILE = 'SET_ACTIVE_PROFILE';
export const SET_ACTIVE_MEDREC = 'SET_ACTIVE_MEDREC';
export const SET_ACTIVE_QUEUE = 'SET_ACTIVE_QUEUE';

export function changeProfile(activeProfile: string, selectedProfile: number) {
  return {
    type: SET_ACTIVE_PROFILE,
    payload: {activeProfile, selectedProfile}
  };
}

export function setActiveProfile(name: string, index: number) {
  return async (dispatch: Dispatch, getState: GetState) => {
    // const { drawer } = getState();
    dispatch(changeProfile(name, index));
  };
}

export function changeMedicalRecord(owner: string, pet: string) {
  return {
    type: SET_ACTIVE_MEDREC,
    payload: {owner, pet}
  }
}

export function setActiveMedRec(owner: string, pet: string) {
  return async (dispatch: Dispatch, getState: GetState) => {
    dispatch(changeMedicalRecord(owner, pet));
  }
}

export function changeQueue(queueId: string) {
  return {
    type: SET_ACTIVE_QUEUE,
    payload: {queueId}
  }
}

export function setActiveQueue(queueId: string) {
  return async (dispatch: Dispatch, getState: GetState) => {
    dispatch(changeQueue(queueId))
  }
}