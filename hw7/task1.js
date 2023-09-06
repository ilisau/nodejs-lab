function bubbleSort(array) {
	const n = array.length;
	for (let i = 0; i < n - 1; i++) {
		for (let j = 0; j < n - i - 1; j++) {
			if (array[j] > array[j + 1]) {
				const temp = array[j];
				array[j] = array[j + 1];
				array[j + 1] = temp;
			}
		}
	}
	return array;
}

function quickSort(array) {
	if (array.length <= 1) {
		return array;
	}
	const pivot = array[0];
	const left = [];
	const right = [];
	for (let i = 1; i < array.length; i++) {
		if (array[i] < pivot) {
			left.push(array[i]);
		} else {
			right.push(array[i]);
		}
	}
	return [...quickSort(left), pivot, ...quickSort(right)];
}

function mergeSort(array) {
	if (array.length <= 1) {
		return array;
	}
	const middle = Math.floor(array.length / 2);
	const left = array.slice(0, middle);
	const right = array.slice(middle);
	const leftSorted = mergeSort(left);
	const rightSorted = mergeSort(right);
	return merge(leftSorted, rightSorted);
}

function merge(left, right) {
	let result = [];
	let leftIndex = 0;
	let rightIndex = 0;
	while (leftIndex < left.length && rightIndex < right.length) {
		if (left[leftIndex] < right[rightIndex]) {
			result.push(left[leftIndex]);
			leftIndex++;
		} else {
			result.push(right[rightIndex]);
			rightIndex++;
		}
	}
	return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

function generateAscArray(len) {
	let arr = [];
	for (let i = 0; i < len; i++) {
		arr.push(i * 3);
	}
	return arr;
}

function generateDescArray(len) {
	let arr = [];
	for (let i = len; i > 0; i--) {
		arr.push(i * 3);
	}
	return arr;
}

function generateRandArray(len) {
	let arr = [];
	for (let i = 0; i < len; i++) {
		arr.push(Math.ceil(Math.random() * 100));
	}
	return arr;
}

function measureArrayPerformance(array, func) {
	let start = performance.now()
	func(array)
	let end = performance.now()
	return end - start
}

/// TESTS

/**
 * Efficiency of BubbleSort table for array of length less than:
 *  asc    | ~15
 *  desc   | ~6
 *  random | ~6
 */

console.log(generateAscArray(5))
console.log(generateDescArray(5))
console.log(generateRandArray(5))

{
	let work = 5;
	let len = 2;
	console.log("Ascending array")
	console.log(`length | Quick  | Bubble | Merge`)
	while (work) {
		let a = generateAscArray(len);
		let bubbleTime = measureArrayPerformance(Array.of(a), bubbleSort)
		let quickTime = measureArrayPerformance(Array.of(a), quickSort)
		let mergeTime = measureArrayPerformance(Array.of(a), mergeSort)
		console.log(`${len.toString().padEnd(6)} | ${quickTime.toFixed(3).padEnd(6)} | ${bubbleTime.toFixed(3).padEnd(6)} | ${mergeTime.toFixed(3).padEnd(6)}`)
		len = Math.ceil(len * 1.5);
		if (quickTime < bubbleTime && mergeTime < bubbleTime) {
			work--;
		} else {
			work = 5
		}
	}
}
{
	let work = 5;
	let len = 2;
	console.log("Descending array")
	console.log(`length | Quick  | Bubble | Merge`)
	while (work) {
		let a = generateDescArray(len);
		let bubbleTime = measureArrayPerformance(Array.of(a), bubbleSort)
		let quickTime = measureArrayPerformance(Array.of(a), quickSort)
		let mergeTime = measureArrayPerformance(Array.of(a), mergeSort)
		console.log(`${len.toString().padEnd(6)} | ${quickTime.toFixed(3).padEnd(6)} | ${bubbleTime.toFixed(3).padEnd(6)} | ${mergeTime.toFixed(3).padEnd(6)}`)
		len = Math.ceil(len * 1.5);
		if (quickTime < bubbleTime && mergeTime < bubbleTime) {
			work--;
		} else {
			work = 5
		}
	}
}
{
	let work = 5;
	let len = 2;
	console.log("Random array")
	console.log(`length | Quick  | Bubble | Merge`)
	while (work) {
		let a = generateRandArray(len);
		let bubbleTime = measureArrayPerformance(Array.of(a), bubbleSort)
		let quickTime = measureArrayPerformance(Array.of(a), quickSort)
		let mergeTime = measureArrayPerformance(Array.of(a), mergeSort)
		console.log(`${len.toString().padEnd(6)} | ${quickTime.toFixed(3).padEnd(6)} | ${bubbleTime.toFixed(3).padEnd(6)} | ${mergeTime.toFixed(3).padEnd(6)}`)
		len = Math.ceil(len * 1.5);
		if (quickTime < bubbleTime && mergeTime < bubbleTime) {
			work--;
		} else {
			work = 5
		}
	}
}