function currentDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  return `<strong> ${date.getHours() < 10 ? '0' : '' + date.getHours()}:${date.getMinutes() < 10 ? '0' : '' + date.getMinutes()} </strong> ${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
let currentTime = new Date();
document.querySelector(`.date`).innerHTML = currentDate(currentTime);

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hrs = date.getHours();
  let min = date.getMinutes();
  if (hrs < 10) {
    hrs = `0${hrs}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }
  return `${hrs}:${min}`;
}


function displayWeather(response) {

  celsiusTemp = response.data.main.temp;

  document.querySelector(`h1`).innerHTML = response.data.name;
  document.querySelector(`#temperature`).innerHTML = Math.round(response.data.main.temp);
  document.querySelector(`#humidity`).innerHTML = response.data.main.humidity;
  document.querySelector(`#wind`).innerHTML = Math.round(response.data.wind.speed);
  document.querySelector(`#clouds`).innerHTML = response.data.weather[0].description;
  document.querySelector(`#sunrise`).innerHTML = formatTime(response.data.sys.sunrise * 1000);
  document.querySelector(`#sunset`).innerHTML = formatTime(response.data.sys.sunset * 1000);
  document.querySelector(`#icon`).setAttribute(`src`, `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  document.querySelector(`#icon`).setAttribute(`alt`, response.data.weather[0].description)
}

function displayForecast(response) {

  let forecast = null;
  let forecastElement = document.querySelector(`#forecast`);
  forecastElement.innerHTML = null;

  for (let index = 0; index < 6; index++) {

    forecast = response.data.list[index];

    forecastElement.innerHTML += `      
  <div class="col-2">
    <h3>
    ${formatTime(forecast.dt * 1000)}
    </h2>
    <h3>
    ${Math.round(response.data.list[0].main.temp)}°C
    </h3>
    <img src= "https://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png"></i>
  </div>`
  }
}

function search(city) {
  let apiKey = `e51c2a6a7756a9cab824e5d6224c7dcc`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
  let units = `metric`;
  axios.get(`${apiUrl}q=${city}&units=${units}&appid=${apiKey}`).then(displayWeather);

  apiUrl = (`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`)
  axios.get(apiUrl).then(displayForecast);


}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector(`#search-city`).value;
  search(city)
}
document.querySelector(`.search-city`).addEventListener(`submit`, searchCity);

function getPosition(event) {
  event.preventDefault()
  navigator.geolocation.getCurrentPosition(searchPosition);
}

function searchPosition(position) {
  let apiKey = `e51c2a6a7756a9cab824e5d6224c7dcc`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

document.querySelector(`#location`).addEventListener(`click`, getPosition);

function convertF(event) {
  event.preventDefault();
  document.querySelector(`#celsius-unit`).classList.remove(`active`);
  document.querySelector(`#farenheit-unit`).classList.add(`active`);
  document.querySelector(`#temperature`).innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
};

document.querySelector(`#farenheit-unit`).addEventListener(`click`, convertF);

function convertC(event) {
  event.preventDefault();
  document.querySelector(`#celsius-unit`).classList.add(`active`);
  document.querySelector(`#farenheit-unit`).classList.remove(`active`);
  document.querySelector(`#temperature`).innerHTML = Math.round(celsiusTemp);
};

document.querySelector(`#celsius-unit`).addEventListener(`click`, convertC);

let celsiusTemp = null;

search(`Barcelona`);







