"use strict";

const clockTitle = document.querySelector(".js-clock");
const getClock = () => {
  const xmas = new Date(`${new Date().getFullYear()}/12/25 00:00:00`);
  const now = new Date();
  const dDay = new Date(xmas - now);
  const days = Math.floor(dDay / (24 * 60 * 60 * 1000));
  const hours = Math.floor((dDay / (60 * 60 * 1000)) % 24);
  const minutes = Math.floor((dDay / (60 * 1000)) % 60);
  // const seconds = Math.floor((dDay / 1000) % 60);
  clockTitle.innerText = `${days}d ${hours}h ${minutes}m left until Holiday.`;
};
getClock();
setInterval(getClock, 1000);
