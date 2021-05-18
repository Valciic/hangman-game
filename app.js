const guessedLetter = document.getElementById("guessed-letter");
const answerField = document.getElementById("answer-field");
const message = document.getElementById("message");
const btn = document.getElementById("game-btn");
const guessesDisplay = document.getElementById("guesses-left");

const ONLY_LETTERS = "Words contain only letters";
const NO_SUCH_LETTER = "There is no such letter in this word!";
const YOU_LOST = "You did not guess such a easy word...";
const YOU_WON = "You guessed the word! Aren't you amazing?!";

const randomWord = new RandomWord();
const verification = new Verification();
const msg = new MessageToUser();

let correctWord;
let shownAnswer;
let guessesLeft = 5;

document.addEventListener("DOMContentLoaded", () => {
  displayHiddenWord();
  msg.showGuessesLeft(guessesLeft);
});
btn.addEventListener("click", (e) => {
  if (e.target.classList.contains("play-again")) {
    resetGame();
  } else {
    checkLetter(guessedLetter.value);
  }
});
guessedLetter.addEventListener("input", () => {
  checkLetter(guessedLetter.value);
  setTimeout(() => {
    guessedLetter.value = "";
  }, 500);
});

function displayHiddenWord() {
  randomWord.getRandomWord().then((results) => {
    answerField.textContent = results[0].replace(/\D/g, "*");
    shownAnswer = answerField.textContent.split("");
    correctWord = results[0].split("");
  })
}

function checkLetter(letter) {
  if (verification.isLetter(letter)) {
    const visibleAnswer = answerField.textContent;
    if (correctWord.includes(letter) && !visibleAnswer.includes(letter))
      verification.replaceCorrectLetters(letter, correctWord, visibleAnswer);
    else {
      msg.showMessage(NO_SUCH_LETTER);
      msg.showGuessesLeft(--guessesLeft);
    }
    isGameFinished(guessesLeft, visibleAnswer);
  } else {
    msg.showMessage(ONLY_LETTERS);
  }
}

function resetGame() {
  btn.classList.remove("play-again");
  btn.innerText = "Guess!";
  guessedLetter.disabled = false;
  guessedLetter.focus();
  displayHiddenWord();
  guessesLeft = 5;
  msg.showGuessesLeft(guessesLeft);
  msg.showMessage("");
}

function isGameFinished(guessCount, visibleAnswer) {
  if (guessCount === 0 && visibleAnswer.includes("*")) {
    gameOver(false);
    answerField.textContent = correctWord.join("");
    btn.innerText = "Play again?";
    btn.classList.add("play-again");
  }
  if (!visibleAnswer.includes("*")) {
    gameOver(true);
    btn.innerText = "Play again?";
    btn.classList.add("play-again");
  }
}
function gameOver(won) {
  if (won === false) msg.showMessage(YOU_LOST);
  else msg.showMessage(YOU_WON);
  guessedLetter.disabled = true;
}
