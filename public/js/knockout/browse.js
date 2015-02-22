function BrowseViewModel() {
    var self = this;

    self.conferences = ko.observableArray([]);
    self.filter = ko.observable();
    self.filteredConferences = ko.computed(function() {
        return self.conferences.filter(function(conf) {
            if(!self.filter() || self.filter() == '' || self.filter().length < 3)
                return true;

            var filters = splitFilter(self.filter());

            // If single item, filter on title and description
            if (filters.length == 1 && typeof filters[0] == 'string') {
              return conf.title().toLowerCase().indexOf(filters[0].toLowerCase()) > -1 ||
                conf.description().toLowerCase().indexOf(filters[0].toLowerCase()) > -1 ||
                conf.tags().some(function(tag) {
                  console.log(tag);
                  return tag.toLowerCase().indexOf(filters[0].toLowerCase()) > -1;
                });
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
        })();
    }, this).extend({paging: 10});

    self.buttons = ko.computed(function() {
        pages = [];
        for(var i = 0; i < self.filteredConferences.pageCount(); i++) {
            pages.push(i+1);
        }
        return pages;
    });

    self.industryCheckBoxes = ko.observableArray([]);
    self.industryCheckBoxes.subscribe(function (values) {
      if (values.length > 0) {
        self.setFilterPartial('industry=' + values.join('|'));
      } else {
        self.removeFilterPartial('industry=');
      }
    });

    self.setFilterPartial = function(partial) {
      self.filter(replaceFilterPartial(partial, self.filter()));
    };

    self.removeFilterPartial = function(partial) {
      self.filter(removeFilterPartial(partial, self.filter()));
    }

    self.goToPage = function(page) {
      self.filteredConferences.currentPage(page);
    };

    $.get('/api/conference', function(data) {
      console.log('Retrieved ' + data.length + ' conferences');
      self.conferences(data.map(function(conference) {
        if (typeof conference.tags == 'string') {
          conference.tags = conference.tags.split(',');
        }
        return new Conference(conference);
      }));
    });

    self.filter.subscribe(function(filter) {
      if (filter && filter.length >= 3) {
        window.location.hash = 'filter/' + encodeURI(filter);
      } else {
        window.location.hash = '';
      }

    });

    Sammy(function() {
      this.get('#filter/:filter', function() {
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
          item[1] = item[1].split('|');
        }
      }
      return item;
  });
}

function replaceFilterPartial(partial, filter) {
  filter = filter || '';
  var matches = findFilterPartial(partial, filter);
  if (matches) {
    filter = filter.replace(matches[0], '&' + partial);
  } else {
    filter = filter + '&' + partial;
  }

  if (filter[0] == '&') {
    filter = filter.slice(1, filter.length)
  }

  return filter;
}

function removeFilterPartial(partial, filter) {
  filter = filter || '';
  var matches = findFilterPartial(partial, filter);
  if (matches) {
      filter = filter.replace(matches[0], '');
  }

  if (filter[0] == '&') {
    filter = filter.slice(1, filter.length)
  }

  return filter;
}

function findFilterPartial(partial, filter) {
  filter = filter || '';
  var arg = partial.split('=')[0];
  return filter.match(new RegExp("&?" + arg + "=([^&]*)"));
}
