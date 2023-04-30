"use strict";

import { searchDayNight } from "./weather.js";

const loginForm = document.querySelector("#login-form");
const greeting = document.querySelector("#greeting");
const loginInput = loginForm.querySelector("input");
const HIDDEN_CLASS_NAME = "hidden";
const USERNAME_KEY = "username";
const savedUsername = localStorage.getItem(USERNAME_KEY);
const paintGreeting = () => {
  const dayNight = searchDayNight();
  const hour = parseInt(new Date().getHours());
  let greetingTxt = "";
  if (dayNight === "d") {
    greetingTxt = hour > 11 ? "Good afternoon" : "Good morning";
  } else if (dayNight === "n") {
    greetingTxt = hour > 23 ? "Good night" : "Good evening";
  }
  return greetingTxt;
};
const switchToGreeting = (username) => {
  const greetingTxt = paintGreeting();
  document.title = `${greetingTxt} ${username}. | Hello App`;
  greeting.innerText = `${greetingTxt}, ${username}.`;
  greeting.classList.remove(HIDDEN_CLASS_NAME);
  greeting.addEventListener("dblclick", handleRemoveName);
};
const handleRemoveName = () => {
  if (window.confirm("Reset this name?")) {
    document.title = `paintGreeting(). | Hello App`;
    localStorage.removeItem(USERNAME_KEY);
    greeting.classList.add(HIDDEN_CLASS_NAME);
    loginForm.classList.remove(HIDDEN_CLASS_NAME);
    loginInput.value = "";
    loginInput.focus();
  }
};

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASS_NAME);
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    loginForm.classList.add(HIDDEN_CLASS_NAME);
    switchToGreeting(username);
  });
} else {
  switchToGreeting(savedUsername);
}
