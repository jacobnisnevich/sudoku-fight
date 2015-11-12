import React, { PropTypes, Component } from 'react'
import { logIn } from '../actions/sudoku'
import * as $ from 'jquery'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      errorMessage: ''
    }
  }

  onUsernameChange(e) {
    this.setState({
      username: e.target.value,
      password: this.state.password,
      errorMessage: this.state.errorMessage
    })
    this.render()
  }

  onPasswordChange(e) {
    this.setState({
      username: this.state.username,
      password: e.target.value,
      errorMessage: this.state.errorMessage
    })
    this.render()
  }

  loginUser(e) {
    e.preventDefault()

    self = this

    $.post('/loginUser', {
      username: this.state.username,
      password: this.state.password
    }, function(data) {
      self.handleLogin(data)
    })
  }

  registerUser(e) {
    e.preventDefault()

    self = this

    $.post('/registerUser', {
      username: this.state.username,
      password: this.state.password
    }, function(data) {
      self.handleLogin(data)
    })
  }

  handleLogin(data) {
    let parsedData = JSON.parse(data)
    if (parsedData.success) {
      this.setState({
        username: this.state.username,
        password: this.state.password,
        errorMessage: ''
      })
      this.render()
      this.props.beLoggedIn(this.state.username)
    } else {
      this.setState({
        username: this.state.username,
        password: this.state.password,
        errorMessage: parsedData.message
      })
      this.render()
    }
  }

  render() {
    return (
      <div className='login-form'>
        <form>
          <div>
            <label className='form-justify'>Username&nbsp;
              <input type='text' value={this.state.username} onChange={this.onUsernameChange.bind(this)}/>
            </label>
          </div>
          <div>
            <label className='form-justify'>Password&nbsp;
              <input type='password' value={this.state.password} onChange={this.onPasswordChange.bind(this)}/>
            </label>
          </div>
          <div className='login-form-buttons'>
            <button onClick={this.loginUser.bind(this)}>Login</button>
            <button onClick={this.registerUser.bind(this)}>Register</button>
          </div>
          <div className='login-error'>{this.state.errorMessage}</div>
        </form>
      </div>
    )
  }
}

export default Login