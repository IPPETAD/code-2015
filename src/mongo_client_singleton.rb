require 'mongo'
require 'singleton'

class MongoClientSingleton
  include Singleton

  attr_reader :client

  def initialize
    @client = Mongo::MongoClient.new('ippetad.cloudapp.net')
  end

  def method_missing(method, *args)
    self.client.send(method, *args)
  end
end
