"use strict";

const API_KEY = "9069349b13f012579bd411d9cec732fd";
const weatherElement = document.querySelector("#weather");
const weatherLoc = document.querySelector(".weather__loc");
const weatherStat = document.querySelector(".weather__stat");
const weatherTemp = document.querySelector(".weather__temp");
const weatherId = document.querySelector(".weather__id");
const sunTimes = { sunrise: {}, sunset: {}, stat: "" };
const onGeoSuccess = (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const sunUrl = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=today&formatted=0`;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(sunUrl)
    .then((response) => response.json())
    .then((data) => {
      sunTimes.sunrise = new Date(data.results.sunrise);
      sunTimes.sunset = new Date(data.results.sunset);

      data.status === "OK" &&
        fetch(weatherUrl)
          .then((response) => response.json())
          .then((data) => {
            weatherElement.classList.add("active");
            weatherLoc.innerText = data.name;
            weatherStat.innerText = data.weather[0].main;
            weatherTemp.innerText = `${parseFloat(data.main.temp).toFixed(1)}℃`;
            weatherId.innerHTML = `<img src="https://openweathermap.org/img/wn/${searchWeather(data.weather[0].id)}${searchDayNight()}@2x.png" alt="${data.weather[0].main}" />`;
          });
    });
};
const onGeoError = () => {
  console.log("cannot found geolocation");
};

weatherElement.addEventListener("click", () => {
  weatherStat.classList.toggle("hidden");
  weatherId.classList.toggle("hidden");
});

// https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
const searchWeather = (weatherId) => {
  const weather = weatherId.toString();
  const firstNum = weather.slice(0, 1);
  switch (firstNum) {
    case "2":
      return "11";
    case "3":
      return "09";
    case "5":
      return "10";
    case "6":
      return "13";
    case "7":
      return "50";
    case "8":
      if (weather === "800") {
        return "01";
      } else if (weather === "801") {
        return "02";
      } else if (weather === "802") {
        return "03";
      } else if (weather === "803" || weather === "804") {
        return "04";
      }
  }
};
export const searchDayNight = () => {
  const d = new Date();
  const hours = parseInt(d.getHours());
  const stat = sunTimes.stat;
  const sunrise = sunTimes.sunrise;
  const sunset = sunTimes.sunset;

  if (d >= sunrise && d <= sunset) {
    return "d";
  } else {
    return "n";
  }
};
navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
