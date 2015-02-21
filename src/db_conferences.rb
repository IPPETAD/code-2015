require 'rubygems'
require 'mongo'
require 'json/ext'

include Mongo

class ConferenceData

	def initialize
		conn = MongoClient.new("localhost", 27017)
		db = conn.db('james')
		@confData = db['conferences']
	end

	def countConferences
		@confData.count().to_i
	end

	def getConferences(count, skip)
		@confData.find({}, {
			:skip => skip,
			:limit => count
		}).to_a
	end

	
end
