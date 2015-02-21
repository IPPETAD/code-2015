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
          "<script src=\"#{path_to script}\"></script>"
        end.join
      end
 
      def path_to_script
        case script
          when :knockout
            ['https://cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-min.js', 'public/js/knockouts/models.js']
          else 'js/' + script.to_s + '.js'
        end
      end
  end
 
  helpers JavaScripts
end