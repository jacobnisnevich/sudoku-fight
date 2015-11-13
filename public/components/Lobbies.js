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
    self = this

    $.get('/getOpenGames', function(openGames) {
      self.setState({
        openGames: JSON.parse(openGames),
        startedGames: self.state.startedGames,
        finishedGames: self.state.finishedGames
      })
    })

    $.get('/getStartedGames', function(startedGames) {
      self.setState({
        openGames: self.state.openGames,
        startedGames: JSON.parse(startedGames),
        finishedGames: self.state.finishedGames
      })
    })

    $.get('/getFinishedGames', function(finishedGames) {
      self.setState({
        openGames: self.state.openGames,
        startedGames: self.state.startedGames,
        finishedGames: JSON.parse(finishedGames)
      })
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
          <GamesTable gamesArray={this.state.openGames}/>
        </div>
        <div>
          <div>Started Games</div>
          {this.state.startedGames.map(function(game, i) {
            return (
              <div className='games-list-item'>{game.name}</div>
            )
          })}
        </div>
        <div>
          <div>Finished Games</div>
          {this.state.finishedGames.map(function(game, i) {
            return (
              <div className='games-list-item'>{game.name}</div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Lobbies