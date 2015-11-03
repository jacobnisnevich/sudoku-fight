require 'sinatra'
require 'json'

require File.expand_path('../lib/sudoku-fight.rb', __FILE__)

set :views, Proc.new { File.join(root, "public") } 

get '/' do
  sudokuRetriever = SudokuRetriever.new
  puzzle = sudokuRetriever.getRandomPuzzle(9)

  erb :index, :locals => {:puzzle => puzzle}
end
