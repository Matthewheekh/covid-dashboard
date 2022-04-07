async function fetchData() {
    try {
        let response = await fetch("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json", {
            method: 'GET',
            redirect: 'follow'
        })
        let result = await response.text()
        return JSON.parse(result)
    } catch (error) {
        console.log(error)
    }
}

async function storeData() {
    let dataSet = await fetchData()
    for (let data in dataSet) {
        fullData.push(dataSet[data])
    }

    for (let i = 0; i < fullData.length; i++) {
        if (fullData[i].continent == "North America") {
            continentData.push(fullData[i])
        }
    }
    console.log(continentData)
    calculateWorlwideNewCases(continentData)// PLEASE DO NOT RUN THIS AFTER DISPLAYNEWCASES ~Andrew
    displayNewCases(continentData)
    displayTotalDeaths(continentData)
    displayTotalCases(continentData)
    displayNewDeaths(continentData)
    displayTotalVaccinations(continentData)
    
}

function displayNewCases(continentData) {
    let sorted = calculateNewCases(continentData)
    let newCases = []
    let labels = []
    for(i=0;i<sorted.length;i++){
        newCases.push(sorted[i][1])
        labels.push(sorted[i][0])
    }
    

    var ctx = document.getElementById('myChart1').getContext('2d');
        ctx.canvas.width = 550;
        ctx.canvas.height = 350;

        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'New Cases',
                    // fetch data here from interface.js
                    data: newCases,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
}
//I CANT BELIEVE IT WORKED AND IVE NEVER WORKED WITH JS BEFORE THIS
function calculateNewCases(continentData) {
    let newCases = []
    let count = 0
    let found = 0
    while(count < 6){
        let i = 0
        let mostCases = 0
        while(i<continentData.length) {
            
            if (continentData[i].new_cases > mostCases && count < 6) {
                found = i
                mostCases = continentData[i].new_cases
            }
            i++
        }
        newCases.push([continentData[found].location,continentData[found].new_cases])
        continentData[found].new_cases = 0
        count = count + 1
    }
    console.log(newCases)
    return newCases
}
//Works
function calculateTotalDeaths(continentData) {
    let totalDeaths = []
    let count = 0
    let found = 0

    while(count < 6){
        let i = 0
        let mostCases = 0
        while(i<continentData.length) {
            
            if (continentData[i].total_deaths > mostCases && count < 6) {
                found = i
                mostCases = continentData[i].total_deaths
            }
            i++
        }
        totalDeaths.push([continentData[found].location,continentData[found].total_deaths])
        continentData[found].total_deaths = 0
        count = count + 1
    }
    console.log(totalDeaths)
    return totalDeaths
}

function displayTotalDeaths(continentData) {
    let sorted = calculateTotalDeaths(continentData)
    let totalDeaths = []
    let labels = []
    for(i=0;i<sorted.length;i++){
        totalDeaths.push(sorted[i][1])
        labels.push(sorted[i][0])
    }

    var ctx = document.getElementById('myChart4').getContext('2d');
        ctx.canvas.width = 550;
        ctx.canvas.height = 350;

        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Deaths',
                    // fetch data here from interface.js
                    data: totalDeaths,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
}
//works
function calculateTotalCases(continentData) {
    let totalCases = []
    let count = 0
    let found = 0
    while(count < 6){
        let i = 0
        let mostCases = 0
        while(i<continentData.length) {
            
            if (continentData[i].total_cases > mostCases && count < 6) {
                found = i
                mostCases = continentData[i].total_cases
            }
            i++
        }
        totalCases.push([continentData[found].location,continentData[found].total_cases])
        continentData[found].total_cases = 0
        count = count + 1
    }
    console.log(totalCases)
    return totalCases
}

function displayNewDeaths(continentData) {
    let sorted = calculateNewDeaths(continentData)
    let newDeaths = []
    let labels = []
    for(i=0;i<sorted.length;i++){
        newDeaths.push(sorted[i][1])
        labels.push(sorted[i][0])
    }

    var ctx = document.getElementById('myChart3').getContext('2d');
        ctx.canvas.width = 550;
        ctx.canvas.height = 350;

        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'New Deaths',
                    // fetch data here from interface.js
                    data: newDeaths,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
}
//works??
function calculateNewDeaths(continentData) {
    let newDeaths = []

    let count = 0
    let found = 0
    while(count < 6){
        let i = 0
        let mostCases = 0
        while(i<continentData.length) {
            
            if (continentData[i].new_deaths > mostCases && count < 6) {
                found = i
                mostCases = continentData[i].new_deaths
            }
            i++
        }
        newDeaths.push([continentData[found].location,continentData[found].new_deaths])
        continentData[found].new_deaths = 0
        count = count + 1
    }
    console.log(newDeaths)

    return newDeaths
}

function displayTotalCases(continentData) {
    let sorted = calculateTotalCases(continentData)
    let totalCases = []
    let labels = []
    for(i=0;i<sorted.length;i++){
        totalCases.push(sorted[i][1])
        labels.push(sorted[i][0])
    }

    var ctx = document.getElementById('myChart2').getContext('2d');
        ctx.canvas.width = 550;
        ctx.canvas.height = 350;

        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Cases',
                    // fetch data here from interface.js
                    data: totalCases,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
}


function calculateTotalVaccinations(continentData) {
    let totalVaccinations = []

    let count = 0
    let found = 0
    while(count < 6){
        let i = 0
        let mostCases = 0
        while(i<continentData.length) {
            
            if (continentData[i].people_fully_vaccinated > mostCases && count < 6) {
                found = i
                mostCases = continentData[i].people_fully_vaccinated
            }
            i++
        }
        totalVaccinations.push([continentData[found].location,continentData[found].people_fully_vaccinated])
        continentData[found].people_fully_vaccinated = 0
        count = count + 1
    }
    console.log(totalVaccinations)

    return totalVaccinations
}

function displayTotalVaccinations(continentData) {
    let sorted = calculateTotalVaccinations(continentData)
    let totalVaccinations = []
    let labels = []
    for(i=0;i<sorted.length;i++){
        totalVaccinations.push(sorted[i][1])
        labels.push(sorted[i][0])
    }


    var ctx = document.getElementById("donut-graph").getContext('2d');
        ctx.canvas.width = 200;
        ctx.canvas.height = 200;

        var donutChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                  label: 'Total Vaccinations',
                  data: totalVaccinations,
                  backgroundColor: [
                    'rgb(255,0,0)',
                    'rgb(54, 162, 235)',
                    'rgb(255,215,0)',
                    'rgb(50,205,50)',
                    'rgb(255, 133, 71)',
                    'rgb(133, 71, 255)'
                  ],
                  hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Total People Vaccinated'
                  }
                }
              },
        })
}

function calculateWorlwideNewCases(continentData) {
    let worldwideTotalNewCases = 0;

    for(let i = 0;i<continentData.length;i++){
        console.log(continentData[i].location)
        console.log(worldwideTotalNewCases)
        worldwideTotalNewCases += continentData[i].new_cases
    }
    console.log(worldwideTotalNewCases)
    let worldWideNewCases = document.getElementById("world-total-cases")
    worldWideNewCases.innerHTML = worldwideTotalNewCases;
}

let fullData = []
let continentData = []
let continentList = ["Asia", "Africa", "Europe", "North America", "South America", "Oceania"]
storeData()
