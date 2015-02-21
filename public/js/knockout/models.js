/**
 *  Conference: {
 *    id: String.
 *    title: String,
 *    imageUrl: String,
 *    topic: String,
 *    startTime: Date,
 *    endTime: Date,
 *    description: String,
 *    tags: String[],
 *    venue: Venue,
 *    itinerary: ItineraryEntry[]
 *  }
 */
function Conference(data) {
  var self = this;
  data = data || "";

  self.id = data.id;
  self.title = ko.observable(data.title);
  self.imageUrl = ko.observable(data.imageUrl);
  self.topic = ko.observable(data.topic);
  self.startTime = ko.observable(data.startTime);
  self.endTime = ko.observable(data.endTime);
  self.description = ko.observable(data.description);
  self.tags = ko.observableArray(data.tags);

  self.venue = ko.observable(new Venue(data.venue));
  data.itinerary = data.itinerary || [];
  self.itinerary = ko.observableArray(data.itinerary.map(function(item) {
    return new ItineraryEntry(item);
  }));
}

/**
 *  Venue: {
 *    name: String,
 *    location: String,
 *  }
 */
function Venue(data) {
  var self = this;
  data = data || "";

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
    data = data || "";

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
 *    startTime: Date,
 *    endTime: Date,
 *    title: String,
 *    color?: int,
 *    location: String
 *  }
 */
function ItineraryEntry(data) {
  var self = this;
  data = data || "";

  self.startTime = ko.observable(data.startTime);
  self.endTime = ko.observable(data.endTime);
  self.title = ko.observable(data.title);
  self.color = ko.observable(data.color);
  self.location = ko.observable(data.location);
}
