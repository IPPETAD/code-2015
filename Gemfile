source 'https://rubygems.org'

gem 'sinatra', require: 'sinatra/base'
gem 'mongo'

group :development do
	gem 'pry'
	gem 'pry-byebug'
	gem 'sinatra-contrib', require: 'sinatra/reloader'
end

group :production do
	gem 'bson_ext'
	gem 'unicorn'
end
