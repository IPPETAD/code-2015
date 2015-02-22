
function ConferenceViewModel() {
  var self = this;
  self.conf = ko.observable(new Conference({
    title: 'Test Conference 1',
    topic: 'Test Topic 1',
    image: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTcxIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE3MSAxODAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iMTcxIiBoZWlnaHQ9IjE4MCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjYxIiB5PSI5MCIgc3R5bGU9ImZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMHB0O2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPjE3MXgxODA8L3RleHQ+PC9nPjwvc3ZnPg==',
    venue: {
      name: 'Hall of Testing',
      location: {
        address: '101',
        crossStreet: 'Test ave',
        city: 'Edmonton',
        state: 'AB'
      }
    },
    time: {
      start: 'Sometime',
      end: 'Whenever'
    },
    description: 'Discussing the need for a conference kickstarter.',
    tags: ['Hackathon', 'CODE 2015', 'Pls halp'],
    body: '<h1>Header</h1><p>Paragraph</p>',
    itinerary: [
      {
        title: 'Intro',
        time: { start: '11:00 am', end: '11:30 am' }
      },
      {
        title: 'Speaker 1',
        time: { start: '11:30 am', end: '12:00 pm' }
      },
      {
        title: 'Lunch',
        time: { start: '12:00 pm', end: '12:30 pm' }
      },
      {
        title: 'Speaker 2',
        time: { start: '12:30 pm', end: '1:00 pm' }
      },
      {
        title: 'Speaker 3',
        time: { start: '1:00 pm', end: '1:30 pm' }
      },
      {
        title: 'End Mingling',
        time: { start: '1:30 pm', end: '2:00 pm' }
      }
    ]
  }));

  self.venueTemplateToUse = function(venue) {
    return venue ? "venue-template" : "no-venue-template";
  };

  self.dateTemplateToUse = function(timeFrame) {
    return timeFrame ? "date-template" : "no-date-template";
  };

  Sammy(function() {
    this.get('#:id', function() {
      console.log('id: ' + this.params.id);
      $.getJSON('/conference/' + this.params.id, function(data) {
        self.conf(new Conference(data));
      });
    });
  }).run();

}

$(function() {
  ko.applyBindings(new ConferenceViewModel());
});
