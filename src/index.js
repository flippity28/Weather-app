function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
function ordinal(currentDate) {
  if (currentDate === 1 || currentDate === 21 || currentDate === 31) {
    return currentDate + "<sup>st</sup>";
  } else if (currentDate === 2 || currentDate === 22) {
    return currentDate + "<sup>nd</sup>";
  } else if (currentDate === 3 || currentDate === 23) {
    return currentDate + "<sup>rd</sup>";
  } else {
    return currentDate + "<sup>th</sup>";
  }
}
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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
    "December",
  ];
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let currentDate = ordinal(date.getDate());
  let hour = date.getHours();
  let min = addZero(date.getMinutes());
  let formattedDate = `${hour}:${min} ${day} ${currentDate} ${month}`;
  return formattedDate;
}
function formatDateCondensed(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let day = days[date.getDay()];
  let currentDate = ordinal(date.getDate());
  let formattedDate = `${day} ${currentDate}`;
  return formattedDate;
}
function searchLocation(event) {
  event.preventDefault();
  let location = document.querySelector("#location-search").value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentWeather).catch(errorFunction);
  axios.get(apiUrl).then(getCityCoords);
}
function errorFunction() {
  let location = document.querySelector("#location-search").value;
  if (location.length > 0) {
    alert(
      `Sorry we do not have weather data for ${location}, please try searching for another city`
    );
  } else {
    alert(`Please search for a location to see the weather forecast`);
  }
}
function getCityCoords(response) {
  let lat = response.data.coord.lat;
  let long = response.data.coord.lon;
  let apiUrlTwo = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlTwo).then(showWeatherForecast);
}
function changePhoto() {
  event.preventDefault();
  let location = document.querySelector("#location-search").value;
  let locationLower = location.trim().toLowerCase();
  if (locationLower === "london") {
    document.getElementById("photo").src = "images/london.jpg";
  } else if (locationLower === "dubai") {
    document.getElementById("photo").src = "images/dubai.jpg";
  } else if (locationLower === "edinburgh") {
    document.getElementById("photo").src = "images/edinburgh.jpg";
  } else if (locationLower === "new york") {
    document.getElementById("photo").src = "images/new york.jpg";
  } else if (locationLower === "rome") {
    document.getElementById("photo").src = "images/rome.jpg";
  } else if (locationLower === "paris") {
    document.getElementById("photo").src = "images/paris.jpg";
  } else if (locationLower === "sydney") {
    document.getElementById("photo").src = "images/sydney.jpg";
  } else {
    document.getElementById("photo").src = "images/sky.jpg";
  }
}
function changeFahrenheit() {
  units = "imperial";
  let unit = document.querySelector(".unit");
  unit.innerHTML = ` °F`;
  let todayLowUnit = document.querySelector("#today-low-unit");
  todayLowUnit.innerHTML = ` °F`;
  let todayHighUnit = document.querySelector("#today-high-unit");
  todayHighUnit.innerHTML = ` °F`;
  let dayOneUnit = document.querySelector("#day-one-unit");
  dayOneUnit.innerHTML = ` °F`;
  let dayTwoUnit = document.querySelector("#day-two-unit");
  dayTwoUnit.innerHTML = ` °F`;
  let dayThreeUnit = document.querySelector("#day-three-unit");
  dayThreeUnit.innerHTML = ` °F`;
  let dayFourUnit = document.querySelector("#day-four-unit");
  dayFourUnit.innerHTML = ` °F`;
  let dayFiveUnit = document.querySelector("#day-five-unit");
  dayFiveUnit.innerHTML = ` °F`;
  let location = document.querySelector("#location-search").value;
  if (location.length > 0) {
    document.querySelector("#search-button").click();
  } else {
    document.querySelector("#current-location").click();
  }
  let speedUnit = document.querySelector("#speed-unit");
  speedUnit.innerHTML = `mph`;
  let feelsLikeUnit = document.querySelector("#feels-like-unit");
  feelsLikeUnit.innerHTML = ` °F`;
}
function changeCelsius() {
  units = "metric";
  let unit = document.querySelector(".unit");
  unit.innerHTML = ` °C`;
  let todayLowUnit = document.querySelector("#today-low-unit");
  todayLowUnit.innerHTML = ` °C`;
  let todayHighUnit = document.querySelector("#today-high-unit");
  todayHighUnit.innerHTML = ` °C`;
  let dayOneUnit = document.querySelector("#day-one-unit");
  dayOneUnit.innerHTML = ` °C`;
  let dayTwoUnit = document.querySelector("#day-two-unit");
  dayTwoUnit.innerHTML = ` °C`;
  let dayThreeUnit = document.querySelector("#day-three-unit");
  dayThreeUnit.innerHTML = ` °C`;
  let dayFourUnit = document.querySelector("#day-four-unit");
  dayFourUnit.innerHTML = ` °C`;
  let dayFiveUnit = document.querySelector("#day-five-unit");
  dayFiveUnit.innerHTML = ` °C`;
  let location = document.querySelector("#location-search").value;
  if (location.length > 0) {
    document.querySelector("#search-button").click();
  } else {
    document.querySelector("#current-location").click();
  }
  let speedUnit = document.querySelector("#speed-unit");
  speedUnit.innerHTML = `m/s`;
  let feelsLikeUnit = document.querySelector("#feels-like-unit");
  feelsLikeUnit.innerHTML = ` °C`;
}
function showCurrentWeather(response) {
  console.log(response);
  let currentTemp = Math.round(response.data.main.temp);
  let temp = document.querySelector(".current-temp");
  let currentWeatherDescription = response.data.weather[0].description;
  let description = document.querySelector("#current-weather-description");
  let currentLocation = response.data.name;
  let country = response.data.sys.country;
  let city = document.querySelector("#city");
  temp.innerHTML = `${currentTemp}`;
  description.innerHTML = `${currentWeatherDescription}`;
  city.innerHTML = `${currentLocation}, ${country}`;
  let moreInfoLink = document.querySelector("#more-info-link");
  moreInfoLink.setAttribute(
    "href",
    `https://openweathermap.org/find?q=${currentLocation}`
  );
  let feelsLikeTemp = document.querySelector("#feels-like-temp");
  let todayFeelsLikeTemp = Math.round(response.data.main.feels_like);
  feelsLikeTemp.innerHTML = `${todayFeelsLikeTemp}`;
  let todayWeatherId = response.data.weather[0].id;
  let todayWeatherIcon = document.querySelector("#today-icon");
  if (
    todayWeatherId === 502 ||
    todayWeatherId === 503 ||
    todayWeatherId === 504 ||
    todayWeatherId === 522 ||
    todayWeatherId === 531
  ) {
    todayWeatherIcon.classList.add("fa-cloud-showers-heavy");
    todayWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud",
      "fa-cloud-sun",
      "fa-sun",
      "fa-snowflake",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (todayWeatherId === 804 || todayWeatherId === 803) {
    todayWeatherIcon.classList.add("fa-cloud");
    todayWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud-showers-heavy",
      "fa-cloud-sun",
      "fa-sun",
      "fa-snowflake",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (todayWeatherId === 801 || todayWeatherId === 802) {
    todayWeatherIcon.classList.add("fa-cloud-sun");
    todayWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud-showers-heavy",
      "fa-cloud",
      "fa-sun",
      "fa-snowflake",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (todayWeatherId === 800) {
    todayWeatherIcon.classList.add("fa-sun");
    todayWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud-sun",
      "fa-cloud",
      "fa-cloud-showers-heavy",
      "fa-snowflake",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (
    (todayWeatherId > 599 && todayWeatherId < 623) ||
    todayWeatherId === 511
  ) {
    todayWeatherIcon.classList.add("fa-snowflake");
    todayWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud-sun",
      "fa-cloud",
      "fa-cloud-showers-heavy",
      "fa-sun",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (
    todayWeatherId === 500 ||
    todayWeatherId === 501 ||
    todayWeatherId === 520 ||
    todayWeatherId === 521 ||
    (todayWeatherId > 299 && todayWeatherId < 322)
  ) {
    todayWeatherIcon.classList.add("fa-cloud-rain");
    todayWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud",
      "fa-cloud-sun",
      "fa-sun",
      "fa-cloud-showers-heavy",
      "fa-snowflake",
      "fa-smog",
      "fa-bolt"
    );
  } else if (todayWeatherId > 199 && todayWeatherId < 233) {
    todayWeatherIcon.classList.add("fa-bolt");
    todayWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud",
      "fa-cloud-sun",
      "fa-cloud-rain",
      "fa-sun",
      "fa-cloud-showers-heavy",
      "fa-snowflake",
      "fa-smog"
    );
  } else if (todayWeatherId > 699 && todayWeatherId < 782) {
    todayWeatherIcon.classList.add("fa-smog");
    todayWeatherIcon.classList.remove(
      "fa-bolt",
      "fa-info",
      "fa-cloud",
      "fa-cloud-sun",
      "fa-cloud-rain",
      "fa-sun",
      "fa-cloud-showers-heavy",
      "fa-snowflake"
    );
  }
}
function showWeatherForecast(response) {
  console.log(response);
  let todayWeatherDescription = response.data.daily[0].weather[0].description;
  let todayDescription = document.querySelector("#today-description");
  todayDescription.innerHTML = `${todayWeatherDescription}`;
  let todayHighTemp = Math.round(response.data.daily[0].temp.max);
  let todayHigh = document.querySelector("#today-high");
  todayHigh.innerHTML = `${todayHighTemp}`;
  let todayLowTemp = Math.round(response.data.daily[0].temp.min);
  let todayLow = document.querySelector("#today-low");
  todayLow.innerHTML = `${todayLowTemp}`;
  let todayRain = Math.round(response.data.daily[0].pop * 100);
  let todayRainChance = document.querySelector("#today-rain-percent");
  if (todayRain > 0) {
    todayRainChance.innerHTML = `${todayRain}`;
  } else {
    todayRainChance.innerHTML = `0`;
  }
  let todayWindspeed = Math.round(response.data.daily[0].wind_speed);
  let todayWind = document.querySelector("#today-windspeed");
  todayWind.innerHTML = `${todayWindspeed}`;
  let todaySunriseUnix = response.data.daily[0].sunrise;
  let timeSunrise = new Date(todaySunriseUnix * 1000);
  let hoursSunrise = addZero(timeSunrise.getHours());
  let minutesSunrise = addZero(timeSunrise.getMinutes());
  let todaySunriseTime = document.querySelector("#today-sunrise");
  todaySunriseTime.innerHTML = `${hoursSunrise}:${minutesSunrise}`;
  let todaySunsetUnix = response.data.daily[0].sunset;
  let timeSunset = new Date(todaySunsetUnix * 1000);
  let hoursSunset = addZero(timeSunset.getHours());
  let minutesSunset = addZero(timeSunset.getMinutes());
  let todaySunsetTime = document.querySelector("#today-sunset");
  todaySunsetTime.innerHTML = `${hoursSunset}:${minutesSunset}`;

  let dayOneHighTemp = Math.round(response.data.daily[1].temp.max);
  let dayOneHigh = document.querySelector("#day-one-high");
  dayOneHigh.innerHTML = `${dayOneHighTemp}`;
  let dayOneLowTemp = Math.round(response.data.daily[1].temp.min);
  let dayOneLow = document.querySelector("#day-one-low");
  dayOneLow.innerHTML = `${dayOneLowTemp}`;
  let dayOneWeatherId = response.data.daily[1].weather[0].id;
  let dayOneWeatherIcon = document.querySelector("#day-one-icon");
  if (
    dayOneWeatherId === 502 ||
    dayOneWeatherId === 503 ||
    dayOneWeatherId === 504 ||
    dayOneWeatherId === 522 ||
    dayOneWeatherId === 531
  ) {
    dayOneWeatherIcon.classList.add("fa-cloud-showers-heavy");
    dayOneWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud",
      "fa-cloud-sun",
      "fa-sun",
      "fa-snowflake",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (dayOneWeatherId === 804 || dayOneWeatherId === 803) {
    dayOneWeatherIcon.classList.add("fa-cloud");
    dayOneWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud-showers-heavy",
      "fa-cloud-sun",
      "fa-sun",
      "fa-snowflake",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (dayOneWeatherId === 801 || dayOneWeatherId === 802) {
    dayOneWeatherIcon.classList.add("fa-cloud-sun");
    dayOneWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud-showers-heavy",
      "fa-cloud",
      "fa-sun",
      "fa-snowflake",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (dayOneWeatherId === 800) {
    dayOneWeatherIcon.classList.add("fa-sun");
    dayOneWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud-sun",
      "fa-cloud",
      "fa-cloud-showers-heavy",
      "fa-snowflake",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (
    (dayOneWeatherId > 599 && dayOneWeatherId < 623) ||
    dayOneWeatherId === 511
  ) {
    dayOneWeatherIcon.classList.add("fa-snowflake");
    dayOneWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud-sun",
      "fa-cloud",
      "fa-cloud-showers-heavy",
      "fa-sun",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (
    dayOneWeatherId === 500 ||
    dayOneWeatherId === 501 ||
    dayOneWeatherId === 520 ||
    dayOneWeatherId === 521 ||
    (dayOneWeatherId > 299 && dayOneWeatherId < 322)
  ) {
    dayOneWeatherIcon.classList.add("fa-cloud-rain");
    dayOneWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud",
      "fa-cloud-sun",
      "fa-sun",
      "fa-cloud-showers-heavy",
      "fa-snowflake",
      "fa-smog",
      "fa-bolt"
    );
  } else if (dayOneWeatherId > 199 && dayOneWeatherId < 233) {
    dayOneWeatherIcon.classList.add("fa-bolt");
    dayOneWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud",
      "fa-cloud-sun",
      "fa-cloud-rain",
      "fa-sun",
      "fa-cloud-showers-heavy",
      "fa-snowflake",
      "fa-smog"
    );
  } else if (dayOneWeatherId > 699 && dayOneWeatherId < 782) {
    dayOneWeatherIcon.classList.add("fa-smog");
    dayOneWeatherIcon.classList.remove(
      "fa-bolt",
      "fa-info",
      "fa-cloud",
      "fa-cloud-sun",
      "fa-cloud-rain",
      "fa-sun",
      "fa-cloud-showers-heavy",
      "fa-snowflake"
    );
  }

  let dayTwoHighTemp = Math.round(response.data.daily[2].temp.max);
  let dayTwoHigh = document.querySelector("#day-two-high");
  dayTwoHigh.innerHTML = `${dayTwoHighTemp}`;
  let dayTwoLowTemp = Math.round(response.data.daily[2].temp.min);
  let dayTwoLow = document.querySelector("#day-two-low");
  dayTwoLow.innerHTML = `${dayTwoLowTemp}`;
  let dayTwoWeatherId = response.data.daily[2].weather[0].id;
  let dayTwoWeatherIcon = document.querySelector("#day-two-icon");
  if (
    dayTwoWeatherId === 502 ||
    dayTwoWeatherId === 503 ||
    dayTwoWeatherId === 504 ||
    dayTwoWeatherId === 522 ||
    dayTwoWeatherId === 531
  ) {
    dayTwoWeatherIcon.classList.add("fa-cloud-showers-heavy");
    dayTwoWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud",
      "fa-cloud-sun",
      "fa-sun",
      "fa-snowflake",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (dayTwoWeatherId === 804 || dayTwoWeatherId === 803) {
    dayTwoWeatherIcon.classList.add("fa-cloud");
    dayTwoWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud-showers-heavy",
      "fa-cloud-sun",
      "fa-sun",
      "fa-snowflake",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (dayTwoWeatherId === 801 || dayTwoWeatherId === 802) {
    dayTwoWeatherIcon.classList.add("fa-cloud-sun");
    dayTwoWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud-showers-heavy",
      "fa-cloud",
      "fa-sun",
      "fa-snowflake",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (dayTwoWeatherId === 800) {
    dayTwoWeatherIcon.classList.add("fa-sun");
    dayTwoWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud-sun",
      "fa-cloud",
      "fa-cloud-showers-heavy",
      "fa-snowflake",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (
    (dayTwoWeatherId > 599 && dayTwoWeatherId < 623) ||
    dayTwoWeatherId === 511
  ) {
    dayTwoWeatherIcon.classList.add("fa-snowflake");
    dayTwoWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud-sun",
      "fa-cloud",
      "fa-cloud-showers-heavy",
      "fa-sun",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (
    dayTwoWeatherId === 500 ||
    dayTwoWeatherId === 501 ||
    dayTwoWeatherId === 520 ||
    dayTwoWeatherId === 521 ||
    (dayTwoWeatherId > 299 && dayTwoWeatherId < 322)
  ) {
    dayTwoWeatherIcon.classList.add("fa-cloud-rain");
    dayTwoWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud",
      "fa-cloud-sun",
      "fa-sun",
      "fa-cloud-showers-heavy",
      "fa-snowflake",
      "fa-smog",
      "fa-bolt"
    );
  } else if (dayTwoWeatherId > 199 && dayTwoWeatherId < 233) {
    dayTwoWeatherIcon.classList.add("fa-bolt");
    dayTwoWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud",
      "fa-cloud-sun",
      "fa-cloud-rain",
      "fa-sun",
      "fa-cloud-showers-heavy",
      "fa-snowflake",
      "fa-smog"
    );
  } else if (dayTwoWeatherId > 699 && dayTwoWeatherId < 782) {
    dayTwoWeatherIcon.classList.add("fa-smog");
    dayTwoWeatherIcon.classList.remove(
      "fa-bolt",
      "fa-info",
      "fa-cloud",
      "fa-cloud-sun",
      "fa-cloud-rain",
      "fa-sun",
      "fa-cloud-showers-heavy",
      "fa-snowflake"
    );
  }

  let dayThreeHighTemp = Math.round(response.data.daily[3].temp.max);
  let dayThreeHigh = document.querySelector("#day-three-high");
  dayThreeHigh.innerHTML = `${dayThreeHighTemp}`;
  let dayThreeLowTemp = Math.round(response.data.daily[3].temp.min);
  let dayThreeLow = document.querySelector("#day-three-low");
  dayThreeLow.innerHTML = `${dayThreeLowTemp}`;
  let dayThreeWeatherId = response.data.daily[3].weather[0].id;
  let dayThreeWeatherIcon = document.querySelector("#day-three-icon");
  if (
    dayThreeWeatherId === 502 ||
    dayThreeWeatherId === 503 ||
    dayThreeWeatherId === 504 ||
    dayThreeWeatherId === 522 ||
    dayThreeWeatherId === 531
  ) {
    dayThreeWeatherIcon.classList.add("fa-cloud-showers-heavy");
    dayThreeWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud",
      "fa-cloud-sun",
      "fa-sun",
      "fa-snowflake",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (dayThreeWeatherId === 804 || dayThreeWeatherId === 803) {
    dayThreeWeatherIcon.classList.add("fa-cloud");
    dayThreeWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud-showers-heavy",
      "fa-cloud-sun",
      "fa-sun",
      "fa-snowflake",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (dayThreeWeatherId === 801 || dayThreeWeatherId === 802) {
    dayThreeWeatherIcon.classList.add("fa-cloud-sun");
    dayThreeWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud-showers-heavy",
      "fa-cloud",
      "fa-sun",
      "fa-snowflake",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (dayThreeWeatherId === 800) {
    dayThreeWeatherIcon.classList.add("fa-sun");
    dayThreeWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud-sun",
      "fa-cloud",
      "fa-cloud-showers-heavy",
      "fa-snowflake",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (
    (dayThreeWeatherId > 599 && dayThreeWeatherId < 623) ||
    dayThreeWeatherId === 511
  ) {
    dayThreeWeatherIcon.classList.add("fa-snowflake");
    dayThreeWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud-sun",
      "fa-cloud",
      "fa-cloud-showers-heavy",
      "fa-sun",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (
    dayThreeWeatherId === 500 ||
    dayThreeWeatherId === 501 ||
    dayThreeWeatherId === 520 ||
    dayThreeWeatherId === 521 ||
    (dayThreeWeatherId > 299 && dayThreeWeatherId < 322)
  ) {
    dayThreeWeatherIcon.classList.add("fa-cloud-rain");
    dayThreeWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud",
      "fa-cloud-sun",
      "fa-sun",
      "fa-cloud-showers-heavy",
      "fa-snowflake",
      "fa-smog",
      "fa-bolt"
    );
  } else if (dayThreeWeatherId > 199 && dayThreeWeatherId < 233) {
    dayThreeWeatherIcon.classList.add("fa-bolt");
    dayThreeWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud",
      "fa-cloud-sun",
      "fa-cloud-rain",
      "fa-sun",
      "fa-cloud-showers-heavy",
      "fa-snowflake",
      "fa-smog"
    );
  } else if (dayThreeWeatherId > 699 && dayThreeWeatherId < 782) {
    dayThreeWeatherIcon.classList.add("fa-smog");
    dayThreeWeatherIcon.classList.remove(
      "fa-bolt",
      "fa-info",
      "fa-cloud",
      "fa-cloud-sun",
      "fa-cloud-rain",
      "fa-sun",
      "fa-cloud-showers-heavy",
      "fa-snowflake"
    );
  }

  let dayFourHighTemp = Math.round(response.data.daily[4].temp.max);
  let dayFourHigh = document.querySelector("#day-four-high");
  dayFourHigh.innerHTML = `${dayFourHighTemp}`;
  let dayFourLowTemp = Math.round(response.data.daily[4].temp.min);
  let dayFourLow = document.querySelector("#day-four-low");
  dayFourLow.innerHTML = `${dayFourLowTemp}`;
  let dayFourWeatherId = response.data.daily[4].weather[0].id;
  let dayFourWeatherIcon = document.querySelector("#day-four-icon");
  if (
    dayFourWeatherId === 502 ||
    dayFourWeatherId === 503 ||
    dayFourWeatherId === 504 ||
    dayFourWeatherId === 522 ||
    dayFourWeatherId === 531
  ) {
    dayFourWeatherIcon.classList.add("fa-cloud-showers-heavy");
    dayFourWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud",
      "fa-cloud-sun",
      "fa-sun",
      "fa-snowflake",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (dayFourWeatherId === 804 || dayFourWeatherId === 803) {
    dayFourWeatherIcon.classList.add("fa-cloud");
    dayFourWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud-showers-heavy",
      "fa-cloud-sun",
      "fa-sun",
      "fa-snowflake",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (dayFourWeatherId === 801 || dayFourWeatherId === 802) {
    dayFourWeatherIcon.classList.add("fa-cloud-sun");
    dayFourWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud-showers-heavy",
      "fa-cloud",
      "fa-sun",
      "fa-snowflake",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (dayFourWeatherId === 800) {
    dayFourWeatherIcon.classList.add("fa-sun");
    dayFourWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud-sun",
      "fa-cloud",
      "fa-cloud-showers-heavy",
      "fa-snowflake",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (
    (dayFourWeatherId > 599 && dayFourWeatherId < 623) ||
    dayFourWeatherId === 511
  ) {
    dayFourWeatherIcon.classList.add("fa-snowflake");
    dayFourWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud-sun",
      "fa-cloud",
      "fa-cloud-showers-heavy",
      "fa-sun",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (
    dayFourWeatherId === 500 ||
    dayFourWeatherId === 501 ||
    dayFourWeatherId === 520 ||
    dayFourWeatherId === 521 ||
    (dayFourWeatherId > 299 && dayFourWeatherId < 322)
  ) {
    dayFourWeatherIcon.classList.add("fa-cloud-rain");
    dayFourWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud",
      "fa-cloud-sun",
      "fa-sun",
      "fa-cloud-showers-heavy",
      "fa-snowflake",
      "fa-smog",
      "fa-bolt"
    );
  } else if (dayFourWeatherId > 199 && dayFourWeatherId < 233) {
    dayFoureatherIcon.classList.add("fa-bolt");
    dayFourWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud",
      "fa-cloud-sun",
      "fa-cloud-rain",
      "fa-sun",
      "fa-cloud-showers-heavy",
      "fa-snowflake",
      "fa-smog"
    );
  } else if (dayFourWeatherId > 699 && dayFourWeatherId < 782) {
    dayFourWeatherIcon.classList.add("fa-smog");
    dayFourWeatherIcon.classList.remove(
      "fa-bolt",
      "fa-info",
      "fa-cloud",
      "fa-cloud-sun",
      "fa-cloud-rain",
      "fa-sun",
      "fa-cloud-showers-heavy",
      "fa-snowflake"
    );
  }

  let dayFiveHighTemp = Math.round(response.data.daily[5].temp.max);
  let dayFiveHigh = document.querySelector("#day-five-high");
  dayFiveHigh.innerHTML = `${dayFiveHighTemp}`;
  let dayFiveLowTemp = Math.round(response.data.daily[5].temp.min);
  let dayFiveLow = document.querySelector("#day-five-low");
  dayFiveLow.innerHTML = `${dayFiveLowTemp}`;
  let dayFiveWeatherId = response.data.daily[5].weather[0].id;
  let dayFiveWeatherIcon = document.querySelector("#day-five-icon");
  if (
    dayFiveWeatherId === 502 ||
    dayFiveWeatherId === 503 ||
    dayFiveWeatherId === 504 ||
    dayFiveWeatherId === 522 ||
    dayFiveWeatherId === 531
  ) {
    dayFiveWeatherIcon.classList.add("fa-cloud-showers-heavy");
    dayFiveWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud",
      "fa-cloud-sun",
      "fa-sun",
      "fa-snowflake",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (dayFiveWeatherId === 804 || dayFiveWeatherId === 803) {
    dayFiveWeatherIcon.classList.add("fa-cloud");
    dayFiveWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud-showers-heavy",
      "fa-cloud-sun",
      "fa-sun",
      "fa-snowflake",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (dayFiveWeatherId === 801 || dayFiveWeatherId === 802) {
    dayFiveWeatherIcon.classList.add("fa-cloud-sun");
    dayFiveWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud-showers-heavy",
      "fa-cloud",
      "fa-sun",
      "fa-snowflake",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (dayFiveWeatherId === 800) {
    dayFiveWeatherIcon.classList.add("fa-sun");
    dayFiveWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud-sun",
      "fa-cloud",
      "fa-cloud-showers-heavy",
      "fa-snowflake",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (
    (dayFiveWeatherId > 599 && dayFiveWeatherId < 623) ||
    dayFiveWeatherId === 511
  ) {
    dayFiveWeatherIcon.classList.add("fa-snowflake");
    dayFiveWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud-sun",
      "fa-cloud",
      "fa-cloud-showers-heavy",
      "fa-sun",
      "fa-cloud-rain",
      "fa-smog",
      "fa-bolt"
    );
  } else if (
    dayFiveWeatherId === 500 ||
    dayFiveWeatherId === 501 ||
    dayFiveWeatherId === 520 ||
    dayFiveWeatherId === 521 ||
    (dayFiveWeatherId > 299 && dayFiveWeatherId < 322)
  ) {
    dayFiveWeatherIcon.classList.add("fa-cloud-rain");
    dayFiveWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud",
      "fa-cloud-sun",
      "fa-sun",
      "fa-cloud-showers-heavy",
      "fa-snowflake",
      "fa-smog",
      "fa-bolt"
    );
  } else if (dayFiveWeatherId > 199 && dayFiveWeatherId < 233) {
    dayFiveWeatherIcon.classList.add("fa-bolt");
    dayFiveWeatherIcon.classList.remove(
      "fa-info",
      "fa-cloud",
      "fa-cloud-sun",
      "fa-cloud-rain",
      "fa-sun",
      "fa-cloud-showers-heavy",
      "fa-snowflake",
      "fa-smog"
    );
  } else if (dayFiveWeatherId > 699 && dayFiveWeatherId < 782) {
    dayFiveWeatherIcon.classList.add("fa-smog");
    dayFiveWeatherIcon.classList.remove(
      "fa-bolt",
      "fa-info",
      "fa-cloud",
      "fa-cloud-sun",
      "fa-cloud-rain",
      "fa-sun",
      "fa-cloud-showers-heavy",
      "fa-snowflake"
    );
  }
}

function getLocation(location) {
  let lat = location.coords.latitude;
  let long = location.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  let apiUrlTwo = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentWeather);
  axios.get(apiUrlTwo).then(showWeatherForecast);
}
function getCoords() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate(new Date());

let dayOne = document.querySelector("#day-one");
dayOne.innerHTML = formatDateCondensed(
  new Date(new Date().valueOf() + 1000 * 3600 * 24)
);

let dayTwo = document.querySelector("#day-two");
dayTwo.innerHTML = formatDateCondensed(
  new Date(new Date().valueOf() + 1000 * 3600 * 48)
);
let dayThree = document.querySelector("#day-three");
dayThree.innerHTML = formatDateCondensed(
  new Date(new Date().valueOf() + 1000 * 3600 * 72)
);
let dayFour = document.querySelector("#day-four");
dayFour.innerHTML = formatDateCondensed(
  new Date(new Date().valueOf() + 1000 * 3600 * 96)
);
let dayFive = document.querySelector("#day-five");
dayFive.innerHTML = formatDateCondensed(
  new Date(new Date().valueOf() + 1000 * 3600 * 120)
);
let units = "metric";
let apiKey = "f5937ab22539bc6268f9a982f0955523";
let city = "London";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
axios.get(apiUrl).then(showCurrentWeather).catch(errorFunction);
axios.get(apiUrl).then(getCityCoords);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchLocation);
searchButton.addEventListener("click", changePhoto);

let fahrenheitButton = document.querySelector(".fahrenheit");
fahrenheitButton.addEventListener("click", changeFahrenheit);

let celsiusButton = document.querySelector(".celsius");
celsiusButton.addEventListener("click", changeCelsius);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCoords);
