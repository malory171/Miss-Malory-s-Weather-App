function resfreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weatherAppIcon"/>`;
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity} %`;
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "a3ab2befb0aeo33880eb42d02209d3et";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(resfreshWeather);
}
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Cologne");

function getForecast(city) {
  let apiKey = "a3ab2befb0aeo33880eb42d02209d3et";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      if (index === 0) {
        forecastHtml =
          forecastHtml +
          `
      <div class="weatherForecastDay">
      <div class="weatherForecastDate" >Today</div>
      <div><img src="${
        day.condition.icon_url
      }" class="weatherForecastIcon"/></div>
      <div class="weatherForecastTemperatures">
      <div class="weatherForecastTemperature"><strong>${Math.round(
        day.temperature.maximum
      )}°</strong></div>
      <div class="weatherForecastTemperature">${Math.round(
        day.temperature.minimum
      )}°</div>
      </div>
      </div>`;
      } else {
        forecastHtml =
          forecastHtml +
          `
    <div class="weatherForecastDay">
    <div class="weatherForecastDate">${formatDay(day.time)}</div>
    <div><img src="${
      day.condition.icon_url
    }" class="weatherForecastIcon"/></div>
    <div class="weatherForecastTemperatures">
    <div class="weatherForecastTemperature"><strong>${Math.round(
      day.temperature.maximum
    )}°</strong></div>
    <div class="weatherForecastTemperature">${Math.round(
      day.temperature.minimum
    )}°</div>
    </div>
    </div>`;
      }
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
