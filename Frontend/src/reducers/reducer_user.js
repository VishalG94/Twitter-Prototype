import {
  LOGIN_USER,
  SIGNUP_USER
} from '../actions'

export default function (state, action) {
  switch (action.type) {
    case LOGIN_USER:
        return action.payload
      // return [action.payload, ...state ]
    case SIGNUP_USER:
      return action.payload
    default:
      return { ...state }
  }
}
