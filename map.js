import { text } from "../../Library/Caches/typescript/2.6/node_modules/@types/body-parser";

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 38.9072, lng: -77.0369 },
    zoom: 13
  });
}



var map;
var service;
var infowindow;

function initialize() {
  var WashDc = new google.maps.LatLng(-38.9072,-77.0369);

  map = new google.maps.Map(document.getElementById('map'), {
      center: WashDc,
      zoom: 15
    });

  var request = {
    location: WashDc,
    radius: '500',
    query: 'Parks',
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

var map;
var service;
var infowindow;

function initialize() {
  var WashDc = new google.maps.LatLng(-33.8665433,151.1956316);

  map = new google.maps.Map(document.getElementById('map'), {
      center: WashDc,
      zoom: 15
    });

  var request = {
    location: WashDc,
    radius: '500',
    query: 'Parks'
  };

}


// {
//   search(term= "", location= "");{
//     total
//     business ;{
//       name
//       reviews
//         text
//         rating
//         time_created
//         url
//     }
//   }
// }

// $.curl -X POST -H "Authorization: Bearer ACCESS_TOKEN" -H "Content-Type: application/graphql" "https://api.yelp.com/v3/graphql" --data'
// {
//     business(id: "garaje-san-francisco") {
//         name
//         id
//         rating
//         url
//     }
// }'