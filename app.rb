require 'rubygems'
require 'bundler'
Bundler.require(:default)
Bundler.require(:development) unless ENV['RACK_ENV']

class MyApp < Sinatra::Base
	configure :development do
		register Sinatra::Reloader
	end

	get '/' do
		'Hello everyone!'
	end

end
