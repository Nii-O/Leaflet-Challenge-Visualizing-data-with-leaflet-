// Create a map object.
var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
});
  
  // Add a tile layer.
//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   }).addTo(myMap);
var grayscaleMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1IjoicnZ0MjMiLCJhIjoiY2wyNTZrOThlMDA5aDNjcDhpaGV0emo4OSJ9._cXaes_wLa4pHFmibsFTqg");


grayscaleMap.addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


d3.json(url).then(function(response) {
    
   //console.log(response.features[1].geometry.coordinates[2]);

   function styleData(feature){
       return{
        fillColor: markercolor(feature.geometry.coordinates[2]),
        fillOpacity: 1,
        color: "#000000",
        weight: 0.5,
        radius: markersize(feature.properties.mag),
        stroke: true
       };
   }
    //let quakePoints=response.features ;

 
    // function markercolor(depth){

    //     // Conditionals for country points
    //     let color = '#2c99ea';
    //     if (depth> 90) {
    //         color = "#ea2c2c";
    //     } else if (depth > 70) {
    //         color = "#eaa92c";
    //     } else if (depth > 50) {
    //         color = "#d5ea2c";
    //     } else if (depth > 30) {
    //         color = "#92ea2c";
    //     } else if (depth > 10) {
    //         color = "#2ceabf";
    //     } else if (depth > -3) {
    //         color = "#2c99ea";
    //     }
    // }    

    function markercolor(depth) {
        let color = '#2c99ea';
        switch (true) {
           case (depth > 90):
                color = "#ea2c2c";
                break;
           case (depth > 70):
                color = "#eaa92c";
                break;
           case (depth > 50):
                color = "#d5ea2c";
                break;
           case (depth > 30):
                color = "#92ea2c";
                break;
           case (depth > 10):
                color = "#2ceabf";
                break;
           case (depth > -3):
                color = "#2c99ea";
                break;
           default:
                color = "#2c99ea";
                break;
        }
        console.log(color);
        return color;
    }

    function markersize(mag) {
        if (mag > 0){
            return mag * 8;
        }
        return 1;
        
    }
    //let location=[response.features[i].geometry.coordinates[1],response.features[i].geometry.coordinates[0]];

    // Add circles to the map.
    // L.circle(location, {
    //     fillColor: color,
    //     fillOpacity: 0.5,
    //     radius: response.features[i].properties[0]
    // }).bindPopup(`<h1>${response.features[i].properties[0]}</h1><hr><h3>points: ${response.features[i].properties[4]}</h3>`).addTo(myMap);

    let legend = L.control({ position: "bottomleft" });

    legend.onAdd = function() {
    let div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Earthquake Depth</h4>";
    div.innerHTML += '<i style="background: #ea2c2c"></i><span>90+</span><br>';
    div.innerHTML += '<i style="background: #eaa92c"></i><span>70-90</span><br>';
    div.innerHTML += '<i style="background: #d5ea2c"></i><span>50-70</span><br>';
    div.innerHTML += '<i style="background: #92ea2c"></i><span>30-50</span><br>';
    div.innerHTML += '<i style="background: #2ceabf"></i><span>10-30</span><br>';
    div.innerHTML += '<i style="background: #2c99ea"></i><span><10</span><br>';
    
   
    return div
    };

    legend.addTo(myMap);


 
    L.geoJSON(response, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
       style: styleData,
    // Call pop-up for each feature
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h2> Location: " + feature.properties.place + "</h2> <hr> <h1> Magnitude: " + feature.properties.mag+ "</h1>" );
        }
    }).addTo(myMap);

    console.log('nii')
    console.log(response);
});



