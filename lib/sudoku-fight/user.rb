class User
  def initialize()
    @client = Mysql2::Client.new(
      :adapter  => 'mysql2',
      :host     => 'jacob-aws.cksaafhhhze5.us-west-1.rds.amazonaws.com',
      :username => ENV['MYSQL_USERNAME'],
      :password => ENV['MYSQL_PASSWORD'],
      :database => 'jacob'
    )
  end

  def create_account(username, password)
    password_hash = Digest::SHA2.hexdigest password

    get_max_id_query = "SELECT MAX(id) AS id FROM sudoku_users"
    query_output = @client.query(get_max_id_query)

    next_id = query_output.first["id"].to_i + 1

    check_name_exists_query = "SELECT * FROM sudoku_users WHERE user='#{username}'"
    query_output = @client.query(check_name_exists_query)

    if query_output.count > 0
      return {
        :success => false,
        :message => "User with that username already exists"
      }
    end

    new_account_query = "INSERT INTO sudoku_users (id, user, password_hash, elo) VALUES (#{next_id}, '#{username}', '#{password_hash}', 1500)"
    @client.query(new_account_query)

    {
      :success => true,
      :message => ""
    }
  end

  def validate_login(username, password) 
    password_hash = Digest::SHA2.hexdigest password
    validate_login_query = "SELECT password_hash FROM sudoku_users WHERE user='#{username}'"
    query_output = @client.query(validate_login_query)

    if query_output.first["password_hash"] == password_hash
      return {
        :success => true,
        :message => ""
      }
    else
      return {
        :success => false,
        :message => "Invalid username or password"
      }
    end
  end
end
