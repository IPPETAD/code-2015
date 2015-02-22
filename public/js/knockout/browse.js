function BrowseViewModel() {
    var self = this;

    self.conferences = ko.observableArray();
    self.filter = ko.observable();
    self.filteredConferences = ko.computed(function() {
        return self.conferences.filter(function(conf) {
            if(!self.filter() || self.filter() == '' || self.filter().length < 3)
                return true;

            var filters = splitFilter(self.filter());

            // If single item, filter on title and description
            if (filters.length == 1 && typeof filters[0] == 'string') {
              return conf.title().toLowerCase().indexOf(filters[0].toLowerCase()) > -1 ||
                conf.description().toLowerCase().indexOf(filters[0].toLowerCase()) > -1;
            }

            // multiple items, check if field exists and filter on it
            return filters.some(function(filter) {
              if (typeof filter == 'string') {
                // ignore stuff without a property
                return false;
              }

              // oh god it is ugly
              if (filter.length > 1 && typeof filter[0] == 'string' && conf[filter[0]] && conf[filter[0]]().indexOf) {
                return filter[1].some(function(value) {
                  return conf[filter[0]]().toLowerCase().indexOf(value) > -1;
                })
              }
              return false;
            });
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
      window.location.hash = encodeURI(filter);
    });

    Sammy(function() {
      this.get('#:filter', function() {
        self.filter(this.params.filter);
      });
    }).run();
}

$(function() {
    ko.applyBindings(new BrowseViewModel())
});

function splitFilter(filter) {
  if (!filter) {
    return;
  }

  return decodeURI(filter)
    .toLowerCase()
    .split('&').map(function(item) {
      if (item.indexOf('=') > -1) {
        item = item.split('=');
        if (item.length == 2) {
          item[1] = item[1].split(' ');
        }
      }
      return item;
  });
}
