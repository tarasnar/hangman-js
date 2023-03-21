const input = require('sync-input');  // Get input function
const cyrillicPattern = /^[\u0400-\u04FF]+$/;  // This is used to check for Cyrillic further in the code
// Definition of variables that are used throughout
let words = ['python', 'java', 'swift', 'javascript'];
let wins = 0;
let losses = 0;
function randomIndex() {  // Getting a random word from words[]
    let index = Math.floor(Math.random() * words.length);
    return words[index];
}
function containsUppercase(str) {  // Make sure input letter is not uppercase
    return /[A-Z]/.test(str);
}
function isLetter(str) {  // Make sure input letter is lowercase English letter;
    return /[a-z]/.test(str);
}
function menu() {  // Defining a menu function which helps user navigate - play, get scores or exit the game
    let answers = ['play', 'results', 'exit'];
    let menuInput = input("Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit: ");
    if (answers.includes(menuInput) == false) {
        menu();
    }
    if (menuInput == 'exit') {
        return 1;
    } else if (menuInput == 'play') {
        return hangMan();
    } else if (menuInput == 'results') {
        console.log(`You won: ${wins} times.`);
        console.log(`You lost: ${losses} times.`);
        return menu();
    }
}
console.log("H A N G M A N");
function hangMan() { // Defining the game itself
    // Storing all the information needed for the game in variables
    let word = randomIndex();
    let hiddenArr = new Array(word.length);
    hiddenArr.fill("-");
    let guessedArr = new Array(20);
    let attempts = 8;
    // Getting input from the user as long as he has attempts left
    for (let x = 0; x != attempts;) {
        // Ending the game if user guessed the word
        if (JSON.stringify(hiddenArr) == JSON.stringify(Array.from(word))) {
            wins++;
            console.log(`You guessed the word ${word}!`);
            console.log('You survived!');
            break;
        }
        // Show masked word and prompt user for input
        console.log();
        console.log(hiddenArr.join(''));
        let letter = input("Input a letter: ");
        // Error-handling with functions pre-defined above
        if (letter.length < 1 || letter.length > 1) {
            console.log('Please, input a single letter.');
        } else if (containsUppercase(letter) == true || isLetter(letter) == false) {
            console.log('Please, enter a lowercase letter from the English alphabet.');
        } else if (hiddenArr.includes(letter) || guessedArr.includes(letter)) {
            console.log('You\'ve already guessed this letter.');
        // Checking if letter provided is in the word, then pushing it to hiddenArr with uncovering
        } else if (word.includes(letter) == true && hiddenArr.includes(letter) == false) {
            for (let y = 0; y < word.length; y++) {
                if (letter === word[y]) {
                    hiddenArr[y] = letter;
                    guessedArr.push(letter);
                }
            }
        // If letter is not in the word, decrementing attempts
        } else if (word.includes(letter) == false) {
            attempts--;
            guessedArr.push(letter);
            console.log('That letter doesn\'t appear in the word.');
        }
    }
    // If there is no attempts left and user did not win, print losing message
    if (attempts == 0 && JSON.stringify(hiddenArr) != JSON.stringify(Array.from(word))) {
        losses++;
        console.log();
        console.log('You lost!');
    }
    menu(); // Call menu function to receive further instructions from the user
}
menu();