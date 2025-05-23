function formatDate(date){
    let days = ["Sunday", "Monday", "Tuesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

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

function getApi(city) {
    let apiKey = '434at24abcb5077obabee921e64ef383';
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    
    axios.get(apiUrl).then(updateApp);
}

function runSearch(event){
    event.preventDefault();
    
    let city = document.querySelector("#search-input").value;

    getApi(city);
}

getApi("Durban");

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", runSearch);

