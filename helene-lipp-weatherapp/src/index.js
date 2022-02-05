// TASK 1
// In your project, display the current date and time using JavaScript: Tuesday 16:00

let currentTime = new Date();
let dateTime = document.querySelector(".date-time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currentTime.getDay()];

let date = currentTime.getDate();

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
let month = months[currentTime.getMonth()];

let hour = currentTime.getHours();
hour = ("0" + hour).slice(-2); //will return 2 digit numbers
let minute = currentTime.getMinutes();
minute = ("0" + minute).slice(-2); //will return 2 digit numbers

dateTime.innerHTML = `${day}, ${date} ${month} | ${hour}:${minute}`;

/* REMARKS

Convert 24h -> 12h
console.log(
  currentTime.toLocaleTimeString("en-US", {
      -> (had to change from UTC into CET (would be good to find a better/cleaner solution))
    timeZone: "CET",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  })
); */

// TASK 2
// Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

//Checks if input is empty, has spaces or is a digit. IMPORTANT -> Find solution for special chars!!
function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// TASK 3
// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

//°F = °C * 1,8 + 32
function toFahrenheit(event) {
  event.preventDefault();
  currentTemp.innerHTML = Math.round(currentTemp.innerHTML * 1.8 + 32);
  //after clicking °F, the °F "button" turns grey and it becomes disabeled to prevent further calculating °F into °F.
  //the °C "button" turns back to its default color and becomes enabled again so the user can calculate °F back into °C again.
  fahrTemp.style.color = "#70757a";
  celsTemp.style.color = "#212529";
  fahrTemp.style.pointerEvents = "none";
  celsTemp.style.pointerEvents = "auto";
}

//C = 5/9 x (F - 32)
function toCelsius(event) {
  event.preventDefault();
  currentTemp.innerHTML = Math.round((5 / 9) * (currentTemp.innerHTML - 32));
  celsTemp.style.color = "#70757a";
  fahrTemp.style.color = "#212529";
  fahrTemp.style.pointerEvents = "auto";
  celsTemp.style.pointerEvents = "none";
}

let currentTemp = document.querySelector("#temp-number");

let celsTemp = document.querySelector("#cels-temp");
celsTemp.addEventListener("click", toCelsius);

let fahrTemp = document.querySelector("#fahr-temp");
fahrTemp.addEventListener("click", toFahrenheit);

//Shecodes Week 5

function searchCity(event) {
  event.preventDefault();
  let yourCity = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  yourCity.innerHTML = cityInput.value;
  let apiKey = "4efc6ed0d8a5848e351fd6f5f7ecdbc7";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=${units}`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(displayTemperature);
}

function displayTemperature(response) {
  let yourTemperature = Math.round(response.data.main.temp);
  let yourWeather = document.querySelector(".temp-number");
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".min-temperature").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector(".max-temperature").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector(".sunrise").innerHTML = response.data.sys.sunrise;
  document.querySelector(".sunset").innerHTML = response.data.sys.sunset;

  yourWeather.innerHTML = `${yourTemperature}°`;
}

let yourCityForm = document.querySelector("#search-form");
yourCityForm.addEventListener("submit", searchCity);
