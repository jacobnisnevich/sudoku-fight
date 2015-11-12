import React, { PropTypes, Component } from 'react'
import * as $ from 'jquery'

class CreateLobby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      difficulty: 5,
      capacity: 4
    }
  }

  onNameChange(e) {
    this.setState({
      name: e.target.value,
      difficulty: this.state.difficulty,
      capacity: this.state.capacity
    })
    this.render()
  }

  onDifficultyChange(e) {
    this.setState({
      name: this.state.name,
      difficulty: e.target.value,
      capacity: this.state.capacity
    })
    this.render()
  }

  onCapacityChange(e) {
    this.setState({
      name: this.state.name,
      difficulty: this.state.difficulty,
      capacity: e.target.value
    })
    this.render()
  }

  createLobby(e) {
    e.preventDefault()

    $.post('/createLobby', {
      'user': this.props.username,
      'name': this.state.name,
      'difficulty': this.state.difficulty,
      'capacity': this.state.capacity
    })

    this.props.goToGames()
  }

  render() {
    let beforeLabelStyle = {
      width: '50%',
      textAlign: 'right'
    }

    return (
      <div className='create-lobby-form'>
        <form>
          <div>
            <label className='form-justify'>Lobby Name&nbsp;
              <input type='text' value={this.state.name} onChange={this.onNameChange.bind(this)}/>
            </label>
          </div>
          <div>
            <label className='form-justify'>Difficulty&nbsp;
              <div style={beforeLabelStyle}>{this.state.difficulty}</div>
              <input type='range' min='1' max='9' value={this.state.difficulty} onChange={this.onDifficultyChange.bind(this)}/>
            </label>
          </div>
          <div>
            <label className='form-justify'>Capacity&nbsp;
              <div style={beforeLabelStyle}>{this.state.capacity}</div>
              <input type='range' min='2' max='4' value={this.state.capacity} onChange={this.onCapacityChange.bind(this)}/>
            </label>
          </div>
          <div className='form-buttons'>
            <button onClick={this.createLobby.bind(this)}>Create Lobby</button>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateLobby