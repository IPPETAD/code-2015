require 'rubygems'
require 'bundler/setup'
require 'sinatra'

class MyApp < Sinatra::Base

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
