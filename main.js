// Definition of global variables
const words = ['python', 'java', 'swift', 'javascript'];
const bodyContainer = document.querySelector('body');
const resultsContainer = document.createElement('div');
const gameContainer = document.createElement('div');
const menuButtons = document.querySelectorAll('.menu-buttons');
let wins = 0;
let losses = 0;
resultsContainer.classList.add('container-style');
gameContainer.classList.add('container-style');

// Menu function to navigate the game
function menu() {
        let textElement = document.createElement('p');
        menuButtons.forEach(button => button.addEventListener('click', () => {
            if (button.innerText === 'play') {
                gameContainer.replaceChildren();
                return hangman();
            } else if (button.innerText === 'results') {
                if (resultsContainer.innerHTML === '') {
                    textElement.innerText = `Won: ${wins} times\nLost: ${losses} times`;
                    resultsContainer.append(textElement);
                    bodyContainer.appendChild(resultsContainer);
                } else {
                    resultsContainer.replaceChildren();
                }
            } else if (button.innerText === 'exit') {
                resultsContainer.replaceChildren();
                gameContainer.replaceChildren();
            }
        }));
}
menu();

// Function for game logic
function hangman() {
    // Creating local variables which will be used in game
    let word = randomWord();
    let hiddenLetters = new Array(word.length).fill('-');
    let guessedLetters = [];
    let textElement = document.createElement('p');
    let attempts = 8;
    // Getting prompt from the user as long as he has attempts left
    // And checking for the letter prompted in the arrays
    for (let x = 0; x !== attempts;) {
        // Ending the game if word guessed
        if (String(hiddenLetters) === String(Array.from(word))) {
            wins++;
            textElement.innerText = `You guessed the word ${word}!\n You survived!`;
            gameContainer.append(textElement);
            bodyContainer.appendChild(gameContainer);
            break;
        }
        let letter = prompt("Prompt a letter: ");
        // Error handling
        if (letter.length < 1 || letter.length > 1) {
            alert("Please, prompt a single letter!");
        } else if (isUppercase(letter) === true || isLowercaseEnglish(letter) === false) {
            alert("Please, enter a lowercase letter from the English alphabet!");
        }
        // Checking if letter provided is in the word, then showing it
        if (word.includes(letter) === true && hiddenLetters.includes(letter) === false) {
            for (let y = 0; y < word.length; y++) {
                if (letter === word[y]) {
                    hiddenLetters[y] = letter;
                    guessedLetters.push(letter);
                    textElement.innerText = `${hiddenLetters.join('')}`;
                    gameContainer.append(textElement);
                    bodyContainer.appendChild(gameContainer);
                }
            }
        // If letter is not in the word, decrement attempts
        } else if (word.includes(letter) === false) {
            attempts--;
            guessedLetters.push(letter);
            alert("That letter doesn't appear in the word.");
        } else if (hiddenLetters.includes(letter) || guessedLetters.includes(letter)) {
            alert("You've already guessed this letter.");
        }
    }
    // End game
    if (attempts === 0 && String(hiddenLetters) !== word) {
        losses++;
        textElement.innerText = 'You lost!';
        gameContainer.append(textElement);
        bodyContainer.appendChild(gameContainer);
    }
}

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