import { Dispatch, GetState } from '../reducers/types';

export const SET_ACTIVE_PROFILE = 'SET_ACTIVE_PROFILE';

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