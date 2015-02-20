require 'bundler'
Bundler.require(:default)
Bundler.require(:development)

get '/' do
	'Hello everyone!'
end
