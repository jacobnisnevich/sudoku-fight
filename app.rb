require 'sinatra'
require 'json'
require 'sinatra-websocket'

require File.expand_path('../lib/sudoku-fight.rb', __FILE__)

set :views, proc { File.join(root, 'public') }
set :server, 'thin'
set :sockets, []

get '/' do
  if !request.websocket?
    erb :index
  else
    request.websocket do |ws|
      ws.onopen do
        settings.sockets << ws
      end
      ws.onmessage do |msg|
        msg_parsed = JSON.parse(msg)
        case msg_parsed['type']
        when 'score'
          sudoku_score = SudokuScore.new(msg_parsed['data'])
          EM.next_tick do
            settings.sockets.each do |s|
              s.send(sudoku_score.getPercentComplete.to_json)
            end
          end
        end
      end
      ws.onclose do
        settings.sockets.delete(ws)
      end
    end
  end
end

get '/getSudokuPuzzle' do
  sudoku_retriever = SudokuRetriever.new
  sudoku_retriever.getRandomPuzzle(params[:difficulty]).to_json
end

post '/registerUser' do
  user = User.new
  user.create_account(params[:username], params[:password]).to_json
end

post '/loginUser' do
  user = User.new
  user.validate_login(params[:username], params[:password]).to_json
end
