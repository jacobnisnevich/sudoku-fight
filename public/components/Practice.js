import React, { PropTypes, Component } from 'react'
import * as $ from 'jquery'

class Practice extends Component {
  generateSudoku() {
    $.get('/getSudokuPuzzle', {
      difficulty: 4
    }, function(data) {
      
    })
  }

  validateSudoku() {

  }

  render() {
    return (
      <div>
        <div class="practice-settings">
          <button class="generate-button" onClick=this.generateSudoku.bind(this)>Generate</button>
          <button class="validate-button" onClick=this.validateSudoku.bind(this)>Validate</button>
        </div>
        <Sudoku />
      </div>
    )
  }
}

export default Practice