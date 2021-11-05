// Show Date
let now = new Date();
let hourMinute = document.querySelector("#hour-minute");
let dayMonthYear = document.querySelector("#day-month-year");
let hour = now.getHours();
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let date = now.getDate();
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let year = now.getFullYear();
hourMinute.innerHTML = `${hour}:${minute}`;
dayMonthYear.innerHTML = `${day}, ${month} ${date}, ${year}`;

// Display Unit ºC vs ºF
function displayFahrenheit(event) {
  event.preventDefault();
  let display = document.querySelector("#temperature");
  display.innerHTML = 60.8;
}
function displayCelsius(event) {
  event.preventDefault();
  let display = document.querySelector("#temperature");
  display.innerHTML = 16;
}

let clickFahrenheit = document.querySelector("#fahrenheit");
clickFahrenheit.addEventListener("click", displayFahrenheit);

let clickCelsius = document.querySelector("#celsius");
clickCelsius.addEventListener("click", displayCelsius);

// Search Engine City Input

function showTemperatureCity(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#icon").innerHTML = response.data.weather[0].icon;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min").innerHTML = Math.round(
    response.data.main.temp_min
  );
}

function searchCity(city) {
  let apiKey = "031629f21faf86d633672c1b6ebeaf5a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperatureCity);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// Show Geolocation

function currentPosition(position) {
  let apiKey = "031629f21faf86d633672c1b6ebeaf5a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperatureCity);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let buttonCurrent = document.querySelector("#button-current");
buttonCurrent.addEventListener("click", getCurrentLocation);

searchCity("London");
