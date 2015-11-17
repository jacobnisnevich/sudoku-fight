import React, { PropTypes, Component } from 'react'
import Websocket from 'react-websocket'
import * as $ from 'jquery'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chatMessages: [],
      messageAreaText: ""
    }
  }

  componentDidMount() {
    self = this
  
    $.post('/getLobbyData', {
      lobbyId: this.props.lobbyId
    }, function(data) {
      self.setState({
        chatMessages: JSON.parse(data).chat_log,
        messageAreaText: ""
      })
    })
  }

  onMessageChange(e) {
    this.setState({
      chatMessages: this.state.chatMessages,
      messageAreaText: e.target.value
    })
    this.render()
  }

  handleMessage(data) {
    console.log(data)
  }

  sendMessage() {
    let ws = new WebSocket('ws://' + window.location.host + window.location.pathname)
    
    ws.send(JSON.stringify({
      type: 'chat',
      lobbyId: this.props.lobbyId,
      username: this.props.username,
      message: this.state.messageAreaText
    }))
  }

  render() {
    return (
      <div className='chat'>
        <Websocket url={'ws://' + window.location.host + window.location.pathname} onMessage={this.handleMessage.bind(this)}/>
        <div className='chat-message-display'>
          {this.state.chatMessages.map(function(chatMessage, i) {
            return (
              <div key={i} className='chat-message'>{chatMessage.toString()}</div>
            )
          })}
        </div>
        <div className='chat-message-input-area'>
          <input type='textarea' value={this.state.messageAreaText} onChange={this.onMessageChange.bind(this)}/>
        </div>
        <div className='chat-message-submit'>
          <button onClick={this.sendMessage.bind(this)}>Create Lobby</button>
        </div>
      </div>
    )
  }
}

export default Chat