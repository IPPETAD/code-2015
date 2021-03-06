require 'rubygems'
require 'json/ext'
require_relative './mongo_client_singleton'

class UserData

  def initialize
    conn = MongoClientSingleton::instance
    db = conn.db('james')
    @userData = db['users']
  end

  #
  # Authenticate user from given username and password
  #
  def authenticate(email, password)
    email.downcase!
    @userData.find({
      "email" => email,
      "password" => password
    }).count.to_i > 0
  end

  #
  # Currently just returns whether user exists
  #
  def getUser(email)
    email.downcase!
    @userData.find({
      "email" => email
    }).count.to_i > 0
  end

  #
  # Store user info in database
  #
  def storeUser(email, password)
    @userData.insert({
      'email' => email,
      'password' => password
    })
  end

end
