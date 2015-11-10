require 'sinatra'
require 'json'
require 'sinatra-websocket'

require File.expand_path('../lib/sudoku-fight.rb', __FILE__)

set :views, Proc.new { File.join(root, "public") } 
set :server, 'thin'
set :sockets, []

get '/' do
  if !request.websocket?
    sudokuRetriever = SudokuRetriever.new
    puzzle = sudokuRetriever.getRandomPuzzle(2)

    erb :index, :locals => {:puzzle => puzzle}
  else
    request.websocket do |ws|
      ws.onopen do
        settings.sockets << ws
      end
      ws.onmessage do |msg|
        msg_parsed = JSON.parse(msg)
        case msg_parsed["type"]
        when "score"
          sudokuScore = SudokuScore.new(msg_parsed["data"])
          EM.next_tick { settings.sockets.each{|s| s.send(sudokuScore.getPercentComplete.to_json) } }
        end
      end
      ws.onclose do
        settings.sockets.delete(ws)
      end
    end
  end
end
