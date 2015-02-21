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
  def authenticate(email, password)
    email.downcase!
    @userData.find({
      "email" => email,
      "password" => password
    }).count.to_i == 0
  end
  
end
