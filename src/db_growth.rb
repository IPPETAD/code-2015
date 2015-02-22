require 'rubygems'
require 'json/ext'
require_relative './mongo_client_singleton'

class GrowthData

    def initialize
        conn = MongoClientSingleton::instance
        @db = conn.db('james')
        @openData = @db['employed']
    end

	def get(industry, year, location)
		return getAllIndustry(year, location) if industry.nil?
		return getSpecific(industry, year, location);
	end

	def getSpecific(industry, year, location)
		@openData.find_one({
			"industry" => industry,
			"date" => {"$lt" => Time.new(year.to_i+1), "$gte" => Time.new(year.to_i)},
			"location" => location,
		})
		#{:sort => {"date":-1}})
	end

	def getAllIndustry(year, location)
		result = []
		getIndustryNames().each do |industry|
			result.push(getSpecific(industry, year, location))
		end
		return result
	end

	def getIndustryNames
		@openData.distinct("industry")
	end

	def getLocationNames
		@openData.distinct("location")
	end

end
