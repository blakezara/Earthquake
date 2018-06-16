



var timeMap = L.map('map2', {
    center: [42.877742, -97.380979],
    zoom: 2.5,
    minZoom: 2.5,
    maxBounds: L.latLngBounds([90, -180], [-90, 180]),
    maxBoundsViscosity: 1,
    scrollWheelZoom: false
    
});

var satelliteMap1 = L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    accessToken: 'pk.eyJ1IjoiYmxha2V6YXJhIiwiYSI6ImNqaGI0cHV0YjAzMmUzMHJ5dTB3Nmc0dXcifQ.l-6nc1nr5JHRUc1nYNaG4g'
}).addTo(timeMap);

d3.json(quakeLink, function(data){
    var quakeData = data.features;

    console.log(quakeData);

    var timelineLayer = L.timeline(data, {
        getInterval: function(feature) {
            return {
                start: feature.properties.time,
                end:   feature.properties.time + (feature.properties.mag * 1800000)
              };
        },
        pointToLayer: function (feature, latlng) {
            return new L.circle(latlng, 
                {radius: getRadius(feature.properties.mag),
                fillColor: getColor(feature.properties.mag),
                fillOpacity: .7,
                stroke: true,
                color: "black",
                weight: .5
    
            })
        },

    })

    d3.json(faultLinesLink, function(data){
        
        var faultFeatures = data.features

        var styling = {
            "fillOpacity": 0
        }

        console.log(faultFeatures)
        var faults = L.geoJSON(faultFeatures, {
            style: function(feature){
                return styling
            }
        }).addTo(timeMap)

            
            timelineLayer.addTo(timeMap);
        
    })
    
    
});



legend.addTo(timeMap);