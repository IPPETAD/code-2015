
function ConferenceViewModel() {
  var self = this;
  self.conf = ko.observable(new Conference({
    name: 'Marble statues and their place in modern dragonkin',
    topic: 'Discussing the contoversial issues of what type of marble to use'
  }));
}

ko.applyBindings(new ConferenceViewModel());