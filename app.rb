require 'rubygems'
require 'bundler'
Bundler.require(:default)
Bundler.require(:development) if development?

class MyApp < Sinatra::Base

	get '/' do
		'Hello everyone!'
	end

end
