require 'rubygems'
require 'bundler'
require './sinatra/javascript'
require './src/db_user'
require './src/db_conferences'
require './src/db_growth'
Bundler.require(:default)
Bundler.require(:development)

class MyApp < Sinatra::Base
	helpers Sinatra::JavaScripts

	configure do
		enable :sessions
		register Sinatra::Reloader if development?
		set :db_user, UserData.new
		set :db_conf, ConferenceData.new
		set :db_growth, GrowthData.new
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

	before do
		logger.level = Logger::DEBUG
	end

	get '/' do
		js :home
		erb :home
	end

	get '/browse' do
		@title = "Browse Conferences"
		js :knockout, 'knockout/browse'
		erb :browse
	end

	get '/venues' do
		js :knockout, 'foursquare', 'knockout/venues'
		erb :venues
	end

	get '/growth' do
		js :knockout, :nvd3, 'growth/pie', 'growth/years', 'growth/timelapse', 'knockout/growth'
		erb :growth
	end

	post '/growth' do
		return settings.db_growth.get(params["industry"],params["year"],params["location"]).sort{|x,y| x["date"] <=> y["date"]}.to_json
	end

	#### AUTHENTICATION ####

	get '/login' do
		@title = "Log In"
		erb :login
	end

	post '/login' do
		session[:identity] = settings.db_user.authenticate(params['email'], params['password'])
		if session[:identity]
			redirect to '/'
		else
			# push_error('Invalid login')
			redirect to '/login'
		end
	end

	get '/logout' do
		session.delete(:identity)
		redirect to '/'
	end

	get '/signup' do
		@title = "Sign Up"
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

	get '/conference' do
		@title = "Conference Details"
		js :knockout, 'knockout/conference'
		erb :conference
	end

	get '/conference/new' do
		js :knockout, 'foursquare', 'knockout/new_conference', 'jquery.bootstrap.wizard'
		erb :new_conference
	end

	#### JSON API ####

	get '/api/conference' do
		content_type :json
		settings.db_conf.getConferences(0, 0).map do |item|
			item['_id'] = item['_id'].to_s
			item
		end.to_json
	end

	get '/api/conference/:id' do
		content_type :json
		conf = settings.db_conf.getConference(params[:id])
		conf['_id'] = conf['_id'].to_s
		conf.to_json
	end

	post '/api/conference/new' do
		"/conference##{settings.db_conf.putConference(params[:conf])}"
	end

	get '/api/industry' do
		content_type :json
		settings.db_growth.getIndustryNames.delete_if do |e|
			e == 'Total employed, all industries'
		end.to_json
	end

end
