// Create a map object.
var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
});
  
  // Add a tile layer.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


d3.json(url).then(function(response) {
    
    console.log(response.features[1].geometry.coordinates[2]);
   
    //let quakePoints=response.features ;

    // Loop through the countries array.
    for (var i = 0; i < response.length; i++) {

        // Conditionals for country points
        let color = '#2c99ea';
        if (response.features[i].geometry.coordinates[2]> 90) {
            color = "#ea2c2c";
        } else if (response.features[i].geometry.coordinates[2] > 70) {
            color = "#eaa92c";
        } else if (response.features[i].geometry.coordinates[2] > 50) {
            color = "#d5ea2c";
        } else if (response.features[i].geometry.coordinates[2] > 30) {
            color = "#92ea2c";
        } else if (response.features[i].geometry.coordinates[2] > 10) {
            color = "#2ceabf";
        } else if (response.features[i].geometry.coordinates[2] > -3) {
            color = "#2c99ea";
        }
        
        let location=[response.features[i].geometry.coordinates[1],response.features[i].geometry.coordinates[0]];

        // Add circles to the map.
        L.circle(location, {
            fillColor: color,
            fillOpacity: 0.5,
            radius: response.features[i].properties[0]
        }).bindPopup(`<h1>${response.features[i].properties[0]}</h1><hr><h3>points: ${response.features[i].properties[4]}</h3>`).addTo(myMap);
    }


});