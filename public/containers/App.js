import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as views from '../constants/Views'
import Navbar from '../components/Navbar'
import MainView from './MainView'
import * as SudokuActions from '../actions/sudoku'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: this.props.user.username == '' ? views.LOGIN : views.LOBBIES,
      lobbyId: 0
    }
  }

  beLoggedIn(username) {
    this.props.actions.logIn(username)
    this.setState({
      view: views.LOBBIES
    })
    localStorage.setItem('sudokuFightUser', JSON.stringify({
      'username': username,
      'loginTime': Date.now()
    }))
    this.render()
  }

  beLoggedOut() {
    this.props.actions.logOut()
    this.setState({
      view: views.LOGIN
    })
    localStorage.setItem('sudokuFightUser', JSON.stringify({
      'username': '',
      'loginTime': ''
    }))
    this.render()
  }

  goToPractice() {
    this.setState{(
      view: views.PRACTICE,
      lobbyId: this.state.lobbyId
    )}
    this.render()
  }

  goToGames() {
    this.setState({
      view: views.LOBBIES,
      lobbyId: this.state.lobbyId
    })
    this.render()
  }

  goToLobby(id) {
    this.setState({
      view: views.LOBBY,
      lobbyId: id
    })
    this.render()
  }

  goToGame() {
    this.setState({
      view: views.GAME,
      lobbyId: this.state.lobbyId
    })
    this.render()
  }

  goToCreateGame() {
    this.setState({
      view: views.CREATE_LOBBY,
      lobbyId: this.state.lobbyId
    })
    this.render()
  }

  goToLogin() {
    this.setState({
      view: views.LOGIN,
      lobbyId: this.state.lobbyId
    })
    this.render()
  }

  goToProfile() {
    this.setState({
      view: views.PROFILE,
      lobbyId: this.state.lobbyId
    })
    this.render()
  }

  render() {
    const { user, actions } = this.props
    return (
      <div>
        <Navbar isLoggedIn={this.props.user.isLoggedIn}
                goToPractice={this.goToPractice.bind(this)}
                goToGames={this.goToGames.bind(this)}
                goToLogin={this.goToLogin.bind(this)}
                goToProfile={this.goToProfile.bind(this)}
                beLoggedOut={this.beLoggedOut.bind(this)}/>
        <MainView username={this.props.user.username}
                  view={this.state.view}
                  goToCreateGame={this.goToCreateGame.bind(this)}
                  goToLobby={this.goToLobby.bind(this)}
                  lobbyId={this.state.lobbyId}
                  beLoggedIn={this.beLoggedIn.bind(this)}
                  goToGames={this.goToGames.bind(this)}/>
      </div>
    )
  }
}


App.propTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SudokuActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)