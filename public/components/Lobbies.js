import React, { PropTypes, Component } from 'react'
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
          <div className='games-list'>
            <div className='games-list-item-head'>
              <div className='games-list-cell'>Name</div>
              <div className='games-list-cell'>Difficulty</div>
              <div className='games-list-cell'>Capacity</div>
              <div className='games-list-cell'>Player 1</div>
              <div className='games-list-cell'>Player 2</div>
              <div className='games-list-cell'>Player 3</div>
              <div className='games-list-cell'>Player 4</div>
            </div>
            {this.state.openGames.map(function(game, i) {
              return (
                <div className='games-list-item'>
                  <div className='games-list-cell'>{game.name}</div>
                  <div className='games-list-cell'>{game.difficulty}</div>
                  <div className='games-list-cell'>{game.capacity}</div>
                  <div className='games-list-cell'>{game.p_1_name}</div>
                  <div className='games-list-cell'>{game.p_2_name}</div>
                  <div className='games-list-cell'>{game.p_3_name}</div>
                  <div className='games-list-cell'>{game.p_4_name}</div>
                </div>
              )
            })}
          </div>
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