function VenueList() {
    var self = this;
    self.venueArray = ko.observableArray([]);
    fourSquare('Edmonton, AB', 'convention', function(venues) {
        console.log(venues);
        self.venueArray(venues['response']['venues'].map(
            function(venue) {
                return new Venue(venue);
            })
        );
    });
}
$(function() {
    ko.applyBindings(new VenueList());
});
