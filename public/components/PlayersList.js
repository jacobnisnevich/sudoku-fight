import React, { PropTypes, Component } from 'react'

class PlayersList extends Component {
  render() {
    return (
      <div>
        {this.props.players.map(function(player, i) {
          return (
            <div key={player.name}>
              <div>{player.name}</div>
              <div>{player.elo}</div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default PlayersList