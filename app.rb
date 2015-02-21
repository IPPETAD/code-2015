require 'rubygems'
require 'bundler/setup'
require 'sinatra'

class MyApp < Sinatra::Base

	get '/' do
		'Hello everyone!'
	end

end
