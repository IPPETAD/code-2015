searchVisible = 0;
transparent = true;


city_to_gps = {
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

prov_to_city = {
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

function ConferenceViewModel() {
    var self = this;
    self.conf = ko.observable(new Conference());
    self.industries = ko.observableArray();
    self.industry = ko.observable();
    self.cities = ko.observableArray();
    self.city = ko.observable();
    self.venues = ko.observableArray();
    self.hotels = ko.observableArray();

    circles = {}

    window.map = L.map('map-industry').setView([45.4000, -75.6667], 4);
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
        provinces.sort(function(a, b) {
            return parseFloat(b['value']) - parseFloat(a['value'])
        })
        console.log(provinces)
        self.city(prov_to_city[provinces[0]['_id']]);
        for(var i = 0; i < provinces.length; i++) {
            if(circles[provinces[i]._id]) {
                var value = parseFloat(provinces[i].value) * 1000
                circles[provinces[i]._id].setRadius(value / 2);
                circles[provinces[i]._id].bindPopup(value.toString() + ' workers in ' + provinces[i]._id);
            } else {
                var value = parseFloat(provinces[i].value) * 1000
                circles[provinces[i]._id] = L.circle(city_to_gps[provinces[i]._id], value / 2, {
                    color: 'blue'
                }).addTo(map);
                circles[provinces[i]._id].bindPopup(value.toString() + ' workers in ' + provinces[i]._id);
            }
        }
    });

    self.city.subscribe(function(value) {
        fourSquare(value, 'convention', function(data) {
            self.venues(data);
        });
        fourSquare(value, 'hotel', function(data) {
            self.hotels(data);
        });
    });

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

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(window.map);
}

$(function() {
    ko.applyBindings(new ConferenceViewModel())
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
         onTabClick : function(tab, navigation, index){
            // Disable the posibility to click on tabs
            return false;
        },
        onTabShow: function(tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index+1;

            var wizard = navigation.closest('.wizard-card');
            
            if ($current == 2){
              window.map.invalidateSize();
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
