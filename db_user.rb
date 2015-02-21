require 'rubygems'
require 'mongo'
require 'json/ext'

include Mongo

class UserData

  def initialize
    conn = MongoClient.new("localhost", 27017)
    db = conn.db('james')
    @userData = db['userData']
  end

  #
  # Authenticate user from given username and password
  #
  def authenticate(username, password)
    username.downcase!
    @userData.find({
      "username" => username,
      "password" => password
    }).count.to_i == 0
  end
  
end
