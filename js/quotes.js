"use strict";

const quotes = [
  {
    quote: "Weniger, Aber Besser. (Less but better.)",
    author: "Dieter Rams",
    citation: "Rams, Dieter (2014). Weniger, aber besser = Less, but better (5. Auflage ed.). Berlin. ISBN 978-3-89955-525-7. OCLC 876007102",
  },
  {
    quote: "Stay Hungry. Stay Foolish.",
    author: "Steve Jobs",
    citation: "Steve Jobs: Stanford commencement address, June 2005",
  },
  {
    quote: "신독(愼獨) : (군자는 반드시) 홀로 있을 때에도 삼가는 것.",
    author: "공자(孔子)",
    citation: "중용, 자사(子思: B.C.483~402)",
  },
  {
    quote: "물령망동 정중여산(勿令妄動 靜重如山) : 함부로 가벼이 움직이지 마라. 태산같이 신중하게 행동하라.",
    author: "이순신",
    citation: "난중일기, 1592년 5월 7일 옥포해전 당시",
  },
  {
    quote: "무슨 생각을 해... 그냥 하는 거지.",
    author: "김연아",
    citation: "[MBC 특집] 퀸연아! 나는 대한민국이다. 2009년 5월 17일 방송분",
  },
  {
    quote: "영감님의 영광의 시대는 언제였죠...? 국가대표였을 때였나요? 난 지금입니다!!",
    author: "슬램덩크(이노우에 다케히코(井上雄彦)) - 강백호의 대사 중에서",
    citation: "슬램덩크(만화, 소년점프 등 1990년 ~ 1996년 연재)",
  },
  {
    quote: "We’re made of star stuff. We are a way for the cosmos to know itself.",
    author: "Carl Sagan",
    citation: "Cosmos: A Personal Voyage, 1980(PBS Documentary)",
  },
  {
    quote: "Endure And Survive.",
    author: "The Last of us - Joel의 대사 중에서",
    citation: "The Last of us(PlayStation 게임, Naughty Dog, Sony Interactive Entertainment)",
  },
  {
    quote: "이 길이 내 길인 줄 아는 게 아니라 / 그냥 길이 그냥 거기 있으니까 가는 거야 / 원래부터 내 길이 있는 게 아니라 / 가다보면 어찌어찌 내 길이 되는 거야.",
    author: "장기하와 얼굴들 - 그건 니 생각이고",
    citation: "장기하와 얼굴들 mono 앨범(2018) 중 에서",
  },
  {
    quote: "Don't forget to eat 김취, Saranghaeyo",
    author: "Nicolas Serrano Arevalo ",
    citation: "노마드 코더 Nomad Coders, YouTube 채널 끝인사말",
  },
];

const quote = document.querySelector("#quote");
const quoteText = quote.querySelector(".quote__text");
const author = quote.querySelector(".quote__author");
const quoteBlock = quote.querySelector(".quote__block");
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

quoteText.innerText = randomQuote.quote;
author.innerText = randomQuote.author;
quoteBlock.setAttribute("cite", randomQuote.citation);

quote.addEventListener("click", () => {
  const citeElement = document.querySelector(".quote__cite");
  if (citeElement) {
    citeElement.remove();
  } else {
    const cite = document.createElement("p");
    cite.classList.add("quote__cite");
    cite.innerText = `출처 : ${quoteBlock.getAttribute("cite")}`;
    quote.appendChild(cite);
  }
});
