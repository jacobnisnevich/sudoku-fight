import React, { PropTypes, Component } from 'react'

class PlayersList extends Component {
  render() {
    return (
      <div className='lobby-players-list'>
        {this.props.players.map(function(player, i) {
          return (
            <div key={player.name}>
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
    )
  }
}

export default PlayersList