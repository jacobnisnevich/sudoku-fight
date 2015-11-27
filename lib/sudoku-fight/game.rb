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
    get_max_id_query = "SELECT MAX(id) AS id FROM sudoku_lobbies"
    query_output = @client.query(get_max_id_query)

    next_id = query_output.first['id'].to_i + 1

    player_elo_query = "SELECT elo FROM sudoku_users WHERE user='#{username}'"
    query_output = @client.query(player_elo_query)

    player_elo = query_output.first['elo'].to_i

    create_lobby_query = "INSERT INTO sudoku_lobbies (id, status, name, difficulty, capacity, p_1_name, p_1_elo, p_1_status) VALUES \ 
                          (#{next_id}, #{@game_status[:OPEN]}, '#{lobby_name}', #{difficulty}, #{capacity}, '#{username}', #{player_elo}, 'not_ready')"
    @client.query(create_lobby_query)

    {
      "success" => true
    }
  end

  def join_lobby(player_id, lobby_id)

  end

  def start_game(lobby_id)

  end

  def store_message(lobby_id, message) 
    select_query = "SELECT chat_log FROM sudoku_lobbies WHERE id=#{lobby_id}"
    query_output = @client.query(select_query)
    chat_log = query_output.first['chat_log'] ? JSON.parse(query_output.first['chat_log']) : []

    chat_log = chat_log.push(message)
    chat_log_string = @client.escape(chat_log.to_json.to_s)
    store_chat_query = "UPDATE sudoku_lobbies SET chat_log='#{chat_log_string}' WHERE id=#{lobby_id}"
    @client.query(store_chat_query)
  end

  def get_lobby_data(lobby_id)
    select_query = "SELECT * FROM sudoku_lobbies WHERE id=#{lobby_id}"
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
    select_query = "SELECT * FROM sudoku_lobbies WHERE status=#{@game_status[:OPEN]}"
    query_output = @client.query(select_query)
    query_output.to_a
  end

  def get_started_games
    select_query = "SELECT * FROM sudoku_lobbies WHERE status=#{@game_status[:STARTED]}"
    query_output = @client.query(select_query)
    query_output.to_a
  end

  def get_finished_games
    select_query = "SELECT * FROM sudoku_lobbies WHERE status=#{@game_status[:FINISHED]}"
    query_output = @client.query(select_query)
    query_output.to_a
  end

  def join_game 
    select_query = "SELECT * FROM sudoku_lobbies WHERE id=#{lobby_id}"
    query_output = @client.query(select_query)
    lobby = query_output.first

    1.upto(4) do |i|
      if lobby["p_#{i}_name"].nil?
        select_query = "SELECT * FROM sudoku_users WHERE user='#{username}'"
        query_output = @client.query(select_query)
        player = query_output.first

        update_lobby_query = "UPDATE sudoku_lobbies SET p_#{i}_name='#{username}', 
                                                        p_#{i}_elo=#{player['elo']}, 
                                                        p_#{i}_status='not_ready' WHERE id=#{lobby_id}"
        @client.query(update_lobby_query)
        return "User #{username} joined lobby #{lobby_id}"
      end
    end

    "Failed to insert user"
  end

  def toggle_status
    select_query = "SELECT * FROM sudoku_lobbies WHERE id=#{lobby_id}"
    query_output = @client.query(select_query)
    lobby = query_output.first

    1.upto(4) do |i|
      if lobby["p_#{i}_name"] == username
        current_status = lobby["p_#{i}_status"]
        next_status = (current_status == "not_ready") ? "ready" : "not_ready"

        update_status_query = "UPDATE sudoku_lobbies SET p_#{i}_status='#{next_status}' WHERE id=#{lobby_id}"
        @client.query(update_lobby_query)
        return "Toggled status of #{username} in lobby #{lobby_id}"
      end
    end

    "Failed to toggle status"
  end
end