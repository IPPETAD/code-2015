require 'rubygems'
require 'bundler'
require './src/db_user'
require './src/db_conferences'
Bundler.require(:default)
Bundler.require(:development)

class MyApp < Sinatra::Base

	configure do
		enable :sessions
		register Sinatra::Reloader if development?
		set :db_user, UserData.new
		set :db_conf, ConferenceData.new
	end

	helpers do
		# Whether user is authenticated
		def authenticated?
			not session[:identity].nil?
		end

		# Get all errors and reset array
		def pop_errors
			tmp = session[:errors] || []
			session[:errors] = []
			return tmp
		end

		# Add error to array
		def push_error(error)
			(session[:errors] ||= []).push(error)
		end

	end

	get '/' do
		erb :home
	end

	get '/browse' do
		query = params[:q]
		page = [(params[:page] || 1).to_i, 1].min
		filters = params[:filter]

		page_count = (settings.db_conf.countConferences() / 10)

		erb :browse, :locals => {
			:params => params,
			:filter => filters,
			:page => page,
			:page_count => page_count+1,
			:conferences => settings.db_conf.getConferences(10, page_count*(page-1))
		}
	end

	#### AUTHENTICATION ####

	get '/login' do
		erb :login
	end

	post '/login' do
		session[:identity] = settings.db_user.authenticate(params['email'], params['password'])
		if session[:identity]
			redirect to '/'
		else
			push_error('Invalid login')
			redirect to '/login'
		end
	end

	get '/logout' do
		session.delete(:identity)
		redirect to '/'
	end

	get '/signup' do
		erb :signup
	end

	post '/signup' do
		push_error("Email taken") if settings.db_user.getUser(params['email'])
		push_error("Passwords must match") if not (params['password'] == params['re-password'])

		if not session[:errors] or session[:errors].empty?
			session[:identity] = 1
			settings.db_user.storeUser(params['email'], params['password'])
			redirect to '/'
		else
			redirect to '/signup'
		end
	end

end
