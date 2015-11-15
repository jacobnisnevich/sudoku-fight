import React, { PropTypes, Component } from 'react'
import PlayersList from '../components/PlayersList'
import * as $ from 'jquery'

class Lobby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: [],
      chatMessages: []
    }
  }

  componentDidMount() {
    self = this
  
    // get chat messages
    // get players
    $.post('/getLobbyData', {
      lobbyId: this.props.lobbyId
    }, function(data) {
      console.log(data)
    })
  }

  render() {
    return (
      <div>
        <PlayersList players={this.state.players}/>
      </div>
    )
  }
}

export default Lobby