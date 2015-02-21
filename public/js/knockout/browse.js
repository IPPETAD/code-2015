function BrowseViewModel() {
    var self = this;
    self.conferences = ko.observableArray();
    $.get('/conferences', function(data) {
        self.conferences(data.map(function(conference) {
            return new Conference(conference);
        }));
    });
}

$(function() {
    ko.applyBindings(new BrowseViewModel())
});