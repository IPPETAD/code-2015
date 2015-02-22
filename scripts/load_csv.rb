# encoding: utf-8

require 'mongo'
require 'csv'

conn = Mongo::MongoClient.new('localhost')
db = conn.db('james')
coll = db['employed']

CSV.foreach("data/02820111-eng.csv", {:encoding => 'windows-1251:utf-8', headers: true}) do |row|
	d = row[0].split("/")
	date = Time.new(d[0], d[1])

	coll.insert({
		'date' => date,
		'location' => row[1],
		'location_code' => row[2],
		'industry' => row[3][0...-10],
		'vector' => row[4],
		'value' => row[6]
	})
end
