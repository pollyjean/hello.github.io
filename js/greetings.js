"use strict";

const loginForm = document.querySelector("#login-form");
const greeting = document.querySelector("#greeting");
const loginInput = loginForm.querySelector("input");
const HIDDEN_CLASS_NAME = "hidden";
const USERNAME_KEY = "username";
const savedUsername = localStorage.getItem(USERNAME_KEY);
const paintGreeting = () => {
  const hours = parseInt(new Date().getHours());
  let greetingTxt = "";
  if (hours < 12) {
    greetingTxt = "Good morning";
  } else if (hours >= 12 && hours < 17) {
    greetingTxt = "Good afternoon";
  } else if (hours >= 17) {
    greetingTxt = "Good evening";
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
    document.title = `${paintGreeting()}. | Hello App`;
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
