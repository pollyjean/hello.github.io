"use strict";

const clockWrap = document.querySelector(".clock-weather");
const clock = clockWrap.querySelector("#clock");
const cal = clockWrap.querySelector("#cal");
let isSeconds = true;

function getTime() {
  const d = new Date();
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const seconds = d.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const hours_ampm = hours > 12 ? hours - 12 : hours;
  if (minutes === "00" && seconds === "00") {
    paintCal();
  }
  return isSeconds ? `${hours}:${minutes}:${seconds}` : `${ampm} ${hours_ampm}:${minutes}`;
}
function switchSeconds() {
  isSeconds = !isSeconds;
  paintClock();
}
function getDays() {
  const d = new Date();
  const weeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const years = d.getFullYear().toString();
  const months = d.getMonth().toString().padStart(2, "0");
  const days = d.getDate().toString().padStart(2, "0");
  const week = d.getDay();

  return `${years}-${months}-${days} ${weeks[week]}`;
}

function paintClock() {
  clock.innerText = getTime();
}
function paintCal() {
  cal.innerText = getDays();
}

clock.addEventListener("click", switchSeconds);

paintCal();
paintClock();
setInterval(paintClock, 1000);
