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
  console.log(response.data)
  document.querySelector(`h1`).innerHTML = response.data.name;
  document.querySelector(`#temperature`).innerHTML = Math.round(response.data.main.temp);
  document.querySelector(`#humidity`).innerHTML = response.data.main.humidity;
  document.querySelector(`#wind`).innerHTML = Math.round(response.data.wind.speed);
  document.querySelector(`#clouds`).innerHTML = response.data.weather[0].description;
  document.querySelector(`#sunrise`).innerHTML = formatTime(response.data.sys.sunrise * 1000);
  document.querySelector(`#sunset`).innerHTML = formatTime(response.data.sys.sunset * 1000);
  document.querySelector(`#icon`).setAttribute(`src`, `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  document.querySelector(`#icon`).setAttribute(`alt`, response.data.weather[0].description)
}

function search(city) {
  let apiKey = `e51c2a6a7756a9cab824e5d6224c7dcc`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
  let units = `metric`;
  axios.get(`${apiUrl}q=${city}&units=${units}&appid=${apiKey}`).then(displayWeather);
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
  let temperature = document.querySelector(`#temperature`).innerHTML;
  temperature = Number(temperature);
  document.querySelector(`#temperature`).innerHTML = Math.round((temperature * 9) / 5 + 32);
};

document.querySelector(`#farenheit-unit`).addEventListener(`click`, convertF);

function convertC(event) {
  event.preventDefault();
  let temp = document.querySelector(`#temperature`);
  temp.innerHTML = 19;
};

document.querySelector(`#celsius-unit`).addEventListener(`click`, convertC);

search(`Barcelona`);







