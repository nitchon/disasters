d3.json("https://n-disaster.herokuapp.com/decade").then(data => {
    decade=data
    drought = data.filter(row => row[1] === 'Drought')
    flood = data.filter(row => row[1] === 'Flood')
    storm = data.filter(row => row[1] === 'Storm')
    temp = data.filter(row => row[1] === 'Extreme temperature')
    wildfire = data.filter(row => row[1] === 'Wildfire')

    var numChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: drought.map(row => row[0]),
            datasets: [
                {
                    label: 'Drought',
                    data: drought.map(row => row[6]),
                    backgroundColor: 'brown'
                },
                {
                    label: 'Flood',
                    data: flood.map(row => row[6]),
                    backgroundColor: 'blue'
                },
                {
                    label: 'Storm',
                    data: storm.map(row => row[6]),
                    backgroundColor: 'green'
                },
                {
                    label: 'Extreme Temperature',
                    data: temp.map(row => row[6]),
                    backgroundColor: 'red'
                },
                {
                    label: 'Wildfire',
                    data: wildfire.map(row => row[6]),
                    backgroundColor: 'orange'
                },
            ]
        },

        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Number of Disaster Occurences'
                }
            }
        },
        responsive: true,
        scales: {
            xAxes: {
                stacked: true
            },
            yAxes: {
                stacked: true,
            },
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Number of Disaster Occurences'
                },
            },
            scales: {
                xAxes: {
                    stacked: true
                },
                yAxes: {
                    stacked: true,
                },
            }
        }
    });
    var deathChart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: drought.map(row => row[0]),
            datasets: [
                {
                    label: 'Drought',
                    data: drought.map(row => row[3]),
                    backgroundColor: 'brown',
                    borderColor: 'brown',
                    fillColor:'brown',
                },
                {
                    label: 'Flood',
                    data: flood.map(row => row[3]),
                    backgroundColor: 'blue',
                    borderColor: 'blue',
                    fillColor:'blue',
                },
                {
                    label: 'Storm',
                    data: storm.map(row => row[3]),
                    backgroundColor: 'green',
                    borderColor: 'green',
                    fillColor:'green',
                },
                {
                    label: 'Extreme Temperature',
                    data: temp.map(row => row[3]),
                    backgroundColor: 'red',
                    borderColor: 'red',
                    fillColor:'red',
                },
                {
                    label: 'Wildfire',
                    data: wildfire.map(row => row[3]),
                    borderColor: 'orange',
                    fillColor:'orange',
                    backgroundColor:'orange'
                },
            ]
        },

        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Decadal Average: Number of Deaths'
                }
            }
        },
        responsive: true,
        scales: {
            xAxes: {
                stacked: true
            },
            yAxes: {
                stacked: true,
            },
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Decadal Average: Number of Deaths'
                },
            },
            scales: {
                xAxes: {
                    stacked: true
                },
                yAxes: {
                    stacked: true,
                },
            }
        }
    });
    var affectedChart = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: drought.map(row => row[0]),
            datasets: [
                {
                    label: 'Drought',
                    data: drought.map(row => row[4]),
                    backgroundColor: 'brown',
                    borderColor: 'brown',
                    fillColor:'brown',
                },
                {
                    label: 'Flood',
                    data: flood.map(row => row[4]),
                    backgroundColor: 'blue',
                    borderColor: 'blue',
                    fillColor:'blue',
                },
                {
                    label: 'Storm',
                    data: storm.map(row => row[4]),
                    backgroundColor: 'green',
                    borderColor: 'green',
                    fillColor:'green',
                },
                {
                    label: 'Extreme Temperature',
                    data: temp.map(row => row[4]),
                    backgroundColor: 'red',
                    borderColor: 'red',
                    fillColor:'red',
                },
                {
                    label: 'Wildfire',
                    data: wildfire.map(row => row[4]),
                    borderColor: 'orange',
                    fillColor:'orange',
                    backgroundColor:'orange'
                },
            ]
        },

        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Decadal Average: Number of Affected'
                }
            }
        },
        responsive: true,
        scales: {
            xAxes: {
                stacked: true
            },
            yAxes: {
                stacked: true,
            },
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Decadal Average: Number of Affected'
                },
            },
            scales: {
                xAxes: {
                    stacked: true
                },
                yAxes: {
                    stacked: true,
                },
            }
        }
    });
    var damagesChart = new Chart(ctx4, {
        type: 'line',
        data: {
            labels: drought.map(row => row[0]),
            datasets: [
                {
                    label: 'Drought',
                    data: drought.map(row => row[5]),
                    backgroundColor: 'brown',
                    borderColor: 'brown',
                    fillColor:'brown',
                },
                {
                    label: 'Flood',
                    data: flood.map(row => row[5]),
                    backgroundColor: 'blue',
                    borderColor: 'blue',
                    fillColor:'blue',
                },
                {
                    label: 'Storm',
                    data: storm.map(row => row[5]),
                    backgroundColor: 'green',
                    borderColor: 'green',
                    fillColor:'green',
                },
                {
                    label: 'Extreme Temperature',
                    data: temp.map(row => row[5]),
                    backgroundColor: 'red',
                    borderColor: 'red',
                    fillColor:'red',
                },
                {
                    label: 'Wildfire',
                    data: wildfire.map(row => row[5]),
                    borderColor: 'orange',
                    fillColor:'orange',
                    backgroundColor:'orange'
                },
            ]
        },

        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Decadal Average: Total Damages'
                }
            }
        },
        responsive: true,
        scales: {
            xAxes: {
                stacked: true
            },
            yAxes: {
                stacked: true,
            },
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Decadal Average: Total Damages'
                },
            },
            scales: {
                xAxes: {
                    stacked: true
                },
                yAxes: {
                    stacked: true,
                },
            }
        }
    })
})
d3.json("https://n-disaster.herokuapp.com/tempchange").then(function(data){
    let color=[]    
    for (row of data){
            if (row[1]>0){
                color.push('blue')
            }
            else {
                color.push('red')
            }
        }
        let tempData = [{
            x:data.map(row=>row[0]),
            y:data.map(row=>row[1]),
            type:'bar',
            marker:{
                color:color
            }
        }]
        let tempLayout = {
            title: `Land and Sea Temperature Change`,
            xaxis:{
                title:'Year'
            },
            yaxis: {
                title:'Degrees Celsius',
                automargin: true
              }
          };
          Plotly.newPlot("temp_plot", tempData, tempLayout);
    })


var ctx = document.getElementById('instancesChart')
var ctx2 = document.getElementById('deathChart')
var ctx3 = document.getElementById('affectedChart')
var ctx4 = document.getElementById('damagesChart')
feather.replace({ 'aria-hidden': 'true' })