
//Knockout JS
var ViewModel = function(){
  var self = this;
  //self.query are observables - which are functions - you need to call them without any arguments to get their values.
  self.query = ko.observable('');

  //this code is taken from Udacity forum
  self.searchResults = ko.computed(function() {
      var q = self.query();
      //this filters the location entries
      return locationInfo.filter(function(i) {
        return i.name.toLowerCase().indexOf(q) >= 0;
      });
  });

  //this triggers all of the click events on the marker and closes the sidebar

  self.listClicker = function(position){
    google.maps.event.trigger(position.marker, 'click');
  };
};

ko.applyBindings(new ViewModel());
