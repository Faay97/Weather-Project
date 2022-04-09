function formatDate(now) {
  let dates = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = dates[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${date} ${hour}:${minutes}`;
}
let currentTime = new Date();
let day = document.querySelector(".day");

day.innerHTML = formatDate(currentTime);

function searching(city) {
  let apiKey = "156d56571be94f1383a53abf8e9ae72f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  axios.get(`${apiUrl}&units=metric`).then(temperature);
}

function enterSubmit(event) {
  event.preventDefault();
  let searchElement = document.querySelector("#search-input");
  searching(searchElement.value);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", enterSubmit);

function temperature(response) {
  celciusTemp = response.data.main.temp;
  document.querySelector("#city-display").innerHTML = response.data.name;
  document.querySelector("#temp-number").innerHTML = Math.round(celciusTemp);
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveLocation);
}
function retrieveLocation(position) {
  let apiKey = "156d56571be94f1383a53abf8e9ae72f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`;

  axios.get(`${apiUrl}&units=metric`).then(temperature);
}
let currentLocationButton = document.querySelector("#location");
currentLocationButton.addEventListener("click", getCurrentLocation);

function displayFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let fahrenheitTemperature = celciusTemp * 1.8 + 32;
  let tempElement = document.querySelector("#temp-number");
  tempElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  document.querySelector("#temp-number").innerHTML = Math.round(celciusTemp);
}

let fahrenheitLink = document.querySelector("#fahren");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#cels");
celsiusLink.addEventListener("click", displayCelsius);

let celciusTemp = null;

searching("Toronto");
