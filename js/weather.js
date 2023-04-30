"use strict";

const API_KEY = "9069349b13f012579bd411d9cec732fd";
const weatherElement = document.querySelector("#weather");
const weatherLoc = document.querySelector(".weather__loc");
const weatherStat = document.querySelector(".weather__stat");
const weatherTemp = document.querySelector(".weather__temp");
const weatherId = document.querySelector(".weather__id");
const onGeoSuccess = (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      weatherElement.classList.add("active");
      weatherLoc.innerText = data.name;
      weatherStat.innerText = data.weather[0].main;
      weatherTemp.innerText = `${parseFloat(data.main.temp).toFixed(1)}℃`;
      weatherId.innerHTML = `<img src="https://openweathermap.org/img/wn/${searchWeather(data.weather[0].id)}${searchDayNight()}@2x.png" alt="${data.weather[0].main}" />`;
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

const searchDayNight = () => {
  const d = parseInt(new Date().getHours());

  if (d >= 6 && d <= 17) {
    return "d";
  } else {
    return "n";
  }
};

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
