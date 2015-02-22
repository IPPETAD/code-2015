function ConferenceViewModel() {
    var self = this;
    self.conf = ko.observable(new Conference());

    self.save = function() {
        var con = ko.toJSON(self.conf)
        con.tags = con.tags.split(' ') || []
        $.post('/conference/new', {conf: con}, function(data) {
            window.location.replace(data);
        })
    }
}

$(function() {
    ko.applyBindings(new ConferenceViewModel())
})