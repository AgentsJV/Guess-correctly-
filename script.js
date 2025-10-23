// ========== GAME VARIABLES ========== //
let score = 0;
let highScore = 0;
let randomNumber;
let maxGuesses = 5;
let guessesLeft = 5;
let currentDifficulty = 2; // 1 = Easy, 2 = Medium, 3 = Hard
let volume = 1;
let muted = false;

// Sound effects
const winSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3");
const loseSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-losing-marbles-2016.mp3");

winSound.volume = volume;
loseSound.volume = volume;

// ========== DOM ELEMENTS ========== //
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");
const leaderboardList = document.getElementById("leaderboardList");

// Settings
const settingsPopup = document.getElementById("settingsPopup");
const openSettings = document.getElementById("openSettings");
const closeSettings = document.getElementById("closeSettings");
const difficultySlider = document.getElementById("difficultySlider");
const volUp = document.getElementById("volUp");
const volDown = document.getElementById("volDown");
const muteBtn = document.getElementById("muteBtn");

// ========== INITIALIZE GAME ========== //
function startGame() {
    guessesLeft = maxGuesses;
    randomNumber = Math.floor(Math.random() * 10) + 1;
    message.textContent = "Guess a number between 1 and 10!";
    guessInput.value = "";
}

startGame();

// ========== GUESS FUNCTION ========== //
guessBtn.addEventListener("click", () => {
    const userGuess = Number(guessInput.value);
    if (!userGuess) return;

    if (userGuess === randomNumber) {
        score++;
        message.textContent = "🎉 Correct!";
        winSound.play();
    } else {
        guessesLeft--;
        message.textContent = `❌ Wrong! Guesses left: ${guessesLeft}`;
        loseSound.play();
    }

    scoreDisplay.textContent = score;

    if (guessesLeft <= 0 || userGuess === randomNumber) {
        if (score > highScore) {
            highScore = score;
            highScoreDisplay.textContent = highScore;
        }
        startGame();
    }
});

// ========== RESTART ========== //
restartBtn.addEventListener("click", () => {
    score = 0;
    scoreDisplay.textContent = 0;
    startGame();
});

// ========== SETTINGS POPUP ========== //
openSettings.addEventListener("click", () => {
    settingsPopup.style.display = "flex";
    setTimeout(() => settingsPopup.classList.add("show"), 10);
});

closeSettings.addEventListener("click", () => {
    settingsPopup.classList.remove("show");
    setTimeout(() => settingsPopup.style.display = "none", 300);
});

// ========== DIFFICULTY SLIDER ========== //
difficultySlider.addEventListener("input", () => {
    currentDifficulty = difficultySlider.value;
    let label = document.querySelector(".difficulty-label");

    if (currentDifficulty == 1) {
        maxGuesses = 7;
        label.textContent = "Easy";
    } else if (currentDifficulty == 2) {
        maxGuesses = 5;
        label.textContent = "Medium";
    } else {
        maxGuesses = 3;
        label.textContent = "Hard";
    }
    startGame();
});

// ========== SOUND CONTROLS ========== //
volUp.addEventListener("click", () => {
    if (volume < 1) volume += 0.1;
    winSound.volume = volume;
    loseSound.volume = volume;
});

volDown.addEventListener("click", () => {
    if (volume > 0) volume -= 0.1;
    winSound.volume = volume;
    loseSound.volume = volume;
});

muteBtn.addEventListener("click", () => {
    muted = !muted;
    winSound.muted = muted;
    loseSound.muted = muted;
});
