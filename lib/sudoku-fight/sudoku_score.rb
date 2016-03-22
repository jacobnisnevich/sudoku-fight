class SudokuScore
	def initialize(sudoku_board)
    @puzzle = sudoku_board
  end

  def get_percent_complete
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

  def is_finished
    (is_valid && get_percent_complete == 1)
  end

  def is_valid
    (rows_valid && cols_valid && boxes_valid)
  end

  private

  def rows_valid
    number_hash = {}

    @puzzle.each do |puzzle_row|
      puzzle_row.each do |puzzle_cell|
        if number_hash.has_key? puzzle_cell
          return false
        else
          number_hash[puzzle_cell] = true
        end
      end
    end

    true
  end

  def cols_valid
    true
  end

  def boxes_valid
    true
  end 
end