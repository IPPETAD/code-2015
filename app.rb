require 'rubygems'
require 'bundler'
Bundler.require(:default)
Bundler.require(:development) unless ENV['RACK_ENV']

class MyApp < Sinatra::Base
	configure :development do
		register Sinatra::Reloader
	end

	configure do
		enable :sessions
	end

	helpers do
		
		# Whether user is authenticated
		def authenticated?
			not session[:identity].nil?
		end
	end

	get '/' do
		erb :main do
			erb :home
		end
	end

end
