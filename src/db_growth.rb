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
		return getAllIndustries(year, location) if industry.nil?
		return getAllLocations(industry, year) if location.nil?
		return getYearData(industry, location) if year.nil?
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

	def getAllIndustries(year, location)
		result = []
		getIndustryNames().each do |industry|
			result.push(getSpecific(industry, year, location))
		end
		result.compact!
		result.each_index{|i| result[i]['date'] = result[i]['date'].to_i*1000}
		return result
	end

	def getAllLocations(industry, year)
		result = []
		getLocationNames().each do |location|
			result.push(getSpecific(industry, year, location))
		end
		result.compact!
		result.each_index{|i| result[i]['date'] = result[i]['date'].to_i*1000}
		return result
	end

	def getYearData(industry, location)
		result = getYears().reduce([]) do |arr, year|
			arr << getSpecific(industry, year, location)
		end
		result.compact!
 		result.each_index{|i| result[i]['date'] = result[i]['date'].to_i*1000}
		return result
	end

  def getIndustryMax(industry)
    @openData.aggregate([
      {
        "$match" => {
          industry: industry,
          value: {"$ne" => 'x'}
          }
        },
      {
        "$group" => {
          _id: "$location",
          date: {"$max" => "$date"},
          value: {"$max" => "$value"}
        }
      },
      {
        "$sort" => {value: -1}
      }
    ])
  end

	def getIndustryNames
		@openData.distinct("industry")
	end

	def getLocationNames
		@openData.distinct("location")
	end

	def getYears
		@openData.aggregate([
			{"$group" => {_id: {year: {"$year"=> "$date"}}}}
		]).map do |entry|
			entry['_id']['year']
		end
	end

end
