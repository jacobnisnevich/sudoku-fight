import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as views from '../constants/Views'
import Navbar from '../components/Navbar'
import MainView from './MainView'
import * as SudokuActions from '../actions/sudoku'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {view: views.LOBBIES}
  }

  goToGames() {
    this.setState({view: views.LOBBIES})
    this.render()
  }

  goToCreateGame() {
    this.setState({view: views.CREATE_LOBBY})
    this.render()
  }

  goToLogin() {
    this.setState({view: views.LOGIN})
    this.render()
  }

  goToProfile() {
    this.setState({view: views.PROFILE})
    this.render()
  }

  render() {
    const { user, actions } = this.props
    return (
      <div>
        <Navbar isLoggedIn={this.props.user.isLoggedIn}
                goToGames={this.goToGames.bind(this)}
                goToLogin={this.goToLogin.bind(this)}
                goToProfile={this.goToProfile.bind(this)} />
        <MainView view={this.state.view}
                  goToCreateGame={this.goToCreateGame.bind(this)}/>
      </div>
    )
  }
}


App.propTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SudokuActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)