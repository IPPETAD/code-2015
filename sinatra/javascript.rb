require 'sinatra/base'

# Source: http://www.sitepoint.com/using-sinatra-helpers-to-clean-up-your-code/
module Sinatra
  module JavaScripts
      def js *scripts
        @js ||= []
        @js = scripts
      end

      def javascripts(*args)
        js = []
        js << settings.javascripts if settings.respond_to?('javascripts')
        js << args
        js << @js if @js
        js.flatten.uniq.map do |script|
          path_to(script).map do |script|
            "<script src=\"#{script}\"></script>"
          end
        end.join
      end

      def path_to script
        case script
        when :knockout then ['https://cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-min.js',
          'https://cdn.rawgit.com/SteveSanderson/knockout-projections/master/dist/knockout-projections.min.js',
          'js/knockout/extensions.js',
          'js/knockout/models.js']
        else ['js/' + script.to_s + '.js']
        end
      end
  end

  helpers JavaScripts
end
