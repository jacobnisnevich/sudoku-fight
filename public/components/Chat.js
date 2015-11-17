import React, { PropTypes, Component } from 'react'
import Websocket from 'react-websocket'
import * as $ from 'jquery'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chatMessages: [],
      messageAreaText: "",
      ws: new WebSocket('ws://' + window.location.host + window.location.pathname)
    }
  }

  componentDidMount() {
    let self = this
  
    $.post('/getLobbyData', {
      lobbyId: this.props.lobbyId
    }, function(data) {
      self.setState({
        chatMessages: JSON.parse(data).chat_log ? JSON.parse(data).chat_log : [],
        messageAreaText: "",
        ws: self.state.ws
      })
    })
  }

  onMessageChange(e) {
    this.setState({
      chatMessages: this.state.chatMessages,
      messageAreaText: e.target.value,
      ws: this.state.ws
    })
    this.render()
  }

  onKeyPress(e) {
    if (e.charCode === 13) {
      e.preventDefault()
      this.sendMessage()
    }
  }

  handleMessage(data) {
    if (data.type === 'chat') {
      if (data.lobbyId === this.props.lobbyId) {
        this.setState({
          chatMessages: this.state.chatMessages.concat({
            username: data.username,
            message: data.message
          }),
          messageAreaText: this.state.messageAreaText,
          ws: this.state.ws
        })
      }
    }
  }

  sendMessage() {    
    this.send(JSON.stringify({
      type: 'chat',
      lobbyId: this.props.lobbyId,
      username: this.props.username,
      message: this.state.messageAreaText
    }))
    this.setState({
      chatMessages: this.state.chatMessages,
      messageAreaText: '',
      ws: this.state.ws
    })
  }

  send(message, callback) {
    let self = this

    this.waitForConnection(function () {
        self.state.ws.send(message)
        if (typeof callback !== 'undefined') {
          callback()
        }
    }, 1000)
  }

  waitForConnection(callback, interval) {
      if (this.state.ws.readyState === 1) {
          callback()
      } else {
          let self = this
          setTimeout(function () {
              self.waitForConnection(callback, interval);
          }, interval)
      }
  }

  render() {
    return (
      <div className='chat'>
        <Websocket url={'ws://' + window.location.host + window.location.pathname} onMessage={this.handleMessage.bind(this)}/>
        <div className='chat-message-display'>
          {this.state.chatMessages.map(function(chatMessage, i) {
            return (
              <div key={i} className='chat-message'>{chatMessage.username}: {chatMessage.message}</div>
            )
          })}
        </div>
        <div className='chat-message-input-area'>
          <input type='textarea' value={this.state.messageAreaText} onChange={this.onMessageChange.bind(this)} onKeyPress={this.onKeyPress.bind(this)}/>
        </div>
        <div className='chat-message-submit'>
          <button onClick={this.sendMessage.bind(this)}>Send</button>
        </div>
      </div>
    )
  }
}

export default Chat