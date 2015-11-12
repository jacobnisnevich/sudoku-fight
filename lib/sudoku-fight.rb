require 'json'
require 'nokogiri'
require 'open-uri'
require 'mysql2'

[
  "sudoku_retriever.rb",
  "sudoku_score.rb",
  "user.rb",
  "game.rb"
].each do |file_name|
  require File.expand_path("../sudoku-fight/#{file_name}", __FILE__)
end
