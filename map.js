

var map;
// var service;
var infoWindow;


function initMap() {
  var washDc = { lat: 38.9072, lng: -77.0369 };
  map = new google.maps.Map(document.getElementById('map'), {
    center: washDc,
    zoom: 13,
  });
  var request = {
    location: "WashDc",
    radius: '500',
    type: ['store']
  };
}
  // infoWindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);


function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}




