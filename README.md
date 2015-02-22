# ᴄᴏɴstellation

Conference planning and organizing. Redefined.

(Probably) available to test [on Azure](http://ippetad.cloudapp.net).

![ᴄᴏɴstellation](https://raw.githubusercontent.com/IPPETAD/code-2015/master/artwork/Promo_logo.png)
![Create](https://raw.githubusercontent.com/IPPETAD/code-2015/master/artwork/markets.png)
![Growth](https://raw.githubusercontent.com/IPPETAD/code-2015/master/artwork/growth.png)

(This project was written in 48 hours for the [Canadian Open Data Experience](http://canadianopendataexperience.com).)

## Open Data Used

* [Labour force survey estimates (LFS), employment by census metropolitan area based on 2006 census boundaries and North American Industry Classification System (NAICS), 3-month moving average, unadjusted for seasonality](http://open.canada.ca/data/en/dataset/fefa87de-56d8-4722-80a0-04c75a2f5a15)
* [Labour force survey estimates (LFS), employment by economic region based on 2011 census boundaries and North American Industry Classification System (NAICS), 3-month moving average, unadjusted for seasonality](http://open.canada.ca/data/en/dataset/fe12bef6-3588-40d5-83ca-8f81d551ce91)
* [Labour force survey estimates (LFS), by census metropolitan area based on 2011 census boundaries, 3-month moving average, seasonally adjusted and unadjusted](http://open.canada.ca/data/en/dataset/ff4ae904-561c-43b5-8389-1578d1b18b28)
* [FourSquare API](https://foursquare.com/)

## Tech Stack

* Database: [MongoDB](http://www.mongodb.org)
* Back-end web: [Ruby](https://www.ruby-lang.org/en/) with modules including:
 * [Sinatra](http://www.sinatrarb.com/) web framework
* Front-end web: 
 * [Bootstrap](http://getbootstrap.com) based CSS theme
 * [D3.js](http://d3js.org) for visualizations
 * [NVD3.js](http://nvd3.org/) for pretty visualizations
 * [jQuery](http://jquery.com) to make JavaScript easier
 * [Leaflet](http://leafletjs.com) to make pretty maps
 * [KnockOutJS](http://knockoutjs.com/) for data binding
 * [IntroJS](https://usablica.github.io/intro.js/) for system tour
 
## How to Run

Download and run:
	
	git clone https://github.com/IPPETAD/code-2015
	
	cd code-2015
	bundle install					# To install sinatra
	rvmsudo rackup					# To run portal
