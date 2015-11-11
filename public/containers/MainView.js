import React, { PropTypes, Component } from 'react'
import CreateLobby from '../components/CreateLobby'
import * as views from '../constants/Views'

class MainView extends Component {
  render() {
    let mainView = <div></div>
    let mainViewHeader = 'Lobbies'
    switch (this.props.view) {
      case views.LOBBIES:
        mainViewHeader = 'Lobbies'
        mainView = <div>
                     <button onClick={this.props.goToCreateGame.bind(this)}>Create Lobby</button>
                   </div>
        break
      case views.LOGIN:
        mainViewHeader = 'Login'
        break
      case views.PROFILE:
        mainViewHeader = 'Profile'
        break
      case views.CREATE_LOBBY:
        mainViewHeader = 'Create Lobby'
        mainView = <CreateLobby />
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