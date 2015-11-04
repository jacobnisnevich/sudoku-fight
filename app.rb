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
    puzzle = sudokuRetriever.getRandomPuzzle(4)

    erb :index, :locals => {:puzzle => puzzle}
  else
    request.websocket do |ws|
      ws.onopen do
        ws.send("Hello World!")
        settings.sockets << ws
      end
      ws.onmessage do |msg|
        EM.next_tick { settings.sockets.each{|s| s.send(msg) } }
      end
      ws.onclose do
        warn("websocket closed")
        settings.sockets.delete(ws)
      end
    end
  end
end
