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
		erb :main do
			erb :home
		end
	end

	#### AUTHENTICATION ####

	get '/login' do
		erb :main do
			erb :login
		end
	end

	post '/login' do
	end

	get '/logout' do
		session.delete(:identity)
		redirect to '/'
	end

	get '/signup' do
		erb :main do
			erb :signup
		end
	end

	post '/signup' do

	end

end
