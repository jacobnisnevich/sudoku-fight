require 'json'
require 'nokogiri'
require 'open-uri'

[
  "sudoku-retriever.rb",
  "sudoku_score.rb"
].each do |file_name|
  require File.expand_path("../sudoku-fight/#{file_name}", __FILE__)
end
