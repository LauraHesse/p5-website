var map;

//locationInfo is an array of objects that holds the info
var locationInfo = [
  {
      name: 'Frauenkirche / Church',
      latlong: {lat: 51.051873, lng: 13.741522},
      description: 'The Frauenkirche Dresden looks back on a history of over 1000 years. It ist a history full of changes, of great splendour and utter destruction. The first Frauenkirche was built in the 11th century as small Romanic missionary church.',
      // id is foursquare.com location id
      id: '4b5c47a9f964a520782929e3',
      icon: 'images/bell.png'
  },
  {
      name: 'Zwinger / Garden',
      latlong: {lat: 51.053002, lng: 13.733757},
      description: 'The Zwinger is a palace in the eastern German city of Dresden, built in Baroque style and designed by court architect Matthäus Daniel Pöppelmann. It served as the orangery, exhibition gallery and festival arena of the Dresden Court.',
      id: '4b5c4b01f964a520d82929e3',
      icon: 'images/tree.png'
  },
  {
      name: 'Semperoper / Oper',
      latlong: {lat: 51.054486, lng: 13.735276},
      description: 'The magnificent Semperoper dominates the Theaterplatz on the river Elbe, forming the centrepiece of the historic old city. ',
      id: '4b5c4a07f964a520c32929e3',
      icon: 'images/tenor.png'
  },
  {
      name: 'Gemäldegalerie / Art gallery',
      latlong: {lat: 51.053388, lng: 13.734707},
      description: '(Old Masters Picture Gallery) With master works including Raphael’s "Sistine Madonna", Giorgione’s "Sleeping Venus", Correggio’s "Holy Night", Cranach’s "St. Catherine Altar", Vermeer’s "Girl Reading a Letter at an Open Window" and Bellotto’s views of Dresden, the Gemäldegalerie Alte Meister enjoys a reputation that is international in scope. ',
      id: '4b462b27f964a520d41826e3',
      icon: 'images/palette.png'
  },
  {
      name: 'Brühlsche Terrasse / Garten',
      latlong: {lat: 51.053241, lng: 13.743673},
      description: 'Dresden Fortress, around  1170  Dresden is supposed to have been founded as a royal  residence town, protected by a solid fortress at t he  ford on the left Elbe River bank. ',
      id: '4be90b1de1b39521d44921c1',
      icon: 'images/tree.png'
  },
  {
      name: 'Residenzschloss / Art gallery',
      latlong: {lat: 51.052498, lng: 13.736660},
      description: 'Dresden Castle or Royal Palace is one of the oldest buildings in Dresden, Germany',
      id: '4bbf9971b492d13a86efa260',
      icon: 'images/palette.png'
  }
];

//this function initializes the map
function initMap() {
    //here we set customised styles
    var styles = [
      {
        featureType: 'water',
        stylers: [
          { color: '#8cb30c' }
        ]
      },{
        featureType: 'administrative',
        elementType: 'labels.text.stroke',
        stylers: [
          { color: '#e19295' },
          { weight: 16 }
        ]
      },{
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [
          { color: '#ffffff' }
        ]
    },
    {
        featureType: 'transit.station',
        stylers: [
          { weight: 15 },
          { hue: '#e19295' }
        ]
    }
    ];
    // This constructor creates the new map at the chosen location
    map = new google.maps.Map(document.getElementById('map'), {
      disableDefaultUI: true,
      styles: styles
    });
    //This creates the info window
    var infowindow = new google.maps.InfoWindow({});

    //This creates the lat long boundries
    var bounds = new google.maps.LatLngBounds();

    // The following group uses the location array to create an array of markers on initialize.
    // This creates the markers on the map
    //https://discussions.udacity.com/t/help-with-for-and-or-foreach-loop/188174/2?u=sarah_m

    locationInfo.forEach(function(mark, index) {
        // Get the position from the location array.
        var position = mark.latlong;
        var title = mark.name;
        var description = mark.description;
        var id = mark.id;
        var icon = mark.icon;

        console.log(position, title, description, id, icon);

        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            position: position,
            title: title,
            description: description,
            id: id,
            icon: icon,
            map: map,
            animation: google.maps.Animation.DROP
        });

        // Push the marker to our array of markers.
        locationInfo[index].marker = marker;

        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function() {
          //this opens infoWindow
          populateInfoWindow(this, infowindow);
          //this bounces the marker when its clicked
          toggleBounce(this);
        });

        //from Udacity Map example - bounds.extend(markers[i].position);
        bounds.extend(marker.position);
    });


    // fitBounds() method adjusts the map's viewport in order to view the passed LatLngBounds in full at the centre of the map.
    map.fitBounds(bounds);
    //set center of the markers
    map.setCenter(bounds.getCenter());
}

// this animates marker icon
function toggleBounce(myMarker) {
    myMarker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
        myMarker.setAnimation(null);
    }, 2000);
}

// this function opens the infowindow when the marker is clicked
  function populateInfoWindow(marker, infowindow) {
      // this checks if the infowindow is not already opened
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    // make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
      //this stops the marker animation if the infoWindow close button is clicked
      marker.setAnimation(null);
    });
  }

  /*
  Foursquare API
  code help taken from here https://discussions.udacity.com/t/cant-get-foursquare-api-to-work/259270/34
  */
  var foursquareUrl = "https://api.foursquare.com/v2/venues/" + marker.id + "/photos?&client_id=XGWXHTVIZCIVDOHSWSGV4MDCK1UMEVXVFEJCESF0NVIQGOCL&client_secret=KWH3M5ILDBPXCE4WRE2URV0UY1JX1D2AHRHGED2MKMY0S4Q2&v=20170705&m=foursquare";
  var foursquareRequestTimeout = setTimeout(function() {
    alert("Failed to load Foursquare photo.");
  }, 2000);

    $.ajax({
        url: foursquareUrl,
        dataType: "jsonp",

        success: function(response) {
            console.log(response);
            var photo_data = response.response.photos.items[0] || response.photos.items[0];
            var photoUrl = photo_data.prefix + '200' + 'x' + '200' + photo_data.suffix;
            var photo = ('<img class="venueimg" src="' + photoUrl + '">');
            console.log(response.response);

            // You are setting the info window's content and open the info window after the ajax request returns.
            infowindow.setContent('<h3>' + marker.title + '</h3>' + '<div>' + photo + '</div>' + '<h4>History</h4>' + '<div>' + marker.description + '</div>' );
            infowindow.open(map, marker);

            clearTimeout(foursquareRequestTimeout);
          }

        });
}

// open mobile menu
$('#menu').click(function(e){
    e.preventDefault();
    $('.side-nav').animate({width:'toggle'},350);
    $('#map').toggleClass('active');
});

// Let the user know if something went wrong
function googleError() {
    alert('Oh NO!, There is a Google Maps Error');
}
