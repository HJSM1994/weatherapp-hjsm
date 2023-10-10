let dateToday = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[dateToday.getDay()];
let hours = dateToday.getHours().toString().padStart(2, "0");
let minutes = dateToday.getMinutes().toString().padStart(2, "0");
console.log(dateToday);
let today = document.querySelector("h5");
today.textContent = `${day}, ${hours}:${minutes}`;

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-form input[type='text']");
  searchCity(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

function showWeather(response) {
  let h6 = document.querySelector("h6");
  let h7 = document.querySelector("h7");
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  h6.innerHTML = `It is currently ${temperature}°c, ${description}, in ${response.data.name}`;
  h7.innerHTML = `<strong> Humidity: </strong> ${humidity}%  <br/> <strong> Wind Speed: </strong> ${wind}mph`;
}

function getCurrentPosition(position) {
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function searchCity(city) {
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

let buttonElement = document.querySelector("#button-click");
buttonElement.addEventListener("click", getLocation);
