
function ConferenceViewModel() {
  var self = this;
  self.conf = ko.observable(new Conference({
    name: 'Test Conference 1',
    topic: 'Test Topic 1'
  }));

  console.log(self.conf());
}

$(function() {
  ko.applyBindings(new ConferenceViewModel());
});
