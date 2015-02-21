require 'rubygems'
require 'bundler'
Bundler.require(:default)
Bundler.require(:development)

class MyApp < Sinatra::Base

	configure do
		enable :sessions
		register Sinatra::Reloader if development?
	end

	helpers do

		# Whether user is authenticated
		def authenticated?
			not session[:identity].nil?
		end
	end

	get '/' do
		erb :home
	end

end
