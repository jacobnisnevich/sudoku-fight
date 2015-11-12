import * as types from '../constants/ActionTypes'

export function logIn(username) {
    return {
        type: types.LOG_IN,
        username: username
    }
}

export function logOut() {
    return {
        type: types.LOG_OUT
    }
}

export function joinLobby(lobbyId) {
    return {
        type: types.JOIN_LOBBY,
        lobbyId: lobbyId
    }
}

export function addOpponent(username, lobbyId) {
    return {
        type: types.ADD_OPPONENT,
        username: username,
        lobbyId: lobbyId
    }
}

export function leaveLobby(lobbyId) {
    return {
        type: types.LEAVE_LOBBY,
        lobbyId: lobbyId
    }
}

export function startGame(lobbyId) {
    return {
        type: types.START_GAME,
        lobbyId: lobbyId
    }
}

export function endGame(lobbyId) {
    return {
        type: types.END_GAME,
        lobbyId: lobbyId
    }
}

export function enterNumber(number, row, column) {
    return {
        type: types.ENTER_NUMBER,
        number: number,
        row: row,
        column: column
    }
}

