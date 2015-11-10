import { LOG_IN, LOG_OUT } from '../constants/ActionTypes'

const initialState = {
  isLoggedIn: false,
  username: ''
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      return {
        isLoggedIn: true,
        username: action.username
      }
    case LOG_OUT:
      return {
        isLoggedIn: false,
        username: ""
      }
    default:
      return state
  }
}