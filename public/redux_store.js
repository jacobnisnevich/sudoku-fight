// Store

var initialState = {
    user: {
        isLoggedIn: false,
        username: '',
        passwordHash: ''
    },
    game: {
        isInGame: false,
        lobbyId: 0,
    }
    lobby: {
        isGameStarted: false,
        boardState: [[0, 0, 0, 0, 0, 0, 0, 0, 0]
                     [0, 0, 0, 0, 0, 0, 0, 0, 0]
                     [0, 0, 0, 0, 0, 0, 0, 0, 0]
                     [0, 0, 0, 0, 0, 0, 0, 0, 0]
                     [0, 0, 0, 0, 0, 0, 0, 0, 0]
                     [0, 0, 0, 0, 0, 0, 0, 0, 0]
                     [0, 0, 0, 0, 0, 0, 0, 0, 0]
                     [0, 0, 0, 0, 0, 0, 0, 0, 0]
                     [0, 0, 0, 0, 0, 0, 0, 0, 0]]
        opponents: [{
            username: '',
            percentCompleted: 0.0,
            isFinished: false
        },[{
            username: '',
            percentCompleted: 0.0,
            isFinished: false
        }]
    }
};

// Action Types

const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';
const JOIN_LOBBY = 'JOIN_LOBBY';
const ADD_OPPONENT = 'ADD_OPPONENT';
const LEAVE_LOBBY = 'LEAVE_LOBBY';
const START_GAME = 'START_GAME';
const UPDATE_PROGRESS = 'UPDATE_PROGRESS';
const END_GAME = 'END_GAME';
const ENTER_NUMBER = 'ENTER_NUMBER';

// Actions

function logIn(username, password) {
    return {
        type: LOG_IN,
        username: username,
        password: password
    }
}

function logOut() {
    return {
        type: LOG_OUT
    }
}

function joinLobby(lobbyId) {
    return {
        type: JOIN_LOBBY,
        lobbyId: lobbyId
    }
}

function addOpponent(username, lobbyId) {
    return {
        type: ADD_OPPONENT,
        username: username,
        lobbyId: lobbyId
    }
}

function leaveLobby(lobbyId) {
    return {
        type: LEAVE_LOBBY,
        lobbyId: lobbyId
    }
}

function startGame(lobbyId) {
    return {
        type: START_GAME,
        lobbyId: lobbyId
    }
}

function endGame(lobbyId) {
    return {
        type: END_GAME,
        lobbyId: lobbyId
    }
}

function enterNumber(number, row, column) {
    return {
        type: ENTER_NUMBER,
        number: number,
        row: row,
        column: column
    }
}
