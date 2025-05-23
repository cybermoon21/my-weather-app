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

function formatDate(date){
    let dayNum = date.getDay();
    let days = ["Sunday", "Monday", "Tuesday", "Thursday", "Friday", "Saturday"];
    let day = days[dayNum];

    let curDate = date.getDate();

    let monthNum = date.getMonth();
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let month = months[monthNum];

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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", getApi);

let currentDate = new Date();

let currentDateElement = document.querySelector("#current-date");
currentDateElement.innerHTML = formatDate(currentDate);

let currentTimeElement = document.querySelector("#current-time");
currentTimeElement.innerHTML = formatTime(currentDate);
