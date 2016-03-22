import React, { PropTypes, Component } from 'react'
import NavButton from './NavButton'

class Navbar extends Component {
  render() {
    let profileButton = ""
    let loginButton = <NavButton buttonText="Login" clickEvent={this.props.goToLogin} />
    if (this.props.isLoggedIn) {
      profileButton = <NavButton buttonText="Profile" clickEvent={this.props.goToProfile} />      
      loginButton = <NavButton buttonText="Logout" clickEvent={this.props.beLoggedOut} />
    }

    return (
      <nav>
        <div className="navbar-inner">
          <div className="navbar-left">
            <div className="navbar-title">Sudoku Fight</div>
          </div>
          <div className="navbar-right">
            <NavButton buttonText="Practice" clickEvent={this.props.goToPractice} />
            <NavButton buttonText="Games" clickEvent={this.props.goToGames} />
            {profileButton}
            {loginButton}
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar