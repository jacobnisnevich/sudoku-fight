import React, { PropTypes, Component } from 'react'
import NavButton from './NavButton'

class Navbar extends Component {
  render() {
    let profileButton = <NavButton buttonText="Login" clickEvent={this.props.goToLogin} />
    if (this.props.isLoggedIn) {
      profileButton = <NavButton buttonText="Profile" clickEvent={this.props.goToProfile} />
    }

    return (
      <nav>
        <div className="navbar-inner">
          <div className="navbar-left">
            <div className="navbar-title">Sudoku Fight</div>
          </div>
          <div className="navbar-right">
            <NavButton buttonText="Games" clickEvent={this.props.goToGames} />
            {profileButton}
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar