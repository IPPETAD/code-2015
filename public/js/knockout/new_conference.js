searchVisible = 0;
transparent = true;

function ConferenceViewModel() {
    var self = this;
    self.conf = ko.observable(new Conference());
    self.industries = ko.observableArray();
    self.industry = ko.observable();
    self.city = ko.observable();
    self.venues = ko.observableArray();
    self.hotels = ko.observableArray();

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
        $.post('/conference/new', {
            conf: con
        }, function(data) {
            window.location.replace(data);
        })
    }

    $.get('/industries', function(data) {
        data.unshift(' ');
        self.industries(data);
    })
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