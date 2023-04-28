const timer = document.querySelector("#timer-form");
const timerBtn = timer.querySelector(".timer__btn");
const timerInput = timer.querySelector("#timer__input");
const timerLabel = timer.querySelector(".timer__label");
const timerBreak = timer.querySelector(".timer__break");
const TOTAL_TIME = parseInt(timerInput.getAttribute("max"));
const NOW_STATE = "now-time";

let focusTime = parseInt(timerInput.value);
let restTime = 0;
let breakTime = focusTime;
let timerState = false;
let breakState = false;
let focusTimeout;
let breakTimeout;

const calcMinuteToRound = (minutes) => {
  const num = parseFloat(minutes);
  return `${(num / TOTAL_TIME) * 360}deg`;
};
const paintCircle = (setTime, restTime, breakTime) => {
  const setDeg = calcMinuteToRound(parseInt(setTime));
  const restDeg = calcMinuteToRound(restTime);
  const breakDeg = calcMinuteToRound(breakTime);
  timerBtn.style.background = `conic-gradient(tomato 0deg, tomato ${restDeg}, orange ${restDeg}, orange ${setDeg}, white ${setDeg}, white ${breakDeg}, rgba(255,255,255, 0.7) ${breakDeg}, rgba(255,255,255, 0.7) 360deg`;
};
const clearTime = () => {
  restTime = 0;
  breakTime = focusTime;
  clearInterval(focusTimeout);
  clearInterval(breakTimeout);
  breakState = false;
};
const inactiveTimer = () => {
  clearTime();
  timerState = false;
  timerLabel.classList.remove(NOW_STATE);
  timerInput.classList.remove(NOW_STATE);
  timerBreak.classList.remove(NOW_STATE);
  timerBtn.classList.remove("active");
  timerBtn.innerText = "start";
  paintCircle(focusTime, restTime, breakTime);
  timerInput.removeAttribute("hidden");
  timerLabel.innerText = `min focus.`;
};
const activeTimer = () => {
  clearTime();
  timerState = true;
  timerLabel.classList.add(NOW_STATE);
  timerInput.classList.add(NOW_STATE);
  timerBreak.classList.remove(NOW_STATE);
  timerBtn.classList.add("active");
  timerBtn.innerText = "stop";
  timerInput.setAttribute("hidden", "hidden");
  timerLabel.innerText = `${focusTime} min focus.`;
  setTimer();
};
const breakTimer = () => {
  timerState = true;
  breakState = true;
  timerLabel.classList.remove(NOW_STATE);
  timerInput.classList.remove(NOW_STATE);
  timerBreak.classList.add(NOW_STATE);
  timerBtn.classList.add("active");
  timerBtn.innerText = "stop";
  setTimer();
};
const intervalFocus = () => {
  paintCircle(focusTime, restTime, breakTime);
  if (focusTime === restTime) {
    clearInterval(focusTimeout);
    confirm("Break time, continue?") ? breakTimer() : inactiveTimer();
  }
  restTime += 1;
};
const intervalBreak = () => {
  restTime = focusTime;
  paintCircle(focusTime, restTime, breakTime);
  if (breakTime === TOTAL_TIME) {
    breakTime = TOTAL_TIME;
    clearInterval(breakTimeout);
    confirm("Focus time, continue?") ? activeTimer() : inactiveTimer();
  }
  breakTime += 1;
};
const setTimer = () => {
  paintCircle(focusTime, restTime, breakTime);
  if (breakState) {
    intervalBreak();
    breakTimeout = setInterval(intervalBreak, 60000);
  } else {
    intervalFocus();
    focusTimeout = setInterval(intervalFocus, 60000);
  }
};
const paintBreakTime = (time) => {
  const brk = parseInt(time);
  timerBreak.innerText = `${TOTAL_TIME - brk} min break time.`;
};
const onChangeNumber = (e) => {
  e.preventDefault;
  const min = parseInt(timerInput.getAttribute("min"));
  const max = parseInt(timerInput.getAttribute("max"));
  if (timerInput.value === "" || (timerInput.value > 0 && timerInput.value <= max)) {
    focusTime = parseInt(timerInput.value) ? parseInt(timerInput.value) : 5;
  } else if (timerInput.value == 0) {
    focusTime = min;
    timerInput.value = min;
  } else {
    focusTime = 40;
    timerInput.value = 40;
  }
  restTime = 0;
  breakTime = focusTime;
  paintBreakTime(focusTime);
  paintCircle(focusTime, restTime, breakTime);
  timerState && setTimer();
};

// init
paintCircle(timerInput.value, restTime, breakTime);
paintBreakTime(timerInput.value);
timer.addEventListener("submit", (e) => {
  e.preventDefault();
  timerState ? inactiveTimer() : activeTimer();
});
timerInput.addEventListener("keyup", onChangeNumber);
timerInput.addEventListener("mouseup", onChangeNumber);
