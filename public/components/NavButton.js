import React, { PropTypes, Component } from 'react'

class NavButton extends Component {
  render() {
    return (
      <span className="navbar-link" onClick={this.props.clickEvent}>{this.props.buttonText}</span>
    )
  }
}

export default NavButton