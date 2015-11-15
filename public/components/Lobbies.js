import React, { PropTypes, Component } from 'react'
import GamesTable from './GamesTable'
import * as $ from 'jquery'

class Lobbies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openGames: [],
      startedGames: [],
      finishedGames: []
    }
  }

  componentDidMount() {
    let tempState = this.state
    self = this

    $.get('/getAllGames', function(data) {
      tempState = {
        openGames: JSON.parse(data).openGames,
        startedGames: JSON.parse(data).startedGames,
        finishedGames: JSON.parse(data).finishedGames
      }
      self.setState(tempState)
    })
  }

  render() {
    return (
      <div>
        <div className='create-lobby-button'>
          <button onClick={this.props.goToCreateGame.bind(this)}>Create Lobby</button>
        </div>
        <div>
          <div>Open Games</div>
          <GamesTable gamesArray={this.state.openGames} goToLobby={this.props.goToLobby}/>
        </div>
        <div>
          <div>Started Games</div>
          <GamesTable gamesArray={this.state.startedGames} goToLobby={this.props.goToLobby}/>
        </div>
        <div>
          <div>Finished Games</div>
          <GamesTable gamesArray={this.state.finishedGames} goToLobby={this.props.goToLobby}/>
        </div>
      </div>
    )
  }
}

export default Lobbies