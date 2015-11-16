import React, { PropTypes, Component } from 'react'
import Websocket from 'react-websocket'
import * as $ from 'jquery'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chatMessages: []
    }
  }

  componentDidMount() {
    self = this
  
    $.post('/getLobbyData', {
      lobbyId: this.props.lobbyId
    }, function(data) {
      self.setState({
        chatMessages: JSON.parse(data).chat_log
      })
    })
  }

  handleData(data) {
    console.log(data)
  }

  render() {
    return (
      <div className='chat'>
        <Websocket url='ws://localhost:4567/' onMessage={this.handleData.bind(this)}/>
        <div className='chat-message-display'>
          {this.state.chatMessages.map(function(chatMessage, i) {
            return (
              <div key={i} className='chat-message'>{chatMessage.toString()}</div>
            )
          })}
        </div>
        <div className='chat-message-input-area'>
          <input type='textarea' />
        </div>
      </div>
    )
  }
}

export default Chat