import React, { PropTypes, Component } from 'react'
import PlayersList from '../components/PlayersList'
import Chat from '../components/Chat'
import * as $ from 'jquery'

class Lobby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: []
    }
  }

  componentDidMount() {
    self = this
  
    $.post('/getLobbyData', {
      lobbyId: this.props.lobbyId
    }, function(data) {
      self.parseDataToState(JSON.parse(data))
    })
  }

  parseDataToState(data) {
    let players = []

    for (let i = 1; i <= data.capacity; i++) {
      if (data[`p_${i}_name`]) {
        players.push({
          name: data[`p_${i}_name`],
          elo: data[`p_${i}_elo`]
        })
      } else {
        break
      }
    }

    this.setState({
      players: players
    })
  }

  render() {
    return (
      <div className='lobby-view'>
        <PlayersList players={this.state.players}/>
        <Chat lobbyId={this.props.lobbyId}/>
      </div>
    )
  }
}

export default Lobby