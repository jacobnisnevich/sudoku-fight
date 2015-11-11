import React, { PropTypes, Component } from 'react'
import * as $ from 'jquery'

class CreateLobby extends Component {
  createLobby(e) {
    e.preventDefault()

    this.validateForm()

    $.post('/createLobby', {
      'user': 
      'name': this.props.name,
      'difficulty': this.props.difficulty,
      'capacity': this.props.capacity
    })
  }

  render() {
    return (
      <div className='create-lobby-form'>
        <form onSubmit={this.createLobby.bind(this)}>
          <div>
            <label>Lobby Name</label>
            <input type='text' value={this.props.name} />
          </div>
          <div>
            <label>Difficulty</label>
            <input type='text' value={this.props.difficulty} />
          </div>
          <div>
            <label>Capacity</label>
            <input type='text' value={this.props.capacity} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default CreateLobby