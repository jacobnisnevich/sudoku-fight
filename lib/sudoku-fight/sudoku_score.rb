class SudokuScore
	def initialize(sudoku_board)
    @puzzle = sudoku_board
  end

  def getPercentComplete
    cells_filled = 0

    @puzzle.each do |puzzle_row|
      puzzle_row.each do |cell|
        if !cell.empty?
          cells_filled = cells_filled + 1
        end
      end
    end

    (cells_filled / 81.0).round(2)
  end

  def isFinished
    (isValid && getPercentComplete == 1)
  end

  def isValid
    (rowsValid && colsValid && boxesValid)
  end

  private

  def rowsValid

  end

  def colsValid
    true
  end

  def boxesValid
    true
  end 
end