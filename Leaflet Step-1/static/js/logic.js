var myMap = L.map("map", {
    center: [37.7749, -122.4194],
    zoom: 13
  });



// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(url).then(function(response) {

    console.log(response.features[1].geometry.coordinates[0]);


    //Create a new marker cluster group.
    var markers = new L.markerClusterGroup();
  
    // Loop through the data.
    for (var i = 0; i < response.length; i++) {
  
      // Set the data location property to a variable.
      var location = response.features[i].geometry.coordinates;
  
      // Check for the location property.
      if (location) {
  
        // Add a new marker to the cluster group, and bind a popup.
        markers.addLayer(L.marker([location[1], location[0]])
          .bindPopup(response.features[1].properties[0]));
       }
  
    }
  
    // Add our marker cluster layer to the map.
    myMap.addLayer(markers);
  
  });