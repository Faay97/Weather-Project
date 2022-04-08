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

function searching(event) {
  event.preventDefault();
  let search = document.querySelector("#search-input").value;
  let apiKey = "156d56571be94f1383a53abf8e9ae72f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`;

  axios.get(`${apiUrl}&units=metric`).then(temperature);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", searching);

function temperature(response) {
  document.querySelector("#city-display").innerHTML = response.data.name;
  document.querySelector("#number").innerHTML = Math.round(
    response.data.main.temp
  );
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
  //position.preventDefault();
  let apiKey = "156d56571be94f1383a53abf8e9ae72f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`;

  axios.get(`${apiUrl}&units=metric`).then(temperature);
}
let currentLocationButton = document.querySelector("#location");
currentLocationButton.addEventListener("click", getCurrentLocation);
