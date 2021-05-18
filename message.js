class MessageToUser {
    constructor() {
        this.messageField = document.getElementById("message");
        this.guessesDisplay = document.getElementById('guesses-left');
    }

    showMessage(text) {
        this.messageField.textContent = text;
    }
    showGuessesLeft(guesses) {
        this.guessesDisplay.textContent = guesses;
    }
}