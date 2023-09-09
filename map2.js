//documentation for handling of markers can be found here https://developers.google.com/maps/documentation/javascript/examples/marker-remove

//use strict allows only declared variables to be used
"use strict";

//creating the map variable outside the scope of the function so all can use it. Creating an array of markers to manage them
let map;
let markers = [];

//init map creates the map then calls the run function to create the marker process
function initMap() {
  const myLatLng = {
    lat: 42.35868835449219,
    lng: -71.09516143798828
  };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: myLatLng,
    fullscreenControl: false,
    zoomControl: true,
    streetViewControl: false
  });
  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "My location"
  });
  run();
}

//this function creates an individual marker
function addMarker(location) {
  let busLocation = {
    lat: location.attributes.latitude,
    lng: location.attributes.longitude
  };
  let marker = new google.maps.Marker({
    position: busLocation,
    map: map,
    title: location.id
  });
  markers.push(marker);
}
//this is used to control the state of the markers on the map.
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

//hides all markers
function hideMarkers() {
  setMapOnAll(null);
}
//clears the array. Potentially leaves the markers in memory. I need to do some research here.
function deleteMarkers() {
  hideMarkers();
  markers = [];
}

//handle bus data below here
//run function clears any markers that were on the map, then deletes them
async function run(){
  //get bus data using try/catch    
  try {
    const locations = await getBusLocations();
    console.log(new Date());
    console.log(locations);
    deleteMarkers();
    for(let i=0;i<locations.length;i++) {
      addMarker(locations[i]);
    }
  }
  catch(error) {
    alert("An Error Occurred: " + error)
  }

  //timer to repeat function
  setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
  const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
  const response = await fetch(url);
  const json     = await response.json();
  return json.data;
}
