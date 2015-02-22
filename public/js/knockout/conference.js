function ConferenceViewModel() {
  var self = this;
  self.conf = ko.observable(new Conference());

  self.venueTemplateToUse = function() {
    return self.conf().venue().name() ? "venue-template" : "no-venue-template";
  };

  self.dateTemplateToUse = function() {
    return self.conf().time().start() ? "date-template" : "no-date-template";
  };

  self.bodyTemplateToUse = function() {
    return self.conf().body() ? "body-template" : "no-body-template";
  };

  self.itineraryTemplateToUse = function() {
    return self.conf().itinerary().length > 0 ? "itinerary-template" : "no-itinerary-template";
  };

  Sammy(function() {
    this.get('#id=:id', function() {
      if (this.params.id === 'test') {
        self.conf(getTestConference());
      } else {
        $.ajax({
            url: '/api/conference/' + this.params.id,
            type: 'GET'
        }).done(function(data) {
          self.conf(new Conference(data));
        }).fail(function() {
          self.conf(getErrorConference());
        });
      }
    });

    this.get('/conference', function() { this.app.runRoute('get', '#id=default') });
  }).run();

}

$(function() {
  ko.applyBindings(new ConferenceViewModel());
});

function getTestConference() {
  return new Conference({
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
  });
}

function getErrorConference() {
  return new Conference({
    title: 'An Error Occured',
    topic: 'Something went wrong with the request',
    description: '<h1>Things went wrong. Horrible wrong.</h1>',
    body: '<h1>Trully sorry about this.</h1>',
    venue: {
      name: 'The Internet',
      location: {
        address: 'Your computer',
        crossStreet: 'and our server',
        city: 'Internet',
        state: 'HTTP'
      }
    }
  });
}
