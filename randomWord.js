class RandomWord {
    async getRandomWord() {
        const data = await fetch(
            "https://random-word-api.herokuapp.com/word?number=1"
          );
          const response = await data.json();
          return response;
    }
}