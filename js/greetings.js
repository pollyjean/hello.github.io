"use strict";

const loginForm = document.querySelector("#login-form");
const greeting = document.querySelector("#greeting");
const loginInput = loginForm.querySelector("input");
const HIDDEN_CLASS_NAME = "hidden";
const USERNAME_KEY = "username";
const savedUsername = localStorage.getItem(USERNAME_KEY);

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

function switchToGreeting(username) {
  document.title = `Hello ${username}.`;
  greeting.innerText = `Hello ${username}.`;
  greeting.classList.remove(HIDDEN_CLASS_NAME);
  greeting.addEventListener("dblclick", handleRemoveName);
}

function handleRemoveName() {
  if (window.confirm("Reset this name?")) {
    document.title = `Hello.`;
    localStorage.removeItem(USERNAME_KEY);
    greeting.classList.add(HIDDEN_CLASS_NAME);
    loginForm.classList.remove(HIDDEN_CLASS_NAME);
    loginInput.value = "";
    loginInput.focus();
  }
}
