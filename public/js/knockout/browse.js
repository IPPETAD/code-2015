function BrowseViewModel() {
    var self = this;

    self.conferences = ko.observableArray();
    self.filter = ko.observable();
    self.filteredConferences = ko.computed(function() {
        return self.conferences.filter(function(conf) {
            if(!self.filter() || self.filter() == '' || self.filter().length < 3)
                return true;
            return conf.title().toLowerCase().indexOf(self.filter().toLowerCase()) > -1 ||
                conf.description().toLowerCase().indexOf(self.filter().toLowerCase()) > -1;
        }).extend({paging: 10});
    }, this);

    self.buttons = ko.computed(function() {
        pages = [];
        for(var i = 0; i < self.filteredConferences().pageCount(); i++) {
            pages.push(i+1);
        }
        return pages;
    });

    self.goToPage = function(page) {
        self.filteredConferences().currentPage(page);
    }

    $.get('/api/conference', function(data) {
        self.conferences(data.map(function(conference) {
            return new Conference(conference);
        }));
    });
}

$(function() {
    ko.applyBindings(new BrowseViewModel())
});
