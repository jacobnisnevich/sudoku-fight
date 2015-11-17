import React, { PropTypes, Component } from 'react'

class PlayersList extends Component {
  render() {
    return (
      <div className='lobby-players-list'>
        {this.props.players.map(function(player, i) {
          return (
            <div key={player.name} className='lobby-player-item clearfix'>
              <div className='lobby-player-name'>{player.name}</div>
              <div className='lobby-player-elo'>{player.elo}</div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default PlayersList