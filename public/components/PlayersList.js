import React, { PropTypes, Component } from 'react'

class PlayersList extends Component {
  render() {
    return (
      <div className='lobby-players-list'>
        <div>
          {this.props.players.map(function(player, i) {
            return (
              <div className='lobby-player clearfix' key={player.name}>
                <div className='lobby-player-number'>{i + 1}</div>
                <div className='lobby-player-item clearfix'>
                  <div className='lobby-player-name'>{player.name}</div>
                  <div className='lobby-player-elo'>{player.elo}</div>
                  <div className='lobby-player-status'>{player.status}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className='lobby-player-actions'>
          <div className='lobby-player-join'>
            <button onClick={this.props.joinLobby.bind(this)}>Join Lobby</button>
          </div>
          <div className='lobby-player-change-status'>
            <button onClick={this.props.toggleStatus.bind(this)}>Change Status</button>
          </div>
        </div>
      </div>
    )
  }
}

export default PlayersList