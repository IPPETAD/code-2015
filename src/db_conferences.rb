	require 'rubygems'
require 'json/ext'
require_relative './mongo_client_singleton'

class ConferenceData

	def initialize
		conn = MongoClientSingleton::instance
		@db = conn.db('james')
		@confData = @db['conferences']
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

	def searchConferences(text)
		@db.command({text: 'conferences', search: text})['results'].map do |result|
			result['obj']
		end
	end

	def putConference(conf)
		@confData.insert(conf)
	end

end
