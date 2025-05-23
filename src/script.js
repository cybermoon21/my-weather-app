function getApi(event) {
    event.preventDefault();

    let apiKey = '434at24abcb5077obabee921e64ef383';
    let city = document.querySelector("#search-input").value;

    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    
    axios.get(apiUrl).then(runSearch);
}

function runSearch(response){
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.city;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.temperature.humidity;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = response.data.wind.speed;

    let currentTempElement = document.querySelector("#current-temp");
    let currentTemp = Math.round(response.data.temperature.current);
    currentTempElement.innerHTML = currentTemp;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", getApi);
