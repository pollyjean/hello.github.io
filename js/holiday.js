const clockTitle = document.querySelector(".js-clock");
function getClock() {
  const xmas = new Date(`${new Date().getFullYear()}/12/25 00:00:00`);
  const now = new Date();
  const dday = new Date(xmas - now);
  const days = Math.floor(dday / (24 * 60 * 60 * 1000));
  const hours = Math.floor((dday / (60 * 60 * 1000)) % 24);
  const minutes = Math.floor((dday / (60 * 1000)) % 60);
  // const seconds = Math.floor((dday / 1000) % 60);
  clockTitle.innerText = `X-Mas 까지 ${days}일 ${hours}시간 ${minutes}분`;
}
getClock();
setInterval(getClock, 1000);
