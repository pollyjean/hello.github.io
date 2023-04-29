"use strict";

const bgs = [{ file: "1.jpg" }, { file: "2.jpg" }, { file: "3.jpg" }, { file: "4.jpg" }, { file: "5.jpg" }];

const randomBg = bgs[Math.floor(Math.random() * bgs.length)];
const PATH = "img/";

document.body.setAttribute("style", `background-image:url(${PATH}${randomBg.file})`);
