searchVisible = 0;
transparent = true;


var prov_to_gps = {
    'Alberta': [53.544, -113.4909],
    'British Columbia': [48.4222, -123.3657],
    'Saskatchewan': [50.4547, -104.6067],
    'Manitoba': [49.8994, -97.1392],
    'Ontario': [43.700, -79.400],
    'Quebec': [46.8167, -71.2167],
    'Nova Scotia': [44.649050, -63.575794],
    'Newfoundland and Labrador': [47.5675, -52.7072],
    'Prince Edward Island': [46.2400, -63.1399],
    'New Brunswick': [45.9500, -67.6667]
}

var prov_to_city = {
    'Alberta': 'Edmonton, AB',
    'British Columbia': 'Victoria, BC',
    'Saskatchewan': 'Regina, SK',
    'Manitoba': 'Winnipeg, MB',
    'Ontario': 'Toronto, ON',
    'Quebec': 'Quebec City, QC',
    'Nova Scotia': 'Halifax, NS',
    'Newfoundland and Labrador': "St. John's, NL",
    'Prince Edward Island': 'Charlottetown, PEI',
    'New Brunswick': 'Fredericton, NB'
}

var city_to_gps = {
    'Edmonton, AB': prov_to_gps['Alberta'],
    'Victoria, BC': prov_to_gps['British Columbia'],
    'Regina, SK': prov_to_gps['Saskatchewan'],
    'Winnipeg, MB': prov_to_gps['Manitoba'],
    'Toronto, ON': prov_to_gps['Ontario'],
    'Quebec City, QC': prov_to_gps['Quebec'],
    'Halifax, NS': prov_to_gps['Nova Scotia'],
    'Newfoundland and Labrador': "St. John's, NL",
    'Charlottetown, PEI': prov_to_gps['Prince Edward Island'],
    'Fredericton, NB': prov_to_gps['New Brunswick']
}

function ConferenceViewModel() {
    var self = this;
    self.conf = ko.observable(new Conference());
    self.industries = ko.observableArray();
    self.industry = ko.observable();
    self.cities = ko.observableArray();
    self.provinces = ko.observableArray();
    self.city = ko.observable();
    self.venues = ko.observableArray();
    self.hotels = ko.observableArray();
    self.maxCity = ko.computed(function() {
        return self.provinces()[0] ? prov_to_city[self.provinces()[0]['_id']] : '';
    });

    self.cities_list = function(city) {
        return prov_to_city[city['_id']]
    }

    var circles = {}
    var markers = []

    window.mapIndustry = L.map('map-industry').setView([55, -97], 4);
    window.mapVenues = L.map('map-venues').setView([55, -97], 4);
    var industryTiles = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(window.mapIndustry)
    var venueTiles = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(window.mapVenues);
    self.industry.subscribe(function(value) {
        $.post('/api/industry/max', {industry: value}, self.cities)
    });

    self.cities.subscribe(function(cities) {
        if(cities.length == 0) {
            return;
        }
        provinces = cities.filter(function(data) {
            return data._id.indexOf(',') == -1 && data._id != 'Canada'
        })
        self.provinces(provinces.sort(function(a, b) {
            return parseFloat(b['value']) - parseFloat(a['value'])
        }));
        self.city(prov_to_city[provinces[0]['_id']]);
        for(var i = 0; i < provinces.length; i++) {
            if(circles[provinces[i]._id]) {
                var value = parseFloat(provinces[i].value) * 1000
                circles[provinces[i]._id].setRadius(value / 2);
                circles[provinces[i]._id].bindPopup(value.toString() + ' workers in ' + provinces[i]._id);
            } else {
                var value = parseFloat(provinces[i].value) * 1000
                circles[provinces[i]._id] = L.circle(prov_to_gps[provinces[i]._id], value / 2, {
                    color: 'blue'
                }).addTo(mapIndustry);
                circles[provinces[i]._id].bindPopup(value.toString() + ' workers in ' + provinces[i]._id);
            }
        }
    });

    self.city.subscribe(function(value) {
        window.mapVenues.setView(city_to_gps[value], 10)
        venueTiles.redraw()
        fourSquare(value, 'convention', function(data) {
            console.log(data['response']['venues']);
            self.venues(data['response']['venues']);
        });
        fourSquare(value, 'hotel', function(data) {
            self.hotels(data);
        });
    });

    self.venues.subscribe(function(venues) {
        for(var i = 0; i < markers.length; i++) {
            window.mapVenues.removeLayer(markers[i])
        }
        markers = []
        for(var i = 0; i < venues.length; i++) {
            var ll = new L.LatLng(
                venues[i]['location']['lat'],
                venues[i]['location']['lng']
            )
            var marker = new L.marker(ll, {title: venues[i]['name']})
            var popup;
            marker.on('mouseover', function(e) {
                console.log(e)
                popup = L.popup({offset: e.target.options.icon.options.popupAnchor})
                    .setLatLng(this.getLatLng())
                    .setContent(e.target.options.title)
                    .openOn(window.mapVenues);
            });
            marker.on('click', function(e) {
                for(var i = 0; i < self.venues().length; i++) {
                    if(self.venues()[i]['name'] == e.target.options.title) {
                        self.conf().venue(new Venue(self.venues()[i]));
                        break;
                    }
                }
            })
            markers.push(marker)
            window.mapVenues.addLayer(marker)
        }
    })


    self.save = function() {
        var con = ko.toJSON(self.conf)
        con.tags = con.tags.split(' ') || []
        $.post('/api/conference/new', {
            conf: con
        }, function(data) {
            window.location.replace(data);
        })
    }

    $.get('/api/industry', function(data) {
        data.unshift(' ');
        self.industries(data);
    })


}

var vm = new ConferenceViewModel(); // this is outside for introJS stuff.
$(function() {
    ko.applyBindings(vm);
    $('[rel="tooltip"]').tooltip();

    $('#wizard').bootstrapWizard({
        'tabClass': 'nav nav-pills',
        'nextSelector': '.btn-next',
        'previousSelector': '.btn-previous',
         onInit : function(tab, navigation,index){

           //check number of tabs and fill the entire row
           var $total = navigation.find('li').length;
           $width = 100/$total;

           $display_width = $(document).width();

           if($display_width < 400 && $total > 3){
               $width = 50;
           }
           navigation.find('li').css('width',$width + '%');
        },
        onTabShow: function(tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index+1;

            var wizard = navigation.closest('.wizard-card');

            if ($current == 2){
              window.mapIndustry.invalidateSize();
            }
            if ($current == 3) {
                window.mapVenues.invalidateSize();
            }
            // If it's the last tab then hide the last button and show the finish instead
            if($current >= $total) {
                $(wizard).find('.btn-next').hide();
                $(wizard).find('.btn-finish').show();
            } else {
                $(wizard).find('.btn-next').show();
                $(wizard).find('.btn-finish').hide();
            }
        }
	});
})
