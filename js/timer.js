"use strict";

// 이름 : KMN 타이머 (40분 집중 20분 휴식) 타이머
// 목표 : 1시간을 나눠서 집중하는 시간과 휴식하는 시간을 보여주고 알림
// 기능 : 1. 집중하는 시간을 5분 단위로 해서 설정할 수 있음
//        2. 집중하는 시간(focus time), 휴식하는 시간(break time)을 명시적으로 표시
//        3. 남은 시간은 버튼에 배경 원형 그래프로 시각적으로 표시
//        4. 언제든지 버튼으로 멈출 수 있음
//        5. 시간이 다 되면 브라우저의 알림(confirm)으로 계속할지 물어봄
//        6. 타이머가 시작하면 집중하는 시간은 수정할 수 없다
//        7. 10번 이상 반복시 그만하라고 한다

const timerForm = document.querySelector("#timer-form");
const timerButton = timerForm.querySelector(".timer__btn");
const timerInput = timerForm.querySelector("#timer__input");
const timerLabel = timerForm.querySelector(".timer__label");
const timerBreak = timerForm.querySelector(".timer__break");
const TOTAL_TIME = parseInt(timerInput.getAttribute("max"));
const NOW_STATE = "now-time";

// variables : 시간에 관한 기본 변수들 설정
let focusTime = parseInt(timerInput.value); // string으로 가져오기 때문에 number로
let restTime = 0;
let breakTime = focusTime;
let timerState = false;
let breakState = false;
let focusTimeout;
let breakTimeout;
let countCycle = 0;

// func : 총시간에 대한 포커스 타임에 대한 비율을 만들고 그걸 원(360deg)를 곱해서 값으로 쓸 수 있도록
const calcMinuteToRound = (minutes) => {
  const num = parseFloat(minutes);
  return `${(num / TOTAL_TIME) * 360}deg`;
};

// func : focus, rest(focus 중 지나간 시간), break(중 지나간 시간)을 버튼 bg에 그려줌
const paintCircle = (focusTime, restTime, breakTime) => {
  const focusDeg = calcMinuteToRound(parseInt(focusTime));
  const restDeg = calcMinuteToRound(restTime);
  const breakDeg = calcMinuteToRound(breakTime);
  timerButton.style.background = `conic-gradient(tomato 0deg, tomato ${restDeg}, #FF9886 ${restDeg}, #FF9886 ${focusDeg}, white ${focusDeg}, white ${breakDeg}, rgba(255,255,255, 0.7) ${breakDeg}, rgba(255,255,255, 0.7) 360deg`;
};
// func : 시간 설정 변수(let 값들) 리셋, interval clear 함 타이머 시작 전에 리셋해야할 거 모아둠
const resetTime = () => {
  restTime = 0;
  breakTime = focusTime;
  clearInterval(focusTimeout);
  clearInterval(breakTimeout);
  breakState = false;
};
// func : 정지(stop) 했을때 세팅 및 화면에 보이는 거 정리
const inactiveTimer = () => {
  resetTime();
  timerState = false;
  timerLabel.classList.remove(NOW_STATE);
  timerInput.classList.remove(NOW_STATE);
  timerBreak.classList.remove(NOW_STATE);
  timerButton.classList.remove("active");
  timerButton.innerText = "start";
  paintCircle(focusTime, restTime, breakTime);
  timerInput.removeAttribute("hidden");
  timerLabel.innerText = `min focus.`;
};
// event func : 포커스 타이머 시작을 화면에 표시해주고 타이머 시작 setTimer() 호출, input은 가리고 label에 시간 표시
const focusTimer = () => {
  resetTime();
  timerState = true;
  timerLabel.classList.add(NOW_STATE);
  timerInput.classList.add(NOW_STATE);
  timerBreak.classList.remove(NOW_STATE);
  timerButton.classList.add("active");
  timerButton.innerText = "stop";
  timerInput.setAttribute("hidden", "hidden");
  timerLabel.innerText = `${focusTime} min focus.`;
  breakTime = focusTime;
  setTimer();
};
// event func : 브레이크 타이머 시작을 화면에 표시해주고 타이머 시작 setTimer() 호출
const breakTimer = () => {
  timerState = true;
  breakState = true;
  timerLabel.classList.remove(NOW_STATE);
  timerInput.classList.remove(NOW_STATE);
  timerBreak.classList.add(NOW_STATE);
  timerButton.classList.add("active");
  timerButton.innerText = "stop";
  setTimer();
};
// interval func : 포커스 타이머가 돌아갈때 1분씩 더하면서 화면을 그려줌, 다되면 focus === rest 정지하고 물어보는 알림창 confirm 띄움
const intervalFocus = () => {
  paintCircle(focusTime, restTime, breakTime);
  if (focusTime === restTime) {
    clearInterval(focusTimeout);
    paintCircle(focusTime, restTime, breakTime);
    confirm("Break time, continue?") ? breakTimer() : inactiveTimer();
  }
  restTime += 1;
};

// interval func : 브레이크 타임 타이머가 돌아갈때 1분씩 더하면서 화면을 그려줌, 다되면 break === rest 정지하고 물어보는 알림창 confirm 띄움
const intervalBreak = () => {
  restTime = focusTime;
  paintCircle(focusTime, restTime, breakTime);
  if (breakTime === TOTAL_TIME) {
    breakTime = TOTAL_TIME;
    clearInterval(breakTimeout);
    paintCircle(focusTime, restTime, breakTime);
    countCycle += 1;
    if (countCycle < 10) {
      confirm(`Focus time, continue? (${countCycle + 1}KMN)`) ? focusTimer() : inactiveTimer();
    } else {
      alert(`You've done enough for today.`);
      inactiveTimer();
    }
  }
  breakTime += 1;
};

// func : focus / break 를 구분하여 타이머를 돌리기 시작한다
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

// func : focus 를 설정할 때 break 시간을 결정함
const paintBreakTime = (time) => {
  const brk = parseInt(time);
  timerBreak.innerText = `${TOTAL_TIME - brk} min break time.`;
};

// event func : input type=number 로 되어있는 focus 시간 설정을 컨트롤 한다 변수 값은 input의 속성에서 가져온다. 숫자를 수정하면 버튼의 그래프 배경도 변경한다
const onChangeNumber = (e) => {
  e.preventDefault();
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

// init : 초기화 실행
paintCircle(timerInput.value, restTime, breakTime);
paintBreakTime(timerInput.value);
// event : 타이머 상태에 따라 멈출지 focus 할지 결정해서 호출
timerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  timerState ? inactiveTimer() : focusTimer();
});
// event : input 안에서 키보드나 마우스 클릭이 있으면 바로 반영
timerInput.addEventListener("keyup", onChangeNumber);
timerInput.addEventListener("change", onChangeNumber);
