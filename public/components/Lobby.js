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
          elo: data[`p_${i}_elo`],
          status: data[`p_${i}_status`] == 'ready' ? 'READY' : 'NOT READY'
        })
      } else {
        break
      }
    }

    this.setState({
      players: players
    })
  }

  joinLobby() {
    // Check if player already in lobby
    for (let i = 0; i < this.state.players.length; i++) {
      if (this.props.username.toLowerCase() == this.state.players[i].name.toLowerCase()) {
        return
      }
    }

    $.post('/joinLobby', {
      lobbyId: this.props.lobbyId,
      username: this.props.username
    }, function(data) {
      console.log(data)
    })
  }

  toggleStatus() {
    self = this

    $.post('/toggleStatus', {
      lobbyId: this.props.lobbyId,
      username: this.props.username
    }, function(data) {
      for (let i = 0; i < self.state.players.length; i++) {
        if (self.props.username.toLowerCase() == self.state.players[i].name.toLowerCase()) {
          updateStatus(i, switchStatus(self.state.players[i].status))
        }
      }
    })
  }

  updateStatus(index, status) {
    let newState = {
      players: []
    }

    for (let i = 0; i < this.state.players.length; i++) {
      players.push({
        name: this.state.players[i].name,
        elo: this.state.players[i].elo,
        status: (i == index) ? status : this.state.players[i].status
      })
    }

    this.setState(newState)
  }

  switchStatus(status) {
    return status == 'ready' ? 'not_ready' : ready
  }

  render() {
    return (
      <div className='lobby-view clearfix'>
        <PlayersList players={this.state.players} joinLobby={this.joinLobby.bind(this)} toggleStatus={this.toggleStatus.bind(this)}/>
        <Chat lobbyId={this.props.lobbyId} username={this.props.username}/>
      </div>
    )
  }
}

export default Lobby