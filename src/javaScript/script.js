function date() {
  let now = new Date();

  let h3 = document.querySelector("#date");

  let hours = now.getHours();
  let minutes = now.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  h3.innerHTML = `${day} ${hours}: ${minutes}`;
}

date();


function searchLocation(position) {
  let apiKey = "049fb32dcd4a672d3fcbdb2a37413a71";
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiLink).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", getCurrentLocation);


function forecast(coordinates){
  let apiKey = "049fb32dcd4a672d3fcbdb2a37413a71";
  let apiLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiLink).then(showForecast);
}

function showWeather(response) {
  celsius = response.data.main.temp;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsius);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
console.log(response.data)
  forecast(response.data.coord);
}


function forecastDates(timestamp){
let date = new Date(timestamp*1000);
let day = date.getDay();
let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

return days[day]
};


function showForecast(response) {
 let forecastZerzer =response.data.daily;


  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecastZerzer.forEach(function (forecastDay, index) {
    if(index < 7){
    forecastHTML =
      forecastHTML +
      `
      <div class="col days">
                  <div class="weatherForecast">
                    <div class="forcastDate">${forecastDates(forecastDay.dt)}</div>
                    <img 
                  src=" http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}.png"
                  alt=""
                  width="50"
                  />
                  <div class="forecastTemp">
                  <span class="forcast max">${Math.round(forecastDay.temp.max)}</span>
                  <span class="forcast max">${Math.round(forecastDay.temp.min)}</span>
                  </div>
                </div>
              </div>
  `;
  }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function search(city) {
  let apiKey = "049fb32dcd4a672d3fcbdb2a37413a71";
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiLink).then(showWeather);
}

function submitButton(event) {
  event.preventDefault();
  let city = document.querySelector("#input-value");
  search(city.value);
}



function displayCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsius);
}

let celsius = null;

let form = document.querySelector("#form");
form.addEventListener("submit", submitButton);




search("Tigray");

