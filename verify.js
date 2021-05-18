class Verification {
  constructor() {
    this.answerField = document.getElementById("answer-field");
    this.guessedLetter = document.getElementById('guessed-letter');
    this.validLetters = /[a-z]/i;
  }
  replaceCorrectLetters(guessedLetter, correctWord, answerField) {
    answerField = answerField.split('');
    for (let i = 0; i < correctWord.length; i++) {
      const currentLetter = correctWord[i];
      if (currentLetter === guessedLetter) answerField[i] = guessedLetter;
    }
    this.answerField.textContent = answerField.join('');
  }

  isLetter(value) {
      return this.validLetters.test(value);
  }
}
