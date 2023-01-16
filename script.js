"use strict";

///////////////////////////////INITIALIZATION///////////////////////////////

const scoreElement = document.querySelector(".score");
const body = document.querySelector("body");
const secretNumberElement = document.querySelector(".number");
const guessElement = document.querySelector(".guess");
const messageElement = document.querySelector(".message");

let secretNumber;
let scoreNumber;
let correctlyGuessed;
let highScoreNumber = 0;

//Restarts the game without changing the highscore
const initGame = function () {
	correctlyGuessed = false;
	scoreNumber = 20;
	secretNumber = Math.trunc(Math.random() * 20) + 1;
	showRegularUI();
};

///////////////////////////////UI UPDATES///////////////////////////////
function updateUI(color, width, secretNumberContent) {
	body.style.backgroundColor = color;
	secretNumberElement.style.width = width;
	secretNumberElement.textContent = secretNumberContent;
}
function showWinningUI() {
	updateUI("#00D100", "30rem", secretNumber);
}
function showLosingUI() {
	updateUI("red", "30rem", secretNumber);
}
function showRegularUI() {
	guessElement.value = "";
	scoreElement.textContent = scoreNumber;
	messageElement.textContent = "Start guessing...";
	updateUI("#222", "15rem", "?");
}

///////////////////////////////INPUT Processing///////////////////////////////
const wonTheGame = function () {
	correctlyGuessed = true;
	messageElement.textContent = "Correct Number! 🎉🎉";
	if (scoreNumber > highScoreNumber) {
		highScoreNumber = scoreNumber;
		document.querySelector(".highscore").textContent = highScoreNumber;
	}
	showWinningUI();
};
const lostTheGame = function () {
	messageElement.textContent = "You Lost!! 💥";
	showLosingUI();
};

const checkInputNum = function () {
	//if the user tries to input another number after already guessing the correct number
	if (correctlyGuessed) return;

	//if the user has already lost the game and tries checking another number
	if (scoreNumber === 0) return;

	const guess = Number(guessElement.value);

	//No Number Entered
	if (!guess) messageElement.textContent = "No Number! ⛔";
	//High Number
	else if (guess > secretNumber) messageElement.textContent = "Too High 📈";
	//Low Number
	else if (guess < secretNumber) messageElement.textContent = "Too Low 📉";
	//Correct Number wins the game
	else if (guess === secretNumber) {
		wonTheGame();
		return;
	}
	scoreNumber--;
	scoreElement.textContent = scoreNumber;

	//Player's score reached 0 -> player lost
	if (scoreNumber === 0) lostTheGame();
};

initGame();

//To restart anouther round
document.querySelector(".again").addEventListener("click", initGame);

document.querySelector(".check").addEventListener("click", checkInputNum);

//If the user hits the enter key, perform the same task as clicking on the check button on UI
window.addEventListener("keydown", function (e) {
	if (e.key === "Enter") checkInputNum();
});
