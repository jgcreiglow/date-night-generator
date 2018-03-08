import { text } from "../../Library/Caches/typescript/2.6/node_modules/@types/body-parser";

var map;
var service;
var infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 38.9072, lng: -77.0369 },
    zoom: 13,
  });
  var request = {
    location: WashDc,
    radius: '500',
    query: 'parks'
  };
}
  service = new google.maps.places.PlacesService(map);
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




