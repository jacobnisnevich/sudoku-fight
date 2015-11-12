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
      $.get('/getStartedGames', function(startedGames) {
        $.get('/getFinishedGames', function(finishedGames) {
          self.setState({
            openGames: JSON.parse(openGames),
            startedGames: JSON.parse(startedGames),
            finishedGames: JSON.parse(finishedGames)
          })
        })
      })
    })
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.props.goToCreateGame.bind(this)}>Create Lobby</button>
        </div>
        <div>
          <div>Open Games</div>
          <table className='games-list'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Difficulty</th>
                <th>Capacity</th>
                <th>Player 1</th>
                <th>Player 2</th>
                <th>Player 3</th>
                <th>Player 4</th>
              </tr>
            </thead>
            <tbody>
              {this.state.openGames.map(function(game, i) {
                return (
                  <tr>
                    <td>{game.name}</td>
                    <td>{game.difficulty}</td>
                    <td>{game.capacity}</td>
                    <td>{game.p_1_name}</td>
                    <td>{game.p_2_name}</td>
                    <td>{game.p_3_name}</td>
                    <td>{game.p_4_name}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
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