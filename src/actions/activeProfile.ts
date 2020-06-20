import { Dispatch, GetState } from '../reducers/types';

export const SET_ACTIVE_PROFILE = 'SET_ACTIVE_PROFILE';

export function changeProfile(activeProfile: string) {
  return {
    type: SET_ACTIVE_PROFILE,
    payload: activeProfile
  };
}

export function setActiveProfile(name: string) {
  return async (dispatch: Dispatch, getState: GetState) => {
    // const { drawer } = getState();
    dispatch(changeProfile(name));
  };
}