"use strict"

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
        for (let j = 0; j < continentList.length; j++) {
            if (fullData[i].continent == continentList[j]) {
                continentData[j].push(fullData[i])

            }
        }
    }
    
    console.log(continentData)
    displayNewCases(continentData)
    displayTotalDeaths(continentData)
    displayTotalCases(continentData)
    displayNewDeaths(continentData)
    displayTotalVaccinations(continentData)
    calculateWorlwideNewCases(continentData)
}

function displayNewCases(continentData) {
    let newCases = calculateNewCases(continentData)
    const labels = continentList

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

function calculateNewCases(continentData) {
    let newCases = []

    for (let i = 0; i < continentData.length; i++) {
        let totalNumber = 0

        for (let j = 0; j < continentData[i].length; j++) {
            if (continentData[i][j].new_cases != null) {
                totalNumber += continentData[i][j].new_cases
            }
        }

        newCases.push(totalNumber)
    }

    return newCases
}

function calculateTotalDeaths(continentData) {
    let totalDeaths = []

    for (let i = 0; i < continentData.length; i++) {
        let totalNumber = 0

        for (let j = 0; j < continentData[i].length; j++) {
            if (continentData[i][j].total_deaths != null) {
                totalNumber += continentData[i][j].total_deaths
            }
        }

        totalDeaths.push(totalNumber)
    }

    return totalDeaths
}

function displayTotalDeaths(continentData) {
    let totalDeaths = calculateTotalDeaths(continentData)
    const labels = continentList

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

function calculateTotalCases(continentData) {
    let totalCases = []

    for (let i = 0; i < continentData.length; i++) {
        let totalNumber = 0

        for (let j = 0; j < continentData[i].length; j++) {
            if (continentData[i][j].total_cases != null) {
                totalNumber += continentData[i][j].total_cases
            }
        }

        totalCases.push(totalNumber)
    }

    return totalCases
}

function displayNewDeaths(continentData) {
    let newDeaths = calculateNewDeaths(continentData)
    const labels = continentList

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

function calculateNewDeaths(continentData) {
    let newDeaths = []

    for (let i = 0; i < continentData.length; i++) {
        let totalNumber = 0

        for (let j = 0; j < continentData[i].length; j++) {
            if (continentData[i][j].new_deaths != null) {
                totalNumber += continentData[i][j].new_deaths
            }
        }

        newDeaths.push(totalNumber)
    }

    return newDeaths
}

function displayTotalCases(continentData) {
    let totalCases = calculateTotalCases(continentData)
    const labels = continentList

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

    for (let i = 0; i < continentData.length; i++) {
        let totalNumber = 0

        for (let j = 0; j < continentData[i].length; j++) {
            if (continentData[i][j].people_fully_vaccinated != null) {
                totalNumber += continentData[i][j].people_fully_vaccinated
            }
        }

        totalVaccinations.push(totalNumber);
    }

    return totalVaccinations
}

function displayTotalVaccinations(continentData) {
    let totalVaccinations = calculateTotalVaccinations(continentData)
    const labels = continentList

    var ctx = document.getElementById("donut-graph").getContext('2d');
        ctx.canvas.width = 200;
        ctx.canvas.height = 200;

        var donutChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: continentList,
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

    for (let i = 0; i < continentData.length; i++) {
        for (let j = 0; j < continentData[i].length; j++) {
            if (continentData[i][j].new_cases != null) {
                worldwideTotalNewCases += continentData[i][j].new_cases
            }
        }
    }

    let worldWideNewCases = document.getElementById("world-total-cases")
    worldWideNewCases.innerHTML = worldwideTotalNewCases;
}


let fullData = []
let continentList = ["Asia", "Africa", "Europe", "North America", "South America", "Oceania"]
let continentData = [[], [], [], [], [], []]     // Stores separated data by continents

storeData()