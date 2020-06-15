import { DrawerActions } from '../types/DrawerActions';

export default function drawer(state = false, action: DrawerActions) {
  switch (action.type) {
    case 'SET_DRAWER_STATUS':
      return action.payload;
    default:
      return state;
  }
}