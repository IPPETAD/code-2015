require 'rubygems'
require 'json/ext'
require 'bson'
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
			:limit => count,
			:fields => ['_id', 'title', 'topic', 'description', 'image', 'tags']
		}).to_a
	end

	def getConference(id)
		@confData.find_one({
			'_id' => BSON::ObjectId(id)
			})
	end

	def searchConferences(text)
		@db.command({text: 'conferences', search: text})['results'].map do |result|
			result['obj']
		end
	end

	def putConference(conf)
		@confData.insert(conf)
	end

	def updateConference(conf)
		conf['_id'] = BSON::ObjectId(conf['_id'].to_s)
		@confData.update({'_id' => BSON::ObjectId(conf['_id'].to_s)}, conf)
	end

end
