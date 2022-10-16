var deathChoro = L.layerGroup();

var world = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var sat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});


var overlayMaps = {
    "Total Deaths": deathChoro,
};

var myMap = L.map("map", {
    center: [0, 0],
    zoom: 2,
    layers: [world]
});


const link = "https://raw.githubusercontent.com/nitchon/project-3/main/Working%20Maps/static/data/countries.geojson";

var deathlayer;

let features = [];

function plots() {
    d3.json(link).then(function (data) {
        let geo = data['features']
        geodata = geo
        d3.json("https://n-disaster.herokuapp.com/summary").then(function (data) {
            for (row of data) {
                country = row[0]
                instances = parseInt(row[5])
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

                var legendInfo = "<h3>Deaths from 1950 - 2022<br/></h2>" +
                    "<div class=\"labels\">" +
                    "<div class=\"min\">" + limits[0] + "</div>" +
                    "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
                    "</div>";

                div.innerHTML = legendInfo;

                limits.forEach(function (limit, index) {
                    labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
                });

                div.innerHTML += "<ul>" + labels.join("") + "</ul>";
                return div;
            }
            legend.addTo(myMap);

        }
        );

    })

    d3.json("https://n-disaster.herokuapp.com/deaths_data").then(function (data) {
        let death_data = [{
            x: data.map(row => row[0]),
            y: data.map(row => row[1]),
            type: 'bar',
            marker: {
                color: 'rgba(50,171, 96, 0.7)',
                line: {

                    color: 'rgba(50,171,96,1.0)',

                    width: 2
                }
            }
        }]
        let barlayout = {
            title: 'Number of Deaths from Disasters',
            xaxis: {
                title: 'Year'
            },
            yaxis: {
                title: 'Number of Deaths'
            },
            paper_bgcolor: 'rgba(245,246,249,1)',
            plot_bgcolor: 'rgba(245,246,249,1)',
        }
        Plotly.newPlot('deathBar', death_data, barlayout)
        let deathLinedata = [{
            x: data.map(row => row[0]),
            y: data.map(row => row[8]),
            mode: 'lines',
            line: {
                color: 'rgb(219, 64, 82)',
                width: 3
            }
        }]
        let lineLayout = {
            title: 'Deaths from Disasters as a Share of Total Deaths',
            xaxis: {
                title: 'Year'
            },
            yaxis: {
                title: 'Percentage'
            },
            paper_bgcolor: 'rgba(245,246,249,1)',
            plot_bgcolor: 'rgba(245,246,249,1)',
        }
        Plotly.newPlot('deathLine', deathLinedata, lineLayout)
    })
}
function LinePlots(Lineid) {
    if (Lineid === 'Totals') {
        d3.json("https://n-disaster.herokuapp.com/income").then(function (data) {
            brackets = ["Low-Income", "Lower-Middle Income", "Upper-Middle Income", "High-Income"]
            let lowData = {
                x: data.filter(obj => obj[0] === 'Low-Income').map(obj => obj[1]),
                y: data.filter(obj => obj[0] === 'Low-Income').map(obj => obj[2]),
                mode: 'lines+markers',
                name: 'Low-Income',
                line: {
                    width: 3
                }
            };
            let lowmidData = {
                x: data.filter(obj => obj[0] === 'Lower-Middle Income').map(obj => obj[1]),
                y: data.filter(obj => obj[0] === 'Lower-Middle Income').map(obj => obj[2]),
                mode: 'lines+markers',
                name: 'Lower-Middle Income',
                line: {
                    width: 3
                }
            };
            let upmidData = {
                x: data.filter(obj => obj[0] === 'Upper-Middle Income').map(obj => obj[1]),
                y: data.filter(obj => obj[0] === 'Upper-Middle Income').map(obj => obj[2]),
                mode: 'lines+markers',
                name: 'Upper-Middle Income',
                line: {
                    width: 3
                }
            };
            let highData = {
                x: data.filter(obj => obj[0] === 'High-Income').map(obj => obj[1]),
                y: data.filter(obj => obj[0] === 'High-Income').map(obj => obj[2]),
                mode: 'lines+markers',
                name: 'High-Income',
                line: {
                    width: 3
                }
            };
            let layout = {
                title: `Tracking Death Totals Based on GNI per Capita`,
                paper_bgcolor: 'rgba(245,246,249,1)',
                plot_bgcolor: 'rgba(245,246,249,1)',
                xaxis: {
                    title: 'Year'
                },
                yaxis: {
                    title: 'Total Number'
                },
            };
            let lineData = [lowData, lowmidData, upmidData, highData]
            Plotly.newPlot('incomeLine', lineData, layout)
        })
    }
    else {
        d3.json("https://n-disaster.herokuapp.com/incomeDecade").then(function (data) {
            brackets = ["Low-Income", "Lower-Middle Income", "Upper-Middle Income", "High-Income"]
            let lowData = {
                x: data.filter(obj => obj[0] === 'Low-Income').map(obj => obj[1]),
                y: data.filter(obj => obj[0] === 'Low-Income').map(obj => obj[3]),
                mode: 'lines+markers',
                name: 'Low-Income',
                line: {
                    width: 3
                }
            };
            let lowmidData = {
                x: data.filter(obj => obj[0] === 'Lower-Middle Income').map(obj => obj[1]),
                y: data.filter(obj => obj[0] === 'Lower-Middle Income').map(obj => obj[3]),
                mode: 'lines+markers',
                name: 'Lower-Middle Income',
                line: {
                    width: 3
                }
            };
            let upmidData = {
                x: data.filter(obj => obj[0] === 'Upper-Middle Income').map(obj => obj[1]),
                y: data.filter(obj => obj[0] === 'Upper-Middle Income').map(obj => obj[3]),
                mode: 'lines+markers',
                name: 'Upper-Middle Income',
                line: {
                    width: 3
                }
            };
            let highData = {
                x: data.filter(obj => obj[0] === 'High-Income').map(obj => obj[1]),
                y: data.filter(obj => obj[0] === 'High-Income').map(obj => obj[3]),
                mode: 'lines+markers',
                name: 'High-Income',
                line: {
                    width: 3
                }
            };
            let layout = {
                title: `Decadal Average Deaths Based on GNI per Capita`,
                paper_bgcolor: 'rgba(245,246,249,1)',
                plot_bgcolor: 'rgba(245,246,249,1)',
                xaxis: {
                    title: 'Year'
                },
                yaxis: {
                    title: 'Average Number'
                },
            };
            let lineData = [lowData, lowmidData, upmidData, highData]
            Plotly.newPlot('incomeLine', lineData, layout)
        })
    }

}

function dSetChanged(Lineid) {
    LinePlots(Lineid);
};

function init() {
    let DatadropDown = d3.select('#selLineDataset');
    let Lineid = DatadropDown.property('value');
    dSets = ['Totals', 'Decadal'];
    Object.values(dSets).forEach(value => {
        DatadropDown.append('option').text(value);
    });
    LinePlots(dSets[0]);
    plots()
    feather.replace({ 'aria-hidden': 'true' })
}



init();