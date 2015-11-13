import React, { PropTypes, Component } from 'react'

class GamesTable extends Component {
  render() {
    return (
      <div className='games-list'>
        <div className='games-list-item-head'>
          <div className='games-list-cell'>Name</div>
          <div className='games-list-cell'>Difficulty</div>
          <div className='games-list-cell'>Capacity</div>
          <div className='games-list-cell'>Player 1</div>
          <div className='games-list-cell'>Player 2</div>
          <div className='games-list-cell'>Player 3</div>
          <div className='games-list-cell'>Player 4</div>
        </div>
        {this.props.gamesArray.map(function(game, i) {
          return (
            <div className='games-list-item'>
              <div className='games-list-cell'>{game.name}</div>
              <div className='games-list-cell'>{game.difficulty}</div>
              <div className='games-list-cell'>{game.capacity}</div>
              <div className='games-list-cell'>{game.p_1_name}</div>
              <div className='games-list-cell'>{game.p_2_name}</div>
              <div className='games-list-cell'>{game.p_3_name}</div>
              <div className='games-list-cell'>{game.p_4_name}</div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default GamesTable