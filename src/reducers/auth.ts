import { AuthActions } from "../types/Auth";
import { LOGOUT_SUCCESS, LOGIN_SUCCESS, SET_CREDENTIAL } from "../actions/auth";

const initialState = {
  authError: null,
  isLoggedIn: false,
}

export default function auth (state = initialState, action: AuthActions) {
  switch(action.type) {
    case 'LOGIN_ERROR':
      return {
        ...state,
        authError: 'Login failed'
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        authError: false,
        isLoggedIn: true,
      }
    case SET_CREDENTIAL:
      return {
        ...state,
        credentials: action.payload
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false
      }
    default:
      return state
  }
}