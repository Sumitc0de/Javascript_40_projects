
// Initialize game variables
let score = 0;
let chances = 10;
const initialChances = 10; // Keep track of initial chances
let currentNumber = generateRandomNumber();

// HTML elements
const inputBox = document.querySelector(".inputbox");
const scoreValue = document.querySelector(".score");
const chanceValue = document.querySelector(".chance");
const displayText = document.getElementById("reqtext");
const GuessBtn = document.getElementById("guessbtn");
const RetryBtn = document.getElementById("retrybtn");

// Function to generate a random number between 1 and 100
function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Function to reset the game for a new round
function resetForNewRound() {
    currentNumber = generateRandomNumber();
    inputBox.value = "";
    updateDisplay();
   displayText.innerHTML = "<span>Congratulations!</span> You guessed the correct number! A new number will be chosen.";
}

// Function to update score and chances display
function updateDisplay() {
    scoreValue.textContent = score;
    chanceValue.textContent = chances;
}

// Function to handle the player's guess
function playerGuessNum() {
    if (chances <= 0) {
        displayText.innerHTML = "<span>Game Over!</span> No more chances left. Press 'Retry' to play again.";
        return;
    }

    const playerGuess = parseInt(inputBox.value, 10);
    if (isNaN(playerGuess)) {
        alert("Please enter a valid number.");
        return;
    }

    if (playerGuess === currentNumber) {
        score += (chances * 10); // Increase score based on remaining chances
        resetForNewRound(); // Start a new round
    } else if (playerGuess > currentNumber) {
        chances--;
        displayText.innerHTML = "The number is smaller than " + playerGuess + ".";
    } else {
        chances--;
        displayText.innerHTML = "The number is greater than " + playerGuess + ".";
    }

    inputBox.value = "";
    updateDisplay();

    if (chances === 0) {
        displayText.innerHTML = "<span>Game Over!</span> <br> No more chances left. Press 'Retry' to play again.";
    }
}

// Function to reset the game after all chances are used
function retryGame() {
    score = 0;
    chances = initialChances;
    currentNumber = generateRandomNumber(); // Ensure a new number is chosen on retry
    resetForNewRound();
    displayText.innerHTML = "Game reset. Start guessing!";
}

// Event listeners
GuessBtn.addEventListener("click", playerGuessNum);
RetryBtn.addEventListener("click", retryGame);

// Initial setup
updateDisplay();
