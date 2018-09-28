export function AverageRGB(sampleArray){

	let length = sampleArray.data.length;

	let compoundR = 0;
	let compoundG = 0;
	let compoundB = 0;
	let compoundL = length/4

	let i;

	for(i = 0; i < length; i += 4){

		compoundR += sampleArray.data[i+ 0]
		compoundG += sampleArray.data[i+ 1]
		compoundB += sampleArray.data[i+ 2]
	}

  	let r = Math.floor(compoundR/compoundL)
	let g = Math.floor(compoundG/compoundL)
	let b = Math.floor(compoundB/compoundL)
	
	return [r,g,b]
}


