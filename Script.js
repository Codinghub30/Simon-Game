const colors = ["red", "green", "yellow", "blue"];
let gamePattern = [];
let userPattern = [];
let level = 0;

const startButton = document.getElementById("start-button");
const gameBoard = document.getElementById("game-board");

function playSound(color) {
  const audio = new Audio(`sounds/${color}.mp3`);
  audio.play();
}

function flash(color) {
  const element = document.getElementById(color);
  element.classList.add("active");
  setTimeout(() => element.classList.remove("active"), 300);
}

function nextSequence() {
  level++;
  userPattern = [];
  document.querySelector("h1").textContent = `Level ${level}`;
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  gamePattern.push(randomColor);
  flash(randomColor);
  playSound(randomColor);
}

function checkAnswer(currentLevel) {
  if (userPattern[currentLevel] !== gamePattern[currentLevel]) {
    document.querySelector("h1").textContent = "Game Over! Press Start to Retry.";
    gamePattern = [];
    level = 0;
    return;
  }

  if (userPattern.length === gamePattern.length) {
    setTimeout(nextSequence, 1000);
  }
}

startButton.addEventListener("click", () => {
  document.querySelector("h1").textContent = "Level 1";
  gamePattern = [];
  userPattern = [];
  level = 0;
  nextSequence();
});

gameBoard.addEventListener("click", (event) => {
  const clickedColor = event.target.id;
  if (colors.includes(clickedColor)) {
    userPattern.push(clickedColor);
    flash(clickedColor);
    playSound(clickedColor);
    checkAnswer(userPattern.length - 1);
  }
});
