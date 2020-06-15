import { Dispatch, GetState } from '../reducers/types';

export const SET_DRAWER_STATUS = 'SET_DRAWER_STATUS';

export function changeState(drawerStatus: boolean) {
  return {
    type: SET_DRAWER_STATUS,
    payload: !drawerStatus
  };
}

export function setDrawer() {
  return async (dispatch: Dispatch, getState: GetState) => {
    const { drawer } = getState();
    dispatch(changeState(drawer));
  };
}