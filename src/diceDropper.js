
// Default dice size
let diceSize = 20;

// Some browsers do not allow dropping an element by default
// so this needs to be overridden
function allowDrop(event){
	event.preventDefault();
}

// Starts when the dice is dragged
function drag(event) {
	// Gets the id of the element being dragged 
    const elementId = event.currentTarget.id;
	// Logs the id of the dragged element for debugging purposes
    console.log('Dragging element with id:', elementId);  
	// Stores the id of the dragged element in the drag and drop
	// data transfer object
    event.dataTransfer.setData("text", elementId);
}

// This function is called when the dragged element is dropped
// to the desired designated area
function drop(event){
	// Ensures drop is allowed in browser
	event.preventDefault();
	// Target of the drop event is the element below whatever
	// our mouse is over when we stop the drag
	// Retrieves the id of the dragged element from data transfer
	// object
	let data = event.dataTransfer.getData("text");
	// Logs id for debugging purposes
	console.log("On drop, reading data of: " + data);
	// Clones a copy of the original dice image
	let diceCopy = document.getElementById("diceImage").cloneNode(true);
	// Finds the p element inside the cloned diceCopy where the roll
	// dice result will be displayed
	let diceCopyText = diceCopy.querySelector("p");
	// Rolls the dice
	let rollValue = rollDice();
	// Sets text inside cloned dice to equal return of the rollDice
	// function, random number between 1 and 20
	diceCopyText.innerText = rollValue;
	console.log(rollValue)
	// Drops the copied dice image and rolled number to the area where
	// the dice was dropped. Appends as child to parent node 
	event.target.appendChild(diceCopy);

	if (gamestarted) {
		updateScore(rollValue);
	}
}

// Function that simulates the rolling of a dice
// Default diceSize of 20 
function rollDice(){
	// Math random generates a random decimal between 0 and 1
	// Multiplies the decinmal by diceSize and rounds it down to 
	// nearest whole number. + 1 shifts value range to 1 - 20
	return Math.floor(Math.random() * diceSize) + 1;
}

// Function to handle dice image click
function handleDiceClick() {
	// Clone the dice image
    let diceCopy = document.getElementById("diceImage").cloneNode(true);

    // Find the p element inside the cloned diceCopy where the roll result will be displayed
    let diceCopyText = diceCopy.querySelector("p");
	console.log(diceCopyText);
	rollValue = rollDice();
	// Set text inside cloned dice to the result of rollDice function
    diceCopyText.innerText = rollValue;

    // Append the copied dice image and rolled number to the dice rolling area
    document.getElementById("diceRollingArea").appendChild(diceCopy);

	// Add rotation class to the dice image
	diceElement.classList.add("rotate");

	// Remove the rotation class after animation ends to allow re-application
    diceElement.addEventListener("animationend", () => {
        diceElement.classList.remove("rotate");
    }, { once: true });

	if (gamestarted) {
		updateScore(rollValue);
	}
	
}

function updateDiceSize() {
	const inputElement = document.getElementById("diceSizeInput");
	const newSize = parseInt(inputElement.value, 10);

	if (!isNaN(newSize) && newSize >= 1 && newSize <= 20) {
		diceSize = newSize;

		// Update the dice size text in the dice image
		const diceTextElement = document.getElementById("diceTextOutput");
		diceTextElement.innerText = diceSize;

		alert(`Dice size now set to ${diceSize}`);
	} else {
		alert('Please enter a valid number between 1 and 20')
	}
}

function setDefaultDiceSize() {
	const diceTextElement = document.getElementById("diceTextOutput");
	diceTextElement.innerText = diceSize;
}

function resetTable() {
	let diceRollingArea = document.getElementById("diceRollingArea");
	diceRollingArea.innerHTML = "";
}


// Create variable of html id diceImage
let diceElement = document.getElementById("diceImage");
// Attches the drag function to the dice image so it triggers when 
// dragging starts
diceElement.addEventListener("dragstart", (event) => drag(event));
diceElement.addEventListener("click", (event) => drop(event));
// Enables diceElement to be draggable
diceElement.draggable = true;
// Create variable of html id diceRollingArea 
let diceRollingArea = document.getElementById("diceRollingArea");
// Attaches the drop function to the drop area, so it triggers when something is dropped there
diceRollingArea.addEventListener("drop", (event) => drop(event));
// Allows the dice to be dragged over the drop area
diceRollingArea.addEventListener("dragover", (event) => allowDrop(event));
// Attach the click event listener to the dice image
diceElement.addEventListener("click", handleDiceClick);
// Attach the click event listener to the update button
document.getElementById("updateDiceSizeButton").addEventListener("click", updateDiceSize)

let resetTableButton = document.getElementById("resetTableButton");
resetTableButton.addEventListener("click", resetTable);
