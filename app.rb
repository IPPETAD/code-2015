require 'rubygems'
require 'bundler'
require './db_user'
Bundler.require(:default)
Bundler.require(:development)

class MyApp < Sinatra::Base

	configure do
		enable :sessions
		register Sinatra::Reloader if development?
		set :db_user, UserData.new
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

	#### AUTHENTICATION ####

	get '/login' do
		erb :main do
			erb :login
		end
	end

	post '/login' do
		session[:identity] = settings.db_user.authenticate(params['email'], params['password'])
		if session[:identity]
			redirect to '/'
		else
			redirect to '/login'
		end
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
