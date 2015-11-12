class SudokuRetriever
  def getRandomPuzzle(difficulty)
    # difficulty - 1 - super easy
    #              9 - impossible
    @webpage = Nokogiri::HTML(open("http://www.menneske.no/sudoku/eng/random.html?diff=#{difficulty}"))
    nbsp = Nokogiri::HTML("&nbsp;").text

    cells_array = []

    @webpage.css("#bodycol .grid table td").each do |cell|
      cells_array.push(cell.children[0].text.gsub(nbsp, " "))
    end

    formatCellsArray(cells_array)
  end

  private

  def formatCellsArray(cells_array)
    sudoku_puzzle = []
    temp_row = []

    cells_array.each do |cell|
      temp_row.push(cell)

      if temp_row.length == 9
        sudoku_puzzle.push(temp_row)
        temp_row = []
      end
    end

    sudoku_puzzle
  end
end