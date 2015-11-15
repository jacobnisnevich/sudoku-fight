import React, { PropTypes, Component } from 'react'
import Lobbies from '../components/Lobbies'
import Lobby from '../components/Lobby'
import Login from '../components/Login'
import CreateLobby from '../components/CreateLobby'
import * as views from '../constants/Views'

class MainView extends Component {
  render() {
    let mainView = <div></div>
    let mainViewHeader = 'Lobbies'
    switch (this.props.view) {
      case views.LOBBIES:
        mainViewHeader = 'Lobbies'
        mainView = <Lobbies goToCreateGame={this.props.goToCreateGame} goToLobby={this.props.goToLobby}/>
        break
      case views.LOBBY:
        mainViewHeader = 'Lobby'
        mainView = <Lobby lobbyId={this.props.lobbyId} goToGame={this.props.goToGame}/>
        break
      case views.LOGIN:
        mainViewHeader = 'Login'
        mainView = <Login beLoggedIn={this.props.beLoggedIn}/>
        break
      case views.PROFILE:
        mainViewHeader = 'Profile'
        break
      case views.CREATE_LOBBY:
        mainViewHeader = 'Create Lobby'
        mainView = <CreateLobby username={this.props.username} goToGames={this.props.goToGames}/>
        break
    } 

    return (
      <div className='main-view'>
        <div className='main-view-header'>{mainViewHeader}</div>
        {mainView}
      </div>
    )
  }
}

export default MainView