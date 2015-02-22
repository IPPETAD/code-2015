require 'mongo'

client = Mongo::MongoClient.new('localhost')
og = client.db('james')['employed']
new = client.db('james')['hacky']

locations = ["Newfoundland and Labrador", "Prince Edward Island", "Nova Scotia", "New Brunswick", "Quebec", "Ontario", "Manitoba", "Saskatchewan", "Alberta", "British Columbia"]
["Newfoundland and Labrador", "Prince Edward Island", "Nova Scotia", "New Brunswick", "Quebec", "Ontario", "Manitoba", "Saskatchewan", "Alberta", "British Columbia"]
years = [2009, 2015]
industries = ["Total employed, all industries", "Goods-producing sector", "Agriculture", "Forestry, fishing, mining, quarrying, oil and gas", "Utilities", "Construction", "Manufacturing", "Services-producing sector", "Trade", "Transportation and warehousing", "Finance, insurance, real estate and leasing", "Professional, scientific and technical services", "Business, building and other support services", "Educational services", "Health care and social assistance", "Information, culture and recreation", "Accommodation and food services", "Other services", "Public administration"]

locations.each do |loc|
	industries.each do |industry|
		result = []
		years.each do |year|
			result.push(og.find_one({
				"industry" => industry,
				"date" => {"$lt" => Time.new(year+1), "$gte" => Time.new(year)}, 
				"location" => loc
			}))
		end
		result[0]["value"] = result[1]["value"].to_f - result[0]["value"].to_f
		new.insert(result[0])	
	end
end
