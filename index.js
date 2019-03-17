let parentElement = document.querySelector('#container');

let noOfClick             = 0;
let clickedItemValues     = [];
let randomNumbers         = [];
let positions             = [];
let filledPositions       = [];
const SECONDS_TO_DISPLAY  = 3000;
const AFTER_CLICK_DISPLAY = 200;

let boxes = [
	[null , null , null , null],
	[null , null , null , null],
	[null , null , null , null],
	[null , null , null , null]
];

let isImageSame = (firstPick,secondPick) => firstPick === secondPick;

let generateRandomNumbers = (min,max,iterator) => {
	let random = Math.floor(Math.random() * (+max - +min)) + +min; 
	if (iterator != max) {
		if  (!filledPositions.includes(random)) {
			filledPositions.push(random);
			iterator++;
		}
		return generateRandomNumbers(min,max,iterator);
	} 
	
};

let generatePairs = (data,min,max) => {
		let totalThatNeedToGenerate = data[0].length + data.length;
		let random = Math.floor(Math.random() * (+max - +min)) + +min; 
		if (min != totalThatNeedToGenerate) {
				if (!randomNumbers.includes(random)) {
	   				randomNumbers.push(random);
	   				min++;
	   	 		}
			return generatePairs(data,min,max);
		} 
		return randomNumbers;
};

const generatePositions = (box,row,currentColumn) => {
	 currentColumn++;
	 if (row != box.length) {
	 	for(let column = 0; column <=box[row].length - 1; column++) {
	 		positions.push(row,column);
	 	}
	 	row++;
	 	return generatePositions(box,row,currentColumn);
	 }
};



let chunk = (array, size)  => {
	  if (!array) return [];
	  const firstChunk = array.slice(0, size); 
	  if (!firstChunk.length) {
	    return array;
	  }
	  return [firstChunk].concat(chunk(array.slice(size, array.length), size)); 
}



//generate pairs from 0 to 100
const generatedPairs = generatePairs(boxes,0,100);
generatePositions(boxes,0,0);
let chunked = chunk(positions,2);
generateRandomNumbers(0,16,0);
filledPositions.map((data,index) => {
	let arr = chunked[data];
	if (index >= 8) {
		index -= 8;
	}
	boxes[arr[0]][arr[1]] = generatedPairs[index];
});


boxes.map((data , index) => {
	data.map((values , keys) => {
		let newButton = document.createElement('button');
		let buttonContent = document.createTextNode(values);
		newButton.setAttribute('id',`item_${index}_${keys}`);
		newButton.setAttribute('onclick',`clickNumber(${[index,keys]})`);
		newButton.style.padding = '15px';
		newButton.appendChild(buttonContent);
		parentElement.appendChild(newButton);
	});
});


let clickNumber = (row,column) => {

	document.querySelector(`#item_${row}_${column}`).setAttribute('disabled',true);
	document.querySelector(`#item_${row}_${column}`).style.color='black';
	document.querySelector(`#item_${row}_${column}`).innerHTML = boxes[row][column];

	clickedItemValues.push(`${row},${column}`);
	noOfClick++;
	if (noOfClick % 2 == 0 && clickedItemValues.length == 2) {
		let isCorrect = false;
		let splitFirstPick   = clickedItemValues[0].split(',');
		let splitSecondPick  = clickedItemValues[1].split(',');
		let firstPickRow     = splitFirstPick[0];
		let firstPickColumn  = splitFirstPick[1];
		let secondPickRow    = splitSecondPick[0];
		let secondPickColumn = splitSecondPick[1];

		if (boxes[firstPickRow][firstPickColumn] == boxes[secondPickRow][secondPickColumn]) {
			isCorrect = true;
			console.log('Correct');
		} else {
			console.log('Wrong');
		}

		//rebase no of click
		noOfClick = 0;

		//rebase the holder for pair
		clickedItemValues.length = 0;

		//enabled the two pick of the user
		if (isCorrect) { 
			document.getElementById(`item_${firstPickRow}_${firstPickColumn}`)
					.remove();
			document.getElementById(`item_${secondPickRow}_${secondPickColumn}`)
					.remove();
		} else {
			document.querySelector(`#item_${firstPickRow}_${firstPickColumn}`).removeAttribute('disabled');
			document.querySelector(`#item_${secondPickRow}_${secondPickColumn}`).removeAttribute('disabled');	
		}

		delayTransparency(AFTER_CLICK_DISPLAY);

	}
};
const transparentAllButtons = () => {
	elements = document.getElementsByTagName('button');
	for(let item of elements) {
		item.innerHTML = ' ';
		item.style.padding = '15px'
	}
};

const delayTransparency = (SECONDS) => {
	setTimeout(() => {
		transparentAllButtons();
	},SECONDS);
};

delayTransparency(SECONDS_TO_DISPLAY);
