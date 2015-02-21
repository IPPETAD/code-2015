
/**
 *  Conference: {
 *    id: String.
 *    name: String,
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
  self.name = ko.observable(data.name);
  self.topic = ko.observable(data.topic);
  self.startTime = ko.observable(data.startTime);
  self.endTime = ko.observable(data.endTime);
  self.description = ko.observable(data.description);
  self.tags = ko.observableArray(data.tags);

  self.venue = ko.observable(new Venue(data.venue));
  self.itinerary = ko.observableArray(data.itinerary.map(function(item) {
    return new ItineraryEntry(item);
  }));
}

/**
 *  Venue: {
 *    name: String,
 *    location: String,
 *    capacity: int,
 *    liquor: bool
 *  }
 */
function Venue(data) {
  var self = this;
  data = data || "";

  self.name = ko.observable(data.name);
  self.location = ko.observable(data.location);
  self.capacity = ko.observable(data.capacity);
  self.liquor = ko.observable(data.liquor);
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


