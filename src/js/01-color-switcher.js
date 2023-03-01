const startButton = document.querySelector("[data-start]");
const stopButton = document.querySelector("[data-stop]");
const body = document.querySelector("body");

startButton.addEventListener("click", onStartBtnClick);
stopButton.addEventListener("click", onStopBtnClick);

// змінна яка зупиняє таймер що змінює колір фону
let changeColorInt = null;
// змінна яка затримує зміну кольору
let colorDelay = 1000;

function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function onStartBtnClick() {
  startButton.disabled = true;
  changeColorInt = setInterval(() => {
    changeBackgroundColor();
  }, colorDelay);
}

function onStopBtnClick() {
  startButton.disabled = false;
  clearInterval(changeColorInt);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
