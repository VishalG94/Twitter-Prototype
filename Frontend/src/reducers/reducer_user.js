import {
  LOGIN_USER,
  SIGNUP_USER,
  GET_PROFILE,
  GET_USER_PROFILE,
} from '../actions'

export default function (state, action) {
  switch (action.type) {
    case LOGIN_USER:
        return action.payload
      // return [action.payload, ...state ]
    case SIGNUP_USER:
      return action.payload
    case GET_PROFILE:
      return action.payload
      case GET_USER_PROFILE:
        return action.payload
    default:
      return { ...state }
  }
}
