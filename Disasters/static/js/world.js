function Plots(id) {
    d3.json('http://127.0.0.1:5000/continent_breakdown').then(data => {
        dataSelect = data.filter(obj => obj[0] === id)
        let instancesData = [{
            values: dataSelect.map(obj => obj[6]),
            labels: dataSelect.map(obj => obj[1]),
            type: "pie"
        }]
        var instancesLayout = {
            height: 500,
            width: 500,
            title: 'Number of Occurrences',
            paper_bgcolor: 'rgba(245,246,249,1)',
            plot_bgcolor: 'rgba(245,246,249,1)',
        };
        Plotly.newPlot('instancePie', instancesData, instancesLayout)
        let deathData = [{
            values: dataSelect.map(obj => obj[3]),
            labels: dataSelect.map(obj => obj[1]),
            type: "pie"
        }]
        var deathLayout = {
            height: 500,
            width: 500,
            title: 'Deaths',
            paper_bgcolor: 'rgba(245,246,249,1)',
            plot_bgcolor: 'rgba(245,246,249,1)',
        };
        Plotly.newPlot('deathPie', deathData, deathLayout)
        let lossData = [{
            values: dataSelect.map(obj => obj[5]),
            labels: dataSelect.map(obj => obj[1]),
            type: "pie"
        }]
        var lossLayout = {
            height: 500,
            width: 500,
            title: 'Damages',
            paper_bgcolor: 'rgba(245,246,249,1)',
            plot_bgcolor: 'rgba(245,246,249,1)',
        };
        Plotly.newPlot('lossPie', lossData, lossLayout)
    })

}

function LinePlots(Lineid) {
    d3.json('http://127.0.0.1:5000/continent_decade').then(data => {
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
        let AfricaData = {
            x: data.filter(obj => obj[0] === 'Africa').map(obj => obj[1]),
            y: data.filter(obj => obj[0]=== 'Africa').map(obj => obj[sel]),
            mode: 'lines+markers',
            name: 'Africa'
        };
        let AmericasData = {
            x: data.filter(obj => obj[0] === 'Americas').map(obj => obj[1]),
            y: data.filter(obj => obj[0] === 'Americas').map(obj => obj[sel]),
            mode: 'lines+markers',
            name: 'Americas'
        };
        let AsiaData = {
            x: data.filter(obj => obj[0] === 'Asia').map(obj => obj[1]),
            y: data.filter(obj => obj[0] === 'Asia').map(obj => obj[sel]),
            mode: 'lines+markers',
            name: 'Asia'
        };
        let EuropeData = {
            x: data.filter(obj => obj[0] === 'Europe').map(obj => obj[1]),
            y: data.filter(obj => obj[0] === 'Europe').map(obj => obj[sel]),
            mode: 'lines+markers',
            name: 'Europe'
        };
        let OceaniaData = {
            x: data.filter(obj => obj[0] === 'Oceania').map(obj => obj[1]),
            y: data.filter(obj => obj[0] === 'Oceania').map(obj => obj[sel]),
            mode: 'lines+markers',
            name: 'Oceania'
        }
        let layout = {
            title: `Decadal Averages of ${Lineid}`,
            paper_bgcolor: 'rgba(245,246,249,1)',
            plot_bgcolor: 'rgba(245,246,249,1)',
        };
        let lineData = [AfricaData, AmericasData, AsiaData, EuropeData, OceaniaData]
        Plotly.newPlot('line', lineData, layout)
    })
};

function optionChanged(id) {
    Plots(id);
};
function dSetChanged(Lineid) {
    LinePlots(Lineid);
};

function init() {
    let CondropDown = d3.select('#selDataset');
    let Conid = CondropDown.property('value');
    names = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
    Object.values(names).forEach(value => {
        CondropDown.append('option').text(value);
    });

    let DatadropDown = d3.select('#selLineDataset');
    let Lineid = DatadropDown.property('value');
    dSets = ['Deaths', 'Affected', 'Damages', 'Occurences'];
    Object.values(dSets).forEach(value => {
        DatadropDown.append('option').text(value);
    });
    Plots(names[0]);
    LinePlots(dSets[0]);
}
feather.replace({ 'aria-hidden': 'true' })
init()