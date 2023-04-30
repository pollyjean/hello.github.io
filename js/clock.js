"use strict";

const clock = document.querySelector("#clock");
const cal = document.querySelector("#cal");
let isSeconds = true;

const getTime = () => {
  const d = new Date();
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const seconds = d.getSeconds().toString().padStart(2, "0");
  const amPm = hours >= 12 ? "PM" : "AM";
  let hours_amPm = hours > 12 ? hours - 12 : hours;
  hours_amPm = hours_amPm.toString().padStart(2, "0");
  if (minutes === "00" && seconds === "00") {
    paintCal();
  }
  return isSeconds ? `${hours}:${minutes}:${seconds}` : `${amPm} ${hours_amPm}:${minutes}`;
};
const switchSeconds = () => {
  isSeconds = !isSeconds;
  paintClock();
};
const getDays = () => {
  const d = new Date();
  const weeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const years = d.getFullYear().toString();
  const months = (d.getMonth() + 1).toString().padStart(2, "0");
  const days = d.getDate().toString().padStart(2, "0");
  const week = d.getDay();

  return `${years}-${months}-${days} ${weeks[week]}`;
};

const paintClock = () => {
  clock.innerText = getTime();
};
const paintCal = () => {
  cal.innerText = getDays();
};

clock.addEventListener("click", switchSeconds);

paintCal();
paintClock();
setInterval(paintClock, 1000);
