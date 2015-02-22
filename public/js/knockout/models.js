/**
 *  Conference: {
 *    id: String.
 *    title: String,
 *    image: String,
 *    topic: String,
 *    time: TimeFrame
 *    description: String,
 *    body: Markdown,
 *    tags: String[],
 *    venue: Venue,
 *    itinerary: ItineraryEntry[]
 *  }
 */
function Conference(data) {
  var self = this;
  data = data || {};

  self._id = data._id;
  self.title = ko.observable(data.title);
  self.topic = ko.observable(data.topic);
  self.description = ko.observable(data.description);
  self.body = ko.observable(data.body);
  self.image = ko.observable(data.image);
  data.tags = data.tags || [];
  self.tags = ko.observableArray(data.tags);

  self.tagsJoined = ko.computed(function() {
    return self.tags().join(', ');
  });

  self.time = ko.observable(new TimeFrame(data.time));
  self.venue = ko.observable(new Venue(data.venue));
  data.itinerary = data.itinerary || [];
  self.itinerary = ko.observableArray(data.itinerary.map(function(item) {
    return new ItineraryEntry(item);
  }));
}

function TimeFrame(data) {
  var self = this;
  data = data || {};

  self.start = ko.observable(data.start);
  self.end = ko.observable(data.end);
}

TimeFrame.prototype.toString = function () {
  return this.start() + ' - ' + this.end();
};

/**
 *  Venue: {
 *    name: String,
 *    location: String,
 *  }
 */
function Venue(data) {
  var self = this;
  data = data || {};

  self.name = ko.observable(data.name);
  self.location = ko.observable(new Location(data.location));
}

/**
 *  Location: {
 *    address: String,
 *    crossStreet: String,
 *    city: String,
 *    state: String
 *  }
 */
 function Location(data) {
    var self = this;
    data = data || {};

    self.address = ko.observable(data.address || "");
    self.crossStreet = ko.observable(data.crossStreet || "");
    self.city = ko.observable(data.city || "");
    self.state = ko.observable(data.state || "");

    self.line1 = ko.computed(function() {
      return self.address() + " " + self.crossStreet();
    });

    self.line2 = ko.computed(function() {
      return self.city() + ", " + self.state();
    });
 }

 Location.prototype.toString = function() {
    var self = this;
    return self.address() + ' ' +
        self.crossStreet() + ', ' +
        self.city() + ', ' +
        self.state();
 }

/**
 *  ItineraryEntry: {
 *    time: TimeFrame
 *    title: String,
 *    color?: int,
 *    location: String
 *  }
 */
function ItineraryEntry(data) {
  var self = this;
  data = data || {};

  self.time = ko.observable(new TimeFrame(data.time));
  self.title = ko.observable(data.title);
  self.color = ko.observable(data.color);
  self.location = ko.observable(data.location);
}
