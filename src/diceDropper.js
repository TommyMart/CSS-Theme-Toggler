
function allowDrop(event){
	event.preventDefault();
}

// function drag(event){
// 	// Target of the drag event is the thing that we are dragging
// 	event.dataTransfer.setData("text", event.target.id);
// 	console.log("On drag, set data of: " + event.target.id);
// }

function drag(event) {
    const elementId = event.currentTarget.id;
    console.log('Dragging element with id:', elementId);  // Debugging
    event.dataTransfer.setData("text", elementId);
}

function drop(event){
	event.preventDefault();
	// Target of the drop event is the element below whatever
	// our mouse is over when we stop the drag
	let data = event.dataTransfer.getData("text");
	console.log("On drop, reading data of: " + data);

	let diceCopy = document.getElementById("diceImage").cloneNode(true);

	let diceCopyText = diceCopy.querySelector("p");
	diceCopyText.innerText = rollDice();

	event.target.appendChild(diceCopy);
}


function rollDice(diceSize = 20){
	return Math.floor(Math.random() * diceSize) + 1;
}


let diceElement = document.getElementById("diceImage");
diceElement.addEventListener("dragstart", (event) => drag(event));
diceElement.draggable = true;

let diceRollingArea = document.getElementById("diceRollingArea");
diceRollingArea.addEventListener("drop", (event) => drop(event));
diceRollingArea.addEventListener("dragover", (event) => allowDrop(event));