var deathChoro = L.layerGroup();
var instancesChoro = L.layerGroup();
var affectedChoro = L.layerGroup();
var top10markers = L.layerGroup();
var world = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
var overlayMaps = {
    "Total Affected": affectedChoro,
    "Total Deaths": deathChoro,
    "Total Occurences": instancesChoro
};
var markerLayer = {
    "Worst Floods from 1950-2022": top10markers
}
var myMap = L.map("map", {
    center: [0, 0],
    zoom: 2,
    layers: [world]
});

L.control.layers(overlayMaps, markerLayer, {
    collapsed: false
}
).addTo(myMap);

const link = "https://raw.githubusercontent.com/nitchon/project-3/main/Working%20Maps/static/data/countries.geojson";

function mapping() {
    d3.json("http://127.0.0.1:5000/disaster").then(function (data) {
        let worstfloods = data.filter(row => row[3] == 'Flood')
        let top10 = worstfloods.sort((a, b) => b[16] - a[16]).slice(0, 11)
        for (row of top10) {
            L.marker([row[21], row[22]]).bindPopup(`<h3>Location: ${row[9]}</h3><hr><h3>Country: ${row[4]}</h3><hr><h3>Date: ${row[19]}</h3>
            <h4><h3>Disaster Type: ${row[3]}</h3><hr><h3>Deaths: ${row[16]}</h3><hr><h3>Affected: ${row[17]}</h3>`)
                .addTo(top10markers);
            top10markers.addTo(myMap);
        }
    })
    d3.json(link).then(function (data) {
        let geo = data['features']
        geodata = geo
        let features = []
        d3.json("http://127.0.0.1:5000/type_breakdown").then(function (data) {
            flood = data.filter(row => row[1] === "Flood")
            for (row of flood) {
                country = row[0]
                instances = parseInt(row[6])
                deaths = parseInt(row[2])
                affected = parseInt(row[3])
                try {
                    let geometry = geodata.filter(row => row["properties"].ADMIN === country)[0].geometry
                    let properties = { country, instances, deaths, affected }
                    features.push({ "type": "Feature", properties, "geometry": geometry })
                }
                catch (error) {
                    console.log(country)
                }
                finally {
                    continue
                }
            }
            let summaryGeoJson = { type: "FeatureCollect", features }
            deathlayer = L.choropleth(summaryGeoJson, {

                // Define which property in the features to use.
                valueProperty: "deaths",

                // Set the color scale.
                scale: ["#ffffb2", "#b10026"],

                // The number of breaks in the step range
                steps: 10,

                // q for quartile, e for equidistant, k for k-means
                mode: "q",
                style: {
                    // Border color
                    color: "#fff",
                    weight: 1,
                    fillOpacity: 0.8
                },

                // Binding a popup to each layer
                onEachFeature: function (feature, layer) {
                    layer.bindPopup("<strong>" + feature.properties.country + "</strong><br /><br />Total Deaths: " +
                        feature.properties.deaths + "<br /><br />Total Affected: " + feature.properties.affected + "<br /><br />Total Occurences: " + feature.properties.instances);
                }
            }).addTo(deathChoro);
            deathChoro.addTo(myMap);
            var legend = L.control({ position: "bottomright" });
            legend.onAdd = function (map) {
                var div = L.DomUtil.create("div", "info legend");
                var limits = deathlayer.options.limits;
                var colors = deathlayer.options.colors;
                var labels = [];

                var legendInfo = "<h4>Flood Totals from 1950 - 2022</h4><br/></h2>" +
                    "<div class=\"labels\">" +
                    // "<div class=\"min\">" + limits[0] + "</div>" +
                    // "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
                    "</div>";

                div.innerHTML = legendInfo;

                limits.forEach(function (limit, index) {
                    labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
                });

                div.innerHTML += "<ul>" + labels.join("") + "</ul>";
                return div;
            }

            legend.addTo(myMap);

            instanceslayer = L.choropleth(summaryGeoJson, {

                // Define which property in the features to use.
                valueProperty: "instances",
                // Set the color scale.
                scale: ["#ffffb2", "#b10026"],
                // The number of breaks in the step range
                steps: 10,
                // q for quartile, e for equidistant, k for k-means
                mode: "q",
                style: {
                    // Border color
                    color: "#fff",
                    weight: 1,
                    fillOpacity: 0.8
                },

                // Binding a popup to each layer
                onEachFeature: function (feature, layer) {
                    layer.bindPopup("<strong>" + feature.properties.country + "</strong><br /><br />Total Deaths: " +
                        feature.properties.deaths + "<br /><br />Total Affected: " + feature.properties.affected + "<br /><br />Total Occurences: " + feature.properties.instances);
                }
            }).addTo(instancesChoro);
            instancesChoro.addTo(myMap);
            // var ilegend = L.control({ position: "bottomright" });
            // ilegend.onAdd = function (map) {
            //   var div = L.DomUtil.create("div", "info legend");
            //   var iLimits = instanceslayer.options.limits;
            //   var iColors = instanceslayer.options.colors;
            //   var iLabels = [];

            //   var legendInfo = "<h1>Legend<br/></h1>" +
            //     "<div class=\"labels\">" +
            //     "<div class=\"min\">" + iLimits[0] + "</div>" +
            //     "<div class=\"max\">" + iLimits[iLimits.length - 1] + "</div>" +
            //     "</div>";

            //   div.innerHTML = legendInfo;

            //   iLimits.forEach(function (iLimits, index) {
            //     iLabels.push("<li style=\"background-color: " + iColors[index] + "\"></li>");
            //   });

            //   div.innerHTML += "<ul>" + iLabels.join("") + "</ul>";
            //   return div;
            // }

            // ilegend.addTo(myMap);
            affectedlayer = L.choropleth(summaryGeoJson, {

                // Define which property in the features to use.
                valueProperty: "affected",
                // Set the color scale.
                scale: ["#ffffb2", "#b10026"],
                // The number of breaks in the step range
                steps: 10,
                // q for quartile, e for equidistant, k for k-means
                mode: "q",
                style: {
                    // Border color
                    color: "#fff",
                    weight: 1,
                    fillOpacity: 0.8
                },

                // Binding a popup to each layer
                onEachFeature: function (feature, layer) {
                    layer.bindPopup("<strong>" + feature.properties.country + "</strong><br /><br />Total Deaths: " +
                        feature.properties.deaths + "<br /><br />Total Affected: " + feature.properties.affected + "<br /><br />Total Occurences: " + feature.properties.instances);
                }
            }).addTo(affectedChoro);
            affectedChoro.addTo(myMap);
            // var alegend = L.control({ position: "bottomright" });
            // alegend.onAdd = function (map) {
            //   var div = L.DomUtil.create("div", "info legend");
            //   var aLimits = instanceslayer.options.limits;
            //   var aColors = instanceslayer.options.colors;
            //   var aLabels = [];

            //   var legendInfo = "<h1>Legend<br/></h1>" +
            //     "<div class=\"labels\">" +
            //     "<div class=\"min\">" + aLimits[0] + "</div>" +
            //     "<div class=\"max\">" + aLimits[aLimits.length - 1] + "</div>" +
            //     "</div>";

            //   div.innerHTML = legendInfo;

            //   aLimits.forEach(function (aLimits, index) {
            //     aLabels.push("<li style=\"background-color: " + aColors[index] + "\"></li>");
            //   });

            //   div.innerHTML += "<ul>" + aLabels.join("") + "</ul>";
            //   return div;
            // }

            // alegend.addTo(myMap);
        }
        );
    })
}
function LinePlots(Lineid) {
    if (Lineid === 'Deaths') {
        sel = 3
    }
    else if (Lineid === 'Affected') {
        sel = 4
    }
    else if (Lineid === 'Damages') {
        sel = 5
    }
    else {
        sel = 6
    };
    d3.json("http://127.0.0.1:5000/decade").then(data => {
        decade = data
        flood = data.filter(row => row[1] === 'Flood')

        let FloodData = {
            x: flood.map(obj => obj[0]),
            y: flood.map(obj => obj[sel]),
            mode: 'lines',
            line: {
                color: 'rgb(219, 64, 82)',
                width: 3
            },
            name: 'Flood'
        };
        let lineData = [FloodData]
        let layout = {
            title: `Flood Decadal Averages of ${Lineid}`,
            paper_bgcolor: 'rgba(245,246,249,1)',
            plot_bgcolor: 'rgba(245,246,249,1)',
        };
        Plotly.newPlot('line', lineData, layout)
    })
    d3.json("http://127.0.0.1:5000/type_breakdown").then(function (data) {
        let flood = data.filter(row => row[1] === "Flood")
        let top10=flood.sort((a,b)=>b[sel]-a[sel]).slice(0,10).reverse()
    var barData=[{
        type:'bar',
        x:top10.map(row=>row[sel]),
        y:top10.map(row=>row[0]),
        orientation:'h',
        marker: {
            color: 'rgba(50,171, 96, 0.7)',
            line: {

                color: 'rgba(50,171,96,1.0)',

                width: 2
            }}
    }]
    let layout = {
        title: `Top 10 Countries with Most Flood Total ${Lineid}`,
        yaxis: {
            automargin: true
          },
          paper_bgcolor: 'rgba(245,246,249,1)',
          plot_bgcolor: 'rgba(245,246,249,1)',
      };
      Plotly.newPlot("plot", barData, layout);
    })
}

let color = []
function dSetChanged(Lineid) {
    LinePlots(Lineid);
};
function init() {
    let DatadropDown = d3.select('#selLineDataset');
    let Lineid = DatadropDown.property('value');
    dSets = ['Deaths', 'Affected', 'Damages', 'Occurences'];
    Object.values(dSets).forEach(value => {
        DatadropDown.append('option').text(value);
    });
    mapping();
    LinePlots(dSets[0]);
    feather.replace({ 'aria-hidden': 'true' })
}
init();