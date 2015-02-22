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

    self.filter.subscribe(function(filter) {
      if (!filter || filter == '') {
        window.location.hash = '';
      } else {
        window.location.hash = "filter=" + filter;
      }
    });

    Sammy(function() {
      this.get('#filter=:filter', function() {
        self.filter(this.params.filter);
      });
    }).run();
}

$(function() {
    ko.applyBindings(new BrowseViewModel())
});
