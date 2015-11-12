import { LOG_IN, LOG_OUT } from '../constants/ActionTypes'

let storedUser = ""
let expiredStash = true
if (localStorage.getItem('sudokuFightUser')) {
  let parsedStoredUser = JSON.parse(localStorage.getItem('sudokuFightUser'))
  storedUser = parsedStoredUser.username
  let storedLoginTime = new Date(parsedStoredUser.loginTime)
  let currentTime = new Date(Date.now())

  let timeDiff = Math.abs(currentTime.getTime() - storedLoginTime.getTime());
  let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (diffDays <= 30) {
    expiredStash = false
  }
}

const initialState = {
  isLoggedIn: expiredStash ? false : true,
  username: expiredStash ? '' : storedUser
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