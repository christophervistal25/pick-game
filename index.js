let randomNumbers   = [];
let positions       = [];
let filledPositions = [];

let boxes = [
	[0,1,2,3],
	[4,5,6,7],
	[8,9,10,11],
	[12,13,14,15]
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
console.log(boxes);

