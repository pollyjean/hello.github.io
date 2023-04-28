const bgs = [{ file: "1.jpg" }, { file: "2.jpg" }, { file: "3.jpg" }, { file: "4.jpg" }, { file: "5.jpg" }];

const bdElem = document.body;
const randomBg = bgs[Math.floor(Math.random() * bgs.length)];
const PATH = "img/";

bdElem.setAttribute("style", `background-image:url(${PATH}${randomBg.file})`);

// const imgElem = document.createElement("img");
// imgElem.src = `${PATH}${randomBg.file}`;
// bdElem.appendChild(imgElem);
