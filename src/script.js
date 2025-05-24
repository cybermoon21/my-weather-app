function formatDate(date){
    let days = ["Sunday", "Monday", "Tuesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()-1];

    let curDate = date.getDate();

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let month = months[date.getMonth()];

    let year = date.getFullYear();

    let formattedDate = `${day}, ${curDate} ${month} ${year}`;
    return formattedDate;
}

function formatTime(date){
    let minutes = date.getMinutes();
    let hours = date.getHours();

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    if (hours < 10) {
        hours = `0${hours}`;
    }

    let formattedTime = `${hours}:${minutes}`;
    return formattedTime;
}

function updateApp(response){
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.city;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.temperature.humidity;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = response.data.wind.speed;

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.condition.description;
    
    let currentDate = new Date(response.data.time * 1000);
    let currentDateElement = document.querySelector("#current-date");
    currentDateElement.innerHTML = formatDate(currentDate);
    let currentTimeElement = document.querySelector("#current-time");
    currentTimeElement.innerHTML = formatTime(currentDate);

    let iconElement = document.querySelector("#icon");
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="temp-icon"/>`;

    let currentTempElement = document.querySelector("#current-temp");
    let currentTemp = Math.round(response.data.temperature.current);
    currentTempElement.innerHTML = currentTemp;
}

function updateForecast(response){
    let forecastElement = document.querySelector("#forecast");

    let days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    let forecastResults = response.data.daily;

    let forecastHTML  = "";

    let now = "";
    
    for (let i = 0; i < 5; i++) {
        let daily = forecastResults[i];
        let now = new Date(daily.time * 1000);

        forecastHTML += `<div class="forecast-container">
            <h3>${days[now.getDay()]}</h3>
            <img src="${daily.condition.icon_url}" class="weather-emoji" />
            <div class="weather-temp">
            <div>${Math.round(daily.temperature.minimum)}°C</div>
            <div> / </div>
            <div>${Math.round(daily.temperature.maximum)}°C</div>
            </div>
        </div>`;
    }

    forecastElement.innerHTML = forecastHTML;

}

function getCurrentTempApi(city){
    let apiKey = '434at24abcb5077obabee921e64ef383';
    let apiCurTempUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    
    axios.get(apiCurTempUrl).then(updateApp);
}

function getForecastApi(city){
    let apiKey = '434at24abcb5077obabee921e64ef383';
    let apiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

    axios.get(apiForecastUrl).then(updateForecast);
}

function runSearch(event){
    event.preventDefault();
    
    let searchElement = document.querySelector("#search-input");
    let city = searchElement.value;

    getCurrentTempApi(city);
    getForecastApi(city);

    searchElement.value = "";
}

getCurrentTempApi("Durban");
getForecastApi("Durban");

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", runSearch);

