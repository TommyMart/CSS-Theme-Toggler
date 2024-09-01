
// Target score the game
let targetScore = 100;

// Players current score
let currentScore = 0;

// Number of rolls
let rollCount = 0;

// Game not started until clicked
let gamestarted = false;

// Function to update score 
function updateScore(rollValue) {
    // Add dice result to current score
    currentScore += rollValue;
    // Add one to roll count
    rollCount++;

    // Update UI with current score and roll count
    document.getElementById("scoreDisplay").innerText = `Score: ${currentScore}`;
    document.getElementById("rollCountDisplay").innerText = `Rolls: ${rollCount}`;

    // Check if player has reached or exceeded 100
    if (currentScore >= targetScore) {
        alert(`Congratulations! You reached ${currentScore} in ${rollCount} rolls.`);
        resetGame();
    }
}

// Function to reset game
function resetGame() {
    // Reset score
    currentScore = 0;
    // Reset roll count
    rollCount = 0;

    // Reset game state after playing
    gamestarted = false;

    // Update UI with reset values
    document.getElementById("scoreDisplay").innerText = `Score: ${currentScore}`;
    document.getElementById("rollCountDisplay").innerText = `Rolls: ${rollCount}`;

    // Clear the table
    resetTable();
}

// Function to handle dice rolls
function handleDiceRoll() {
    // Roll dice by calling function
    const rollValue = rollDice(); 

    // If game started, update score
    if (gamestarted) {
        updateScore(rollValue);
    } 
}

// Function to start the game
function startGame() {
    // Reset the score 
    resetGame();
    // Start the game
    gamestarted = true;
    // Notify user the game has started
    alert("Game started! Click or drag dice to table to play.");

}

// Event listener for reset button, called reset game when clicked
document.getElementById("resetGameButton").addEventListener("click", resetGame);
// Event listener for dice image click, called handle dice roll
document.getElementById("diceImage").addEventListener("click", handleDiceRoll);
// Event listener for start game, calls start game function when clicked
document.getElementById("startGameButton").addEventListener("click", startGame);

window.onload = function() {
    // Set new game on reload
    resetGame();
    setDefaultDiceSize();
}
