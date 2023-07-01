// Definition of global variables
let words = ['python', 'java', 'swift', 'javascript'];
let wins = 0;
let losses = 0;

// Getting a random word
function randomWord() {
    let index = Math.floor(Math.random() * words.length);
    return words[index];
}

// Make sure letter is not upper case
function isUppercase(str) {
    return /[A-Z]/.test(str);
}

// Make sure letter is lowercase english letter
function isLowercaseEnglish(str) {  // Make sure prompt letter is lowercase English letter;
    return /[a-z]/.test(str);
}

// Menu function to navigate the game
function menu() {
    let menuPrompt = prompt("Type 'play' to play the game, 'results' to show the scoreboard, and 'exit' to quit: ");
    switch(menuPrompt) {
        case "play":
            return hangman();
        case "results":
            console.log(`You won: ${wins} times.`);
            console.log(`You lost: ${losses} times.`);
            return menu();
        case "exit":
            return 1;

        default:
            return menu();
    }
}

console.log("H A N G M A N");
// Function for game logic
function hangman() {
    // Creating local variables which will be used in game
    let word = randomWord();
    let hiddenLetters = new Array(word.length);
    hiddenLetters.fill("-");
    let guessedLetters = [];
    let attempts = 8;
    // Getting prompt from the user as long as he has attempts left
    for (let x = 0; x !== attempts;) {
        // Ending the game if word guessed
        if (JSON.stringify(hiddenLetters) === JSON.stringify(Array.from(word))) {
            wins++;
            console.log(`You guessed the word ${word}!\n You survived!`);
            break;
        }
        // Show masked word and prompt user
        console.log();
        console.log(hiddenLetters.join(''));
        let letter = prompt("Prompt a letter: ");
        // Error handling
        if (letter.length < 1 || letter.length > 1) {
            console.log("Please, prompt a single letter!");
        } else if (isUppercase(letter) === true || isLowercaseEnglish(letter) === false) {
            console.log("Please, enter a lowercase letter from the English alphabet!");
        } else /*if (hiddenLetters.includes(letter) || guessedLetters.includes(letter))*/ {
            console.log("You've already guessed this letter.");
        }
        // Checking if letter provided is in the word, then showing it
        if (word.includes(letter) === true && hiddenLetters.includes(letter) === false) {
            for (let y = 0; y < word.length; y++) {
                if (letter === word[y]) {
                    hiddenLetters[y] = letter;
                    guessedLetters.push(letter);
                }
            }
        // If letter is not in the word, decrement attempts
        } else /*if (word.includes(letter) === false)*/ {
            attempts--;
            guessedLetters.push(letter);
            console.log("That letter doesn't appear in the word.");
        }
    }
    // End game
    if (attempts === 0 && JSON.stringify(hiddenLetters) !== JSON.stringify(Array.from(word))) {
        losses++;
        console.log();
        console.log('You lost!');
    }
    // Call menu function to receive further instructions from the user
    menu();
}
menu();