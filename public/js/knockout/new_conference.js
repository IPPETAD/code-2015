function ConferenceViewModel() {
    var self = this;
    self.conf = ko.observable(new Conference());

    self.save = function() {
        var con = self.conf()
        con.tags = con.tags.split(' ') || []
        $.post('/conference/new', {conf: con}, function() {
            window.location.replace('/conference')
        })
    }
}

$(function() {
    ko.applyBindings(new ConferenceViewModel())
})