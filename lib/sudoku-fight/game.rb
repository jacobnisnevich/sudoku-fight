class Game
  def initialize
    @client = Mysql2::Client.new(
      :adapter  => 'mysql2',
      :host     => 'jacob-aws.cksaafhhhze5.us-west-1.rds.amazonaws.com',
      :username => ENV['MYSQL_USERNAME'],
      :password => ENV['MYSQL_PASSWORD'],
      :database => 'jacob'
    )

    @game_status = {
      :OPEN => 0,
      :STARTED => 1,
      :FINISHED => 2
    }
  end

  def create_lobby(username, lobby_name, difficulty, capacity)
    get_max_id_query = "SELECT MAX(id) AS id FROM sudoku_games"
    query_output = @client.query(get_max_id_query)

    next_id = query_output.first['id'].to_i + 1

    player_elo_query = "SELECT elo FROM sudoku_users WHERE user='#{username}'"
    query_output = @client.query(player_elo_query)

    player_elo = query_output.first['elo'].to_i

    create_lobby_query = "INSERT INTO sudoku_games (id, status, name, difficulty, capacity, p_1_name, p_1_elo) VALUES \ 
                          (#{next_id}, #{@game_status[:OPEN]}, '#{lobby_name}', #{difficulty}, #{capacity}, '#{username}', #{player_elo})"
    @client.query(create_lobby_query)

    {
      "success" => true
    }
  end

  def join_lobby(player_id, lobby_id)

  end

  def start_game(lobby_id)

  end

  def get_lobby_data(lobby_id)
    select_query = "SELECT * FROM sudoku_games WHERE id=#{lobby_id}"
    query_output = @client.query(select_query)
    query_output.first
  end

  def get_all_games
    all_games = {}

    all_games["openGames"] = get_open_games
    all_games["startedGames"] = get_started_games
    all_games["finishedGames"] = get_finished_games

    all_games
  end

  def get_open_games
    select_query = "SELECT * FROM sudoku_games WHERE status=#{@game_status[:OPEN]}"
    query_output = @client.query(select_query)
    query_output.to_a
  end

  def get_started_games
    select_query = "SELECT * FROM sudoku_games WHERE status=#{@game_status[:STARTED]}"
    query_output = @client.query(select_query)
    query_output.to_a
  end

  def get_finished_games
    select_query = "SELECT * FROM sudoku_games WHERE status=#{@game_status[:FINISHED]}"
    query_output = @client.query(select_query)
    query_output.to_a
  end
end